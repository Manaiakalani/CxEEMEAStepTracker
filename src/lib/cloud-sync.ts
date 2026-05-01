import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  type Auth,
  type User,
} from "firebase/auth";
import {
  collection,
  doc,
  initializeFirestore,
  limit,
  onSnapshot,
  orderBy,
  persistentLocalCache,
  persistentMultipleTabManager,
  query,
  serverTimestamp,
  setDoc,
  type Firestore,
} from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigured } from "../firebase-config";

export type UserSnapshot = {
  name: string;
  team: string;
  goal: number;
  entries: Record<string, number>;
};

export type LeaderboardEntry = {
  uid: string;
  name: string;
  team: string;
  entries: Record<string, number>;
};

type FirebaseHandles = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
};

let handles: FirebaseHandles | null = null;

/**
 * Lazily initializes Firebase the first time it's requested. Returns null if
 * the app hasn't been configured yet (i.e. `firebase-config.ts` still has
 * placeholder values), so the rest of the app can stay completely dormant.
 *
 * We use `initializeFirestore` (rather than `getFirestore`) so we can wire up
 * the IndexedDB-backed `persistentLocalCache`. With that cache enabled,
 * writes performed while offline are committed to the local cache instantly
 * (so the UI stays responsive) and flushed to the server automatically when
 * the network comes back. Reads also serve from the cache when offline.
 */
export function getFirebase(): FirebaseHandles | null {
  if (!isFirebaseConfigured()) return null;
  if (handles) return handles;
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });
    handles = { app, auth, db };
    return handles;
  } catch (err) {
    console.warn("[cloud-sync] Failed to initialize Firebase:", err);
    return null;
  }
}

/**
 * Subscribe to auth state changes. The callback fires immediately with the
 * current user (which may be a previously-cached anonymous user restored
 * from IndexedDB, even offline) and again whenever it changes.
 */
export function onAuthChange(cb: (user: User | null) => void): () => void {
  const fb = getFirebase();
  if (!fb) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(fb.auth, cb);
}

/**
 * Ensure the user is signed in anonymously. If a cached anonymous user is
 * already restored from IndexedDB, returns its UID without a network call.
 */
export async function ensureAnonUser(): Promise<string | null> {
  const fb = getFirebase();
  if (!fb) return null;
  if (fb.auth.currentUser) return fb.auth.currentUser.uid;
  try {
    const cred = await signInAnonymously(fb.auth);
    return cred.user.uid;
  } catch (err) {
    console.warn("[cloud-sync] Anonymous sign-in failed:", err);
    return null;
  }
}

/**
 * Write the user's snapshot. With persistent local cache enabled, this
 * resolves once the write hits the local IndexedDB cache; the SDK then
 * forwards it to Firestore in the background (instantly when online, on
 * reconnect when offline). We deliberately don't `await` server
 * acknowledgement here because that would hang on slow or no-network paths.
 */
export async function pushUserSnapshot(
  uid: string,
  snapshot: UserSnapshot,
): Promise<boolean> {
  const fb = getFirebase();
  if (!fb || !uid) return false;
  try {
    // Note: deliberately no `{ merge: true }`. We always send the full
    // {name, team, goal, entries} payload, so a full overwrite is the
    // correct semantics — and avoids Firestore's deep-merge of map
    // fields (which would otherwise leave stale day-keys in `entries`
    // forever after a `resetWeek` / `resetAll`).
    await setDoc(doc(fb.db, "users", uid), {
      name: snapshot.name,
      team: snapshot.team,
      goal: snapshot.goal,
      entries: snapshot.entries,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (err: unknown) {
    // Log only the error code so the user's UID (which Firestore embeds
    // in the resource path of the full error message) doesn't end up in
    // the browser console.
    const code = (err as { code?: string })?.code ?? "unknown";
    console.warn("[cloud-sync] pushUserSnapshot failed:", code);
    return false;
  }
}

export function subscribeLeaderboard(
  cb: (rows: LeaderboardEntry[]) => void,
): () => void {
  const fb = getFirebase();
  if (!fb) return () => {};
  try {
    // Order by `updatedAt` so the most recently active walkers ride the
    // first 200 slots; defensive cap for the unlikely "huge offsite"
    // case. Docs missing `updatedAt` (shouldn't happen post-fix, but
    // historically possible) sort last by Firestore's null ordering.
    const q = query(
      collection(fb.db, "users"),
      orderBy("updatedAt", "desc"),
      limit(200),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows: LeaderboardEntry[] = [];
        snap.forEach((d) => {
          const data = d.data() as Partial<UserSnapshot> | undefined;
          if (!data) return;
          rows.push({
            uid: d.id,
            name: typeof data.name === "string" ? data.name : "",
            team: typeof data.team === "string" ? data.team : "",
            entries:
              data.entries && typeof data.entries === "object"
                ? (data.entries as Record<string, number>)
                : {},
          });
        });
        cb(rows);
      },
      (err: unknown) => {
        const code = (err as { code?: string })?.code ?? "unknown";
        console.warn("[cloud-sync] leaderboard subscription error:", code);
      },
    );
    return unsub;
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code ?? "unknown";
    console.warn("[cloud-sync] subscribeLeaderboard failed:", code);
    return () => {};
  }
}

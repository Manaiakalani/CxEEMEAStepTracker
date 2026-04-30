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
    await setDoc(
      doc(fb.db, "users", uid),
      {
        name: snapshot.name,
        team: snapshot.team,
        goal: snapshot.goal,
        entries: snapshot.entries,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    return true;
  } catch (err) {
    console.warn("[cloud-sync] pushUserSnapshot failed:", err);
    return false;
  }
}

export function subscribeLeaderboard(
  cb: (rows: LeaderboardEntry[]) => void,
): () => void {
  const fb = getFirebase();
  if (!fb) return () => {};
  try {
    const q = query(collection(fb.db, "users"), limit(200));
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
      (err) => {
        console.warn("[cloud-sync] leaderboard subscription error:", err);
      },
    );
    return unsub;
  } catch (err) {
    console.warn("[cloud-sync] subscribeLeaderboard failed:", err);
    return () => {};
  }
}

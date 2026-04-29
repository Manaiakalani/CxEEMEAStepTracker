import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  type Auth,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  onSnapshot,
  query,
  limit,
  serverTimestamp,
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
 */
export function getFirebase(): FirebaseHandles | null {
  if (!isFirebaseConfigured()) return null;
  if (handles) return handles;
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    handles = { app, auth, db };
    return handles;
  } catch (err) {
    console.warn("[cloud-sync] Failed to initialize Firebase:", err);
    return null;
  }
}

export async function signInAnon(): Promise<string | null> {
  const fb = getFirebase();
  if (!fb) return null;
  try {
    const cred = await signInAnonymously(fb.auth);
    return cred.user.uid;
  } catch (err) {
    console.warn("[cloud-sync] Anonymous sign-in failed:", err);
    return null;
  }
}

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

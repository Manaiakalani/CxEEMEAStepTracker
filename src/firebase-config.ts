// Firebase web config is read from Vite environment variables at build time
// so the API key is never committed to source control. For local dev, copy
// .env.example to .env.local and fill in the values from
// Firebase Console → Project settings → Your apps → Web app config.
// CI builds (GitHub Actions) inject the same variables from repo secrets.
//
// Web config values are technically public (they identify the project, not
// authenticate it), but we still keep them out of git so the repository is
// not flagged by secret scanners and so forks can drop in their own project.
// Real security is enforced by firestore.rules + GCP API key HTTP-referrer
// restrictions (see docs/firebase-setup.md).
//
// Leave the variables unset / empty to disable cloud sync entirely.
const env = import.meta.env;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: env.VITE_FIREBASE_APP_ID ?? "",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID ?? undefined,
};

export const isFirebaseConfigured = () =>
  firebaseConfig.apiKey.trim().length > 0 &&
  firebaseConfig.appId.trim().length > 0;

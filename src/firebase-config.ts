// Fill in from Firebase Console → Project settings → Your apps → Web app config.
// Web config values are safe to expose; security is enforced by firestore.rules.
// Leave apiKey as the empty string to keep cloud sync disabled.
export const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "cxeemeastep.firebaseapp.com",
  projectId: "cxeemeastep",
  storageBucket: "cxeemeastep.firebasestorage.app",
  messagingSenderId: "764737440030",
  appId: "1:764737440030:web:b428b6427f59d25602a10f",
  measurementId: "G-KZWEY1TPWQ",
};

export const isFirebaseConfigured = () =>
  firebaseConfig.apiKey.trim().length > 0 &&
  firebaseConfig.appId.trim().length > 0;

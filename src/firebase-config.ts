// Fill in from Firebase Console → Project settings → Your apps → Web app config.
// Web config values are safe to expose; security is enforced by firestore.rules.
// Leave apiKey as the empty string to keep cloud sync disabled.
export const firebaseConfig = {
  apiKey: "",
  authDomain: "cxeemeastep.firebaseapp.com",
  projectId: "cxeemeastep",
  storageBucket: "cxeemeastep.appspot.com",
  messagingSenderId: "",
  appId: "",
};

export const isFirebaseConfigured = () =>
  firebaseConfig.apiKey.trim().length > 0 &&
  firebaseConfig.appId.trim().length > 0;

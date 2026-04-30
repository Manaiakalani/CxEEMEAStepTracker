# Firebase setup (always-on cloud sync)

This document is for the repo owner / offsite organiser. The Step Tracker
treats cloud sync as **always-on** when configured: every visitor is signed
in anonymously, their snapshot is mirrored to Firestore in the background,
and offline-resilience is provided by the Firestore SDK's persistent local
cache. There is no end-user opt-in toggle — the only way to "disable" it is
to ship with `src/firebase-config.ts` empty, in which case the app falls
back to a purely local experience.

The Firebase project for the offsite is:

- **Project ID:** `cxeemeastep`
- **Console:** <https://console.firebase.google.com/project/cxeemeastep/overview>

## 1. Enable Cloud Firestore

1. Open the project in the Firebase Console.
2. Go to **Build → Firestore Database → Create database**.
3. Start in **Production mode** (we ship explicit rules — see step 4).
4. Choose location **`eur3`** (multi-region Europe). This must match the
   region picked at project creation; if you previously chose a different
   region, just keep the existing one.
5. Click **Enable**.

## 2. Enable Anonymous Authentication

The app signs each user in anonymously so per-user write rules can be
enforced without anyone making accounts.

1. **Build → Authentication → Get started**.
2. Open the **Sign-in method** tab.
3. Enable **Anonymous** and save.

## 3. Register the Web app & copy the config

1. **Project settings (gear icon) → General → Your apps**.
2. Click the **`</>` Web** icon to register a new web app
   (e.g. name it `step-tracker-web`). You do **not** need Firebase Hosting.
3. Firebase shows a `firebaseConfig` object. Copy the values into
   `src/firebase-config.ts`:

   ```ts
   export const firebaseConfig = {
     apiKey: "AIza…",                 // ← paste
     authDomain: "cxeemeastep.firebaseapp.com",
     projectId: "cxeemeastep",
     storageBucket: "cxeemeastep.appspot.com",
     messagingSenderId: "…",          // ← paste
     appId: "1:…:web:…",              // ← paste
   };
   ```

   Web config values are **safe to commit**: they're not secrets, they only
   identify the project. Security is enforced server-side by
   `firestore.rules`.

4. Once `apiKey` and `appId` are non-empty, `isFirebaseConfigured()`
   flips to `true` and the cloud sync toggle on the Profile screen
   becomes functional. Until then the toggle stays dormant for everyone.

## 4. Deploy the Firestore security rules

The repo ships a `firestore.rules` file that:

- allows any signed-in user (incl. anonymous) to **read** `users/*`
  (so the leaderboard can list everyone),
- allows a user to **create / update only their own** `users/{uid}` doc,
- validates the doc shape (name, team, goal, entries),
- forbids client-side deletes.

To deploy:

```bash
# one-time, globally
npm install -g firebase-tools

# from the repo root
firebase login
firebase use cxeemeastep

# deploy only the Firestore rules
firebase deploy --only firestore:rules
```

If `firebase use` complains about no project being configured locally, you
can pass it inline instead:

```bash
firebase deploy --only firestore:rules --project cxeemeastep
```

You should see the rules update in the Firebase Console under
**Firestore Database → Rules**.

## 5. What end-users see

Once the config is filled in and rules are deployed, **no user action is
required**:

1. A visitor opens the app — the Firebase SDK initialises with an
   IndexedDB-backed persistent local cache.
2. They are signed in anonymously in the background. The anonymous UID is
   cached in IndexedDB and survives reloads (even offline) on subsequent
   visits.
3. Their current snapshot (`name`, `team`, `goal`, `entries`) is written to
   `users/{uid}`.
4. Any subsequent change to their profile or step entries is mirrored to
   Firestore in the background (debounced ~600 ms).
5. If they go offline, writes are buffered locally by the SDK and flushed
   automatically once the connection returns. The **Profile → Cloud sync**
   panel reflects the live state (Synced / Offline — saving locally /
   Connecting…).

## 6. Privacy implications

The following leaves each user's device:

- their **display name** (free-form, ≤ 60 chars),
- their **team** selection,
- their **daily step goal**,
- their **per-day step counts** keyed by ISO date.

Nothing else. No device IDs, no IPs beyond the standard Firebase request
metadata, no email, no location. If you ship a build with
`src/firebase-config.ts` left empty, the app behaves as a purely local
build — no Firebase code talks to the network.

After the offsite, you can wipe centrally-stored data with:

```bash
# Manually in the console:
#   Firestore Database → users → ⋮ → Delete collection
```

…or via the Admin SDK in a small script. Aim for ≤ 14 days post-event,
consistent with GDPR storage-limitation principles.

## 7. Troubleshooting

**"Cloud not configured" pill on Profile.**
`src/firebase-config.ts` still has empty `apiKey` or `appId`. Fill in the
values from the Firebase Console (step 3) and rebuild / redeploy.

**"Connecting…" never resolves; console shows `auth/admin-restricted-operation`.**
Anonymous authentication isn't enabled. Re-do step 2.

**Console shows `permission-denied` on `setDoc`.**
The security rules either weren't deployed or the doc shape changed. Make
sure you ran `firebase deploy --only firestore:rules` and that the doc
keys are exactly `name`, `team`, `goal`, `entries`, `updatedAt`.

**Leaderboard subscription returns nothing.**
Check that at least one user has toggled cloud sync on. The `users`
collection only contains documents for users who've opted in.

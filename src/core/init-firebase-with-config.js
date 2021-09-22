import { initializeApp } from 'firebase/app';

let FIREBASE_APP_SINGLETON = null;

function initFirebaseWithConfig({
  apiKey,
  appId,
  authDomain,
  databaseURL,
  messagingSenderId,
  projectId,
  storageBucket,
}) {
  // const countApps = firebase.apps.length
  // if (!countApps) { return FIREBASE_APP_SINGLETON;
  if (FIREBASE_APP_SINGLETON) {
    return FIREBASE_APP_SINGLETON;
  }
  try {
    FIREBASE_APP_SINGLETON = initializeApp({
      apiKey,
      appId,
      authDomain,
      databaseURL,
      messagingSenderId,
      projectId,
      storageBucket,
    });
  } catch (err) {
    if (err.code !== 'app/duplicate-app') {
      throw err;
    }
  }
  return FIREBASE_APP_SINGLETON;
}

export default initFirebaseWithConfig;

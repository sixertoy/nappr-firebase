import { getApps, initializeApp } from 'firebase/app';

import { FIREBASE_DEFAULT_APPNAME } from '../constants';

function initFirebaseWithConfig(
  {
    apiKey,
    appId,
    authDomain,
    databaseURL,
    messagingSenderId,
    projectId,
    storageBucket,
  },
  name = FIREBASE_DEFAULT_APPNAME
) {
  let app = getApps(name);
  if (app) return app;

  try {
    app = initializeApp(
      {
        apiKey,
        appId,
        authDomain,
        databaseURL,
        messagingSenderId,
        projectId,
        storageBucket,
      },
      name
    );
  } catch (err) {
    if (err.code !== 'app/duplicate-app') {
      throw err;
    }
  }
  return app;
}

export default initFirebaseWithConfig;

import { getApp, initializeApp } from 'firebase/app';

import { FIREBASE_DEFAULT_APPNAME } from '../constants';

function initFirebaseWithConfig(config, name = FIREBASE_DEFAULT_APPNAME) {
  let app = null;
  try {
    app = getApp(name);
  } catch (err) {
    if (err.code !== 'app/duplicate-app') {
      throw err;
    }
    app = initializeApp(config, name);
  }
  return app;
}

export default initFirebaseWithConfig;

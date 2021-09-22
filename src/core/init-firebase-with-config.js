import { getApp, initializeApp } from 'firebase/app';

import { FIREBASE_DEFAULT_APPNAME } from '../constants';

function initFirebaseWithConfig(config, name = FIREBASE_DEFAULT_APPNAME) {
  let app = getApp(name);
  if (app) return app;

  try {
    app = initializeApp(config, name);
  } catch (err) {
    if (err.code !== 'app/duplicate-app') {
      throw err;
    }
  }
  return app;
}

export default initFirebaseWithConfig;

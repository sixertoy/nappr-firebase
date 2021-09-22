import { initializeApp } from 'firebase/app';

import {
  FIREBASE_DEFAULT_APPNAME,
  FIREBASE_ERR_DUPLICATE_APP,
  // IS_DEVELOPMENT,
} from '../constants';
import getConfig from './get-config';

function initialize(name = FIREBASE_DEFAULT_APPNAME) {
  const config = getConfig();
  let app = null;
  try {
    app = initializeApp(config, name);
    // const useAnalytics = !IS_DEVELOPMENT && config.measurementId;
    // if (useAnalytics) app.analytics();
  } catch (err) {
    if (err.code !== FIREBASE_ERR_DUPLICATE_APP) {
      throw err;
    }
  }
  return app;
}

export default initialize;

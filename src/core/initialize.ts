import { initializeApp } from 'firebase/app';

import { FirebaseErrors } from '../enums';
import { getConfig } from './get-config';

export function initialize(name: string) {
  const config = getConfig();
  let app = null;
  try {
    app = initializeApp(config, name);
    // const useAnalytics = !IS_DEVELOPMENT && config.measurementId;
    // if (useAnalytics) app.analytics();
  } catch (err) {
    const { code } = err as { code: string };
    if (code !== FirebaseErrors.FIREBASE_ERR_DUPLICATE_APP) {
      throw err;
    }
  }
  return app;
}

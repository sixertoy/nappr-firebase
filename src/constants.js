export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const FIREBASE_KEY_PREFIX = 'FIREBASE_';
export const FIREBASE_DEFAULT_APPNAME = 'DEFAULT';
export const FIREBASE_ERR_DUPLICATE_APP = 'app/duplicate-app';
export const FIREBASE_ADMINS_TABLE_NAME = 'allowedContributors';

export const FIREBASE_PROVIDER_EMAIL = 'email';
export const FIREBASE_PROVIDER_ANON = 'anonymous';
export const FIREBASE_PROVIDER_GOOGLE = 'google.com';
export const FIREBASE_PROVIDER_GITHUB = 'github.com';
export const FIREBASE_PROVIDER_TWITTER = 'twitter.com';
export const FIREBASE_PROVIDER_FACEBOOK = 'facebook.com';

export const FIREBASE_DEFAULT_STATE = {
  app: {},
  auth: null,
  db: null,
  isAdmin: false,
  isAnonymous: true,
  isReady: false,
  isSignedIn: false,
  providerId: null,
  token: null,
  user: null,
};

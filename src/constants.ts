export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

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

import React from 'react';

const FirebaseAuthContext = React.createContext({
  firebase: {},
  isAnonymous: true,
  isReady: false,
  isSignedIn: false,
  providerId: null,
  user: null,
});

FirebaseAuthContext.displayName = 'FirebaseAuthContext';

export default FirebaseAuthContext;

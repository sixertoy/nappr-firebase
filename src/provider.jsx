import { getAuth, onAuthStateChanged } from 'firebase/auth';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  FIREBASE_AUTH_LOCAL,
  FIREBASE_AUTH_NONE,
  FIREBASE_AUTH_SESSION,
  FIREBASE_DEFAULT_APPNAME,
} from './constants';
import {
  FirebaseAuthContext,
  getFirebaseConfig,
  initFirebaseWithConfig,
} from './core';

const FirebaseAuthProvider = ({ children, config, name, persistence }) => {
  const firebaseApp = initFirebaseWithConfig(config, name);
  const changeListener = useRef(null);

  const [state, setState] = useState({
    firebase: firebaseApp,
    isAnonymous: true,
    isReady: false,
    isSignedIn: false,
    providerId: null,
    user: null,
  });

  const onAuthChange = useCallback(
    user => {
      const isReady = true;
      const isSignedIn = Boolean(user);
      const isAnonymous = get(user, 'isAnonymous', true);
      const providerId = get(user, 'providerData.0.providerId', null);
      setState({
        firebase: firebaseApp,
        isAnonymous,
        isReady,
        isSignedIn,
        providerId,
        user,
      });
    },
    [firebaseApp]
  );

  useEffect(() => {
    if (!changeListener.current) {
      const auth = getAuth(firebaseApp);
      auth.setPersistence(persistence);
      onAuthStateChanged(auth, onAuthChange);
      changeListener.current = auth;
    }
    return () => {
      const removeChangedListener = changeListener.current;
      removeChangedListener();
    };
  }, [firebaseApp, onAuthChange, persistence]);

  return (
    <FirebaseAuthContext.Provider value={state}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

FirebaseAuthProvider.defaultProps = {
  config: getFirebaseConfig(),
  name: FIREBASE_DEFAULT_APPNAME,
  persistence: FIREBASE_AUTH_LOCAL,
};

FirebaseAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.shape({
    apiKey: PropTypes.string.isRequired,
    appId: PropTypes.string,
    authDomain: PropTypes.string.isRequired,
    databaseURL: PropTypes.string.isRequired,
    messagingSenderId: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    storageBucket: PropTypes.string.isRequired,
  }),
  name: PropTypes.string,
  persistence: PropTypes.oneOf([
    FIREBASE_AUTH_LOCAL, // firebase.auth.Auth.Persistence.LOCAL,
    FIREBASE_AUTH_SESSION, // firebase.auth.Auth.Persistence.SESSION,
    FIREBASE_AUTH_NONE, // firebase.auth.Auth.Persistence.NONE,
  ]),
};

FirebaseAuthProvider.displayName = 'FirebaseAuthProvider';

export default FirebaseAuthProvider;

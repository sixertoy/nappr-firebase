import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  FirebaseAuthContext,
  getFirebaseConfig,
  initFirebaseWithConfig,
} from './core';

const FirebaseAuthProvider = ({
  children,
  config,
  initializeApp,
  persistence,
}) => {
  const app = initFirebaseWithConfig(initializeApp, config);
  const changeListener = useRef(null);

  const [state, setState] = useState({
    firebase: app,
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
        firebase: app,
        isAnonymous,
        isReady,
        isSignedIn,
        providerId,
        user,
      });
    },
    [app]
  );

  useEffect(() => {
    if (!changeListener.current) {
      app.auth().setPersistence(persistence);
      changeListener.current = app.auth().onAuthStateChanged(onAuthChange);
    }
    return () => {
      const removeChangedListener = changeListener.current;
      removeChangedListener();
    };
  }, [app, onAuthChange, persistence]);

  return (
    <FirebaseAuthContext.Provider value={state}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

FirebaseAuthProvider.defaultProps = {
  config: getFirebaseConfig(),
  persistence: 'local',
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
  firebase: PropTypes.shape().isRequired,
  persistence: PropTypes.oneOf([
    'local', // firebase.auth.Auth.Persistence.LOCAL,
    'sesssion', // firebase.auth.Auth.Persistence.SESSION,
    'none', // firebase.auth.Auth.Persistence.NONE,
  ]),
};

FirebaseAuthProvider.displayName = 'FirebaseAuthProvider';

export default FirebaseAuthProvider;

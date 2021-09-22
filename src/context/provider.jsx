import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  // FIREBASE_ADMINS_TABLE_NAME,
  FIREBASE_AUTH_LOCAL,
  FIREBASE_AUTH_NONE,
  FIREBASE_AUTH_SESSION,
  FIREBASE_DEFAULT_APPNAME,
  FIREBASE_DEFAULT_STATE,
} from '../constants';
import { initialize } from '../core';
import FirebaseContext from './context';

const checkIfUserIsAdminRole = user => {
  // NOTE la table `allowedContributors` est commune à tous les projets
  // elle composée de { [user.id]:  user.email }
  const userisvalid = user && user.uid;
  if (!userisvalid) {
    return Promise.resolve(false);
  }
  // const { email, uid } = user;
  // return db
  //   .read(uid, FIREBASE_ADMINS_TABLE_NAME)
  //   .then(payload => {
  //     const isadmin = payload && payload === email;
  //     return isadmin;
  //   })
  //   .catch(() => false);
  return false;
};

const FirebaseProvider = ({ children, name, persistence }) => {
  const changeListener = useRef(null);
  const firebaseApp = initialize(name);

  const [state, setState] = useState({
    ...FIREBASE_DEFAULT_STATE,
    app: firebaseApp,
  });

  const onAuthChange = useCallback(
    user => {
      const next = {
        app: firebaseApp,
        isAdmin: false,
        isAnonymous: (user && user.isAnonymous) || true,
        isReady: true,
        isSignedIn: !!user,
        providerId: (user && user.providerData[0].providerId) || null,
        token: null,
        user,
      };

      checkIfUserIsAdminRole(user).then(isAdmin => {
        setState({ ...next, isAdmin });
      });
    },
    [firebaseApp]
  );

  useEffect(() => {
    if (!changeListener.current) {
      const auth = getAuth(firebaseApp);
      auth.useDeviceLanguage();
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
    <FirebaseContext.Provider value={state}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.defaultProps = {
  name: FIREBASE_DEFAULT_APPNAME,
  persistence: FIREBASE_AUTH_LOCAL,
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  persistence: PropTypes.oneOf([
    FIREBASE_AUTH_LOCAL, // firebase.auth.Auth.Persistence.LOCAL,
    FIREBASE_AUTH_SESSION, // firebase.auth.Auth.Persistence.SESSION,
    FIREBASE_AUTH_NONE, // firebase.auth.Auth.Persistence.NONE,
  ]),
};

FirebaseProvider.displayName = 'FirebaseProvider';

export default FirebaseProvider;

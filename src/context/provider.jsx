import {
  browserLocalPersistence,
  browserSessionPersistence,
  initializeAuth,
  inMemoryPersistence,
  onAuthStateChanged,
  useDeviceLanguage,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  // FIREBASE_ADMINS_TABLE_NAME,
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

const FirebaseProvider = ({ children, name }) => {
  const changeListener = useRef(null);
  const firebaseApp = initialize(name);

  const [state, setState] = useState({
    ...FIREBASE_DEFAULT_STATE,
    app: firebaseApp,
    db: getDatabase(firebaseApp),
  });

  const onAuthChange = useCallback(
    user => {
      const next = {
        ...state,
        admin: false,
        anonymous: (user && user.isAnonymous) || true,
        provider: (user && user.providerData[0].providerId) || null,
        ready: true,
        signedin: !!user,
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
      const auth = initializeAuth(firebaseApp, {
        persistence: [
          browserLocalPersistence,
          browserSessionPersistence,
          inMemoryPersistence,
        ],
      });
      useDeviceLanguage(auth);
      onAuthStateChanged(auth, onAuthChange);
      changeListener.current = auth;
    }
    return () => {
      const removeChangedListener = changeListener.current;
      removeChangedListener();
    };
  }, [firebaseApp, onAuthChange]);

  return (
    <FirebaseContext.Provider value={state}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.defaultProps = {
  name: FIREBASE_DEFAULT_APPNAME,
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
};

FirebaseProvider.displayName = 'FirebaseProvider';

export default FirebaseProvider;

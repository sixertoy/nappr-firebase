import type { User } from 'firebase/auth';
import {
  // browserLocalPersistence,
  // browserPopupRedirectResolver,
  // browserSessionPersistence,
  getAuth,
  // initializeAuth,
  // inMemoryPersistence,
  onAuthStateChanged,
  useDeviceLanguage as __useDeviceLanguage,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { APP_VERSION } from '../constants';
import { initialize } from '../core';
import { FirebaseContext } from './context';

interface FirebaseProviderProps extends Required<PropsWithChildren> {
  name: string;
}

const checkIfUserIsAdminRole = (user: User) => {
  // NOTE la table `allowedContributors` est commune à tous les projets
  // elle composée de { [user.id]:  user.email }
  const userisvalid = user && user.uid;
  if (!userisvalid) {
    return Promise.resolve(false);
  }
  // const { email, uid } = user;
  // return db
  //   .read(uid, Options.ADMINS_TABLE_NAME)
  //   .then(payload => {
  //     const isadmin = payload && payload === email;
  //     return isadmin;
  //   })
  //   .catch(() => false);
  return Promise.resolve(true);
};

const FirebaseProvider = ({ children, name }: FirebaseProviderProps) => {
  // eslint-disable-next-line no-console
  console.log('@nappr/firebase version => ', APP_VERSION);

  const changeListener = useRef(null);

  const firebaseApp = initialize(name);
  const firebaseAuth = getAuth(firebaseApp);

  const [state, setState] = useState({
    app: firebaseApp,
    auth: firebaseAuth,
    db: getDatabase(firebaseApp),
    isAdmin: false,
    isAnonymous: true,
    isReady: false,
    isSignedIn: false,
    providerId: null,
    token: null,
    user: null,
  });

  const onAuthChange = useCallback(
    (user: User | null) => {
      const next = {
        isAdmin: false,
        isAnonymous: (user && user.isAnonymous) || true,
        isReady: true,
        isSignedIn: !!user,
        provider: (user && user.providerData[0].providerId) || null,
        token: null,
        user,
      };

      checkIfUserIsAdminRole(user).then((isAdmin) => {
        setState((prev) => ({ ...prev, ...next, isAdmin }));
      });
    },
    [firebaseApp],
  );

  useEffect(() => {
    if (!changeListener.current) {
      changeListener.current = true;
      // const auth = initializeAuth(firebaseApp, {
      //   persistence: [
      //     browserLocalPersistence,
      //     browserSessionPersistence,
      //     inMemoryPersistence,
      //   ],
      //   popupRedirectResolver: browserPopupRedirectResolver,
      // });
      __useDeviceLanguage(firebaseAuth);
      onAuthStateChanged(firebaseAuth, onAuthChange);
    }
    return () => {
      if (changeListener.current) {
        const removeChangedListener = firebaseAuth;
        removeChangedListener();
      }
    };
  }, [firebaseApp, onAuthChange]);

  return (
    <FirebaseContext.Provider value={state}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.displayName = 'FirebaseProvider';

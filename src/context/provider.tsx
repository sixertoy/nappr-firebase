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

// import { version } from '../../package.json';
import { initialize } from '../core';
import { Options } from '../enums';
import { FirebaseContext } from './context';

interface FirebaseProviderProps extends Required<PropsWithChildren> {
  name: string;
}

const checkIfUserIsAdminRole = (user) => {
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

const FirebaseProvider = ({
  children,
  name = Options.DEFAULT_APPNAME,
}: FirebaseProviderProps) => {
  // console.log('@nappr/firebase version => ', version);
  const changeListener = useRef(null);
  const firebaseApp = initialize(name);
  const firebaseAuth = getAuth(firebaseApp);

  const [state, setState] = useState({
    ...Options.DEFAULT_STATE,
    app: firebaseApp,
    auth: firebaseAuth,
    db: getDatabase(firebaseApp),
  });

  const onAuthChange = useCallback(
    (user) => {
      const next = {
        ...state,
        isAdmin: false,
        isAnonymous: (user && user.isAnonymous) || true,
        isReady: true,
        isSignedIn: !!user,
        provider: (user && user.providerData[0].providerId) || null,
        token: null,
        user,
      };

      checkIfUserIsAdminRole(user).then((isAdmin) => {
        setState({ ...next, isAdmin });
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

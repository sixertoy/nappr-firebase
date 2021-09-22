import { useContext } from 'react';

import FirebaseAuthContext from './context';

export const useFirebase = () => {
  const state = useContext(FirebaseAuthContext);
  return { ...state };
};

export default useFirebase;

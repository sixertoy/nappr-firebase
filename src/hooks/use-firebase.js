import { useContext } from 'react';

import { FirebaseContext } from '../context';

export const useFirebase = () => {
  const state = useContext(FirebaseContext);
  return { ...state };
};

export default useFirebase;

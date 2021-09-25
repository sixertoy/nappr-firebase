import { useContext } from 'react';

import { FirebaseContext } from '../context';

export const useFirebaseUser = () => {
  const { user } = useContext(FirebaseContext);
  return user;
};

export default useFirebaseUser;

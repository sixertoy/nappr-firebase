import React from 'react';

import { FIREBASE_DEFAULT_STATE } from '../constants';

const FirebaseContext = React.createContext(FIREBASE_DEFAULT_STATE);

FirebaseContext.displayName = 'FirebaseContext';

export default FirebaseContext;

import React from 'react';

import type { ContextStateInterface } from '../interfaces';

export const FirebaseContext = React.createContext<
  ContextStateInterface | undefined
>(undefined);

FirebaseContext.displayName = 'FirebaseContext';

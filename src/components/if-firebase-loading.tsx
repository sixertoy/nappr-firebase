import type { ReactNode } from 'react';
import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

interface IfFirebaseLoadingprops {
  loader: ReactNode;
}

const IfFirebaseLoading = React.memo(({ loader }: IfFirebaseLoadingprops) => (
  <FirebaseContext.Consumer>
    {(state) => {
      const { isReady } = state;
      if (isReady) {
        return null;
      }

      return renderer(loader, state);
    }}
  </FirebaseContext.Consumer>
));

IfFirebaseLoading.displayName = 'IfFirebaseLoading';

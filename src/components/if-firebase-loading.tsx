import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

interface IfFirebaseLoadingprops {
  loader: any;
}

const IfFirebaseLoading = React.memo(({ loader }: IfFirebaseLoadingprops) => (
  <FirebaseContext.Consumer>
    {(state) => {
      const { isReady } = state;
      if (isReady) return null;
      return renderer(loader, state);
    }}
  </FirebaseContext.Consumer>
));

IfFirebaseLoading.displayName = 'IfFirebaseLoading';

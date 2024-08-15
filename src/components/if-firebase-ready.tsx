import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

interface IfFirebaseReadyProps extends Required<PropsWithChildren> {
  loader?: ReactNode | undefined;
}

const IfFirebaseReady = React.memo(
  ({ children, loader = undefined }: IfFirebaseReadyProps) => (
    <FirebaseContext.Consumer>
      {(state) => {
        const { isReady } = state;
        if (!isReady) {
          return loader;
        }

        return renderer(children, state);
      }}
    </FirebaseContext.Consumer>
  ),
);

IfFirebaseReady.displayName = 'IfFirebaseReady';

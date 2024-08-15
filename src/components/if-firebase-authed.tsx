import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

interface IfFirebaseAuthedProps extends Required<PropsWithChildren> {
  or?: ReactNode | undefined;
}

const IfFirebaseAuthed = React.memo(
  ({ children, or = undefined }: IfFirebaseAuthedProps) => (
    <FirebaseContext.Consumer>
      {(state) => {
        const { isReady, isSignedIn } = state;
        if (!isReady) return null;
        if (!isSignedIn) return (or && or(state)) || null;
        return renderer(children, state);
      }}
    </FirebaseContext.Consumer>
  ),
);

IfFirebaseAuthed.displayName = 'IfFirebaseAuthed';

import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

interface IfFirebaseNotAuthedProps extends Required<PropsWithChildren> {
  or?: ReactNode | undefined;
}

const IfFirebaseNotAuthed = React.memo(
  ({ children, or = undefined }: IfFirebaseNotAuthedProps) => (
    <FirebaseContext.Consumer>
      {(state) => {
        const { isReady, isSignedIn } = state;
        if (!isReady) return null;
        if (isSignedIn) return (or && or(state)) || null;
        return renderer(children, state);
      }}
    </FirebaseContext.Consumer>
  ),
);

IfFirebaseNotAuthed.displayName = 'IfFirebaseNotAuthed';

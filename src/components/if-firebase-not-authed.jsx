import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

const IfFirebaseNotAuthed = React.memo(({ children }) => (
  <FirebaseContext.Consumer>
    {state => {
      console.log('state', state);
      const { isReady, isSignedIn } = state;
      if (!isReady || isSignedIn) return null;
      return renderer(children, state);
    }}
  </FirebaseContext.Consumer>
));

IfFirebaseNotAuthed.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
};

IfFirebaseNotAuthed.displayName = 'IfFirebaseNotAuthed';

export default IfFirebaseNotAuthed;

import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

const IfFirebaseNotAuthed = React.memo(({ children, or }) => (
  <FirebaseContext.Consumer>
    {state => {
      const { isReady, isSignedIn } = state;
      if (!isReady) return null;
      if (isSignedIn) return (or && or(state)) || null;
      return renderer(children, state);
    }}
  </FirebaseContext.Consumer>
));

IfFirebaseNotAuthed.defaultProps = {
  or: null,
};

IfFirebaseNotAuthed.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
  or: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType,
    PropTypes.func,
  ]),
};

IfFirebaseNotAuthed.displayName = 'IfFirebaseNotAuthed';

export default IfFirebaseNotAuthed;

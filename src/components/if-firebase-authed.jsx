import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

const IfFirebaseAuthed = React.memo(({ children, or }) => (
  <FirebaseContext.Consumer>
    {state => {
      const { isReady, isSignedIn } = state;
      if (!isReady) return null;
      if (!isSignedIn) return (or && or(state)) || null;
      return renderer(children, state);
    }}
  </FirebaseContext.Consumer>
));

IfFirebaseAuthed.defaultProps = {
  or: null,
};

IfFirebaseAuthed.propTypes = {
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

IfFirebaseAuthed.displayName = 'IfFirebaseAuthed';

export default IfFirebaseAuthed;

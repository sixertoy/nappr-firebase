import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

const IfFirebaseAuthed = React.memo(({ children }) => (
  <FirebaseContext.Consumer>
    {state => {
      const { isReady, isSignedIn } = state;
      if (!isReady || !isSignedIn) return null;
      return renderer(children, state);
    }}
  </FirebaseContext.Consumer>
));

IfFirebaseAuthed.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
};

IfFirebaseAuthed.displayName = 'IfFirebaseAuthed';

export default IfFirebaseAuthed;

import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

const IfFirebaseReady = React.memo(({ children, loader }) => (
  <FirebaseContext.Consumer>
    {state => {
      const { isReady } = state;
      if (!isReady) return loader;
      return renderer(children, state);
    }}
  </FirebaseContext.Consumer>
));

IfFirebaseReady.defaultProps = {
  loader: null,
};

IfFirebaseReady.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
  loader: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};

IfFirebaseReady.displayName = 'IfFirebaseReady';

export default IfFirebaseReady;

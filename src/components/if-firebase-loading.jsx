import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseContext } from '../context';
import { renderer } from '../core';

const IfFirebaseLoading = React.memo(({ loader }) => (
  <FirebaseContext.Consumer>
    {state => {
      const { isReady } = state;
      if (isReady) return null;
      return renderer(loader, state);
    }}
  </FirebaseContext.Consumer>
));

IfFirebaseLoading.propTypes = {
  loader: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};

IfFirebaseLoading.displayName = 'IfFirebaseLoading';

export default IfFirebaseLoading;

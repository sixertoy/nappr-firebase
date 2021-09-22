import PropTypes from 'prop-types';
import React from 'react';

import FirebaseContext from './context';

const FirebaseConsumer = ({ children }) => (
  <FirebaseContext.Consumer>
    {state => children(state)}
  </FirebaseContext.Consumer>
);

FirebaseConsumer.propTypes = {
  children: PropTypes.func.isRequired,
};

FirebaseConsumer.displayName = 'FirebaseConsumer';

export default FirebaseConsumer;

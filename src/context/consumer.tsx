import type { ContextStateInterface } from '../interfaces';
import { FirebaseContext } from './context';

interface FirebaseConsumerProps {
  children: (value: ContextStateInterface) => JSX.Element;
}

export const FirebaseConsumer = ({ children }: FirebaseConsumerProps) => (
  <FirebaseContext.Consumer>
    {(state) => children(state)}
  </FirebaseContext.Consumer>
);

FirebaseConsumer.displayName = 'FirebaseConsumer';

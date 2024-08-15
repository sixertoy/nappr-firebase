import { FirebaseContext } from './context';

interface FirebaseConsumerProps {
  children: (value: any) => JSX.Element;
}

export const FirebaseConsumer = ({ children }: FirebaseConsumerProps) => (
  <FirebaseContext.Consumer>
    {(state) => children(state)}
  </FirebaseContext.Consumer>
);

FirebaseConsumer.displayName = 'FirebaseConsumer';

import { NapprFirebaseException } from './firebase.exception';

export class NapprFirebaseLoadingException extends NapprFirebaseException {
  constructor() {
    super('Unable to load firebase configuration');
  }
}

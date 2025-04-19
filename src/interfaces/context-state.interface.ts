import type { FirebaseApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';
import type { Database } from 'firebase/database';

export interface ContextStateInterface {
  app: FirebaseApp | null;
  auth: Auth;
  db: Database;
  isAdmin: boolean;
  isAnonymous: boolean;
  isReady: boolean;
  isSignedIn: boolean;
  providerId: string;
  token: string;
  user: User;
}

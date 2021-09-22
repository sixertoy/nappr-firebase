# NAPPR FIREBASE AUTH

Firebase React Auth Helper

## Install

```bash
yarn add @nappr/nappr-firebase-auth firebase
```

## Usage

```javascript
import {
  FirebaseAuthProvider,
  FIREBASE_AUTH_LOCAL, // default
} from '@nappr/nappr-firebase-auth';

const Root = () => (
  <StrictMode>
    ...
    <FirebaseAuthProvider persistence={FIREBASE_AUTH_LOCAL}>
      ...
    </FirebaseAuthProvider>
    ...
  </StrictMode>
);
```

**.env file variables**

```bash
REACT_APP_FIREBASE_apiKey=
REACT_APP_FIREBASE_authDomain=
REACT_APP_FIREBASE_databaseURL=
REACT_APP_FIREBASE_projectId=
REACT_APP_FIREBASE_storageBucket=
REACT_APP_FIREBASE_messagingSenderId=
REACT_APP_FIREBASE_appId=
REACT_APP_FIREBASE_measurementId=
```

# NAPPR FIREBASE

Firebase React Helper

## Install

```bash
yarn add firebase @nappr/firebase
```

## Usage

```javascript
import { FirebaseAuthProvider } from '@nappr/firebase';

const Root = () => (
  <StrictMode>
    ...
    <FirebaseAuthProvider>...</FirebaseAuthProvider>
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

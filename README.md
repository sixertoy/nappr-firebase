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
apiKey=
authDomain=
databaseURL=
projectId=
storageBucket=
messagingSenderId=
appId=
measurementId=
```

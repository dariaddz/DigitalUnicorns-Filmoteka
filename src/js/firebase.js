import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyADpY9hGz0v8th_2uF9-KsxlvvtIwPwaic',
  authDomain: 'digitalunicorns-filmoteka.firebaseapp.com',
  projectId: 'digitalunicorns-filmoteka',
  storageBucket: 'digitalunicorns-filmoteka.appspot.com',
  messagingSenderId: '1088667828357',
  appId: '1:1088667828357:web:9a27bece531ed16f5269ec',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

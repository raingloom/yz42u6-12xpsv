// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export function fbINit() {
  const firebaseConfig = {
    apiKey: 'AIzaSyAJmO9eQxVzrJ3RUDJKqYwNhMtO_GPvOwM',

    authDomain: 'hotwarez-fb265.firebaseapp.com',

    projectId: 'hotwarez-fb265',

    storageBucket: 'hotwarez-fb265.appspot.com',

    messagingSenderId: '969793366660',

    appId: '1:969793366660:web:5bf4139d883e2cd0aab0d1',
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAByLZoXrBwKBKQlq6XeFMUg-f2zZabKhM",
  authDomain: "fir-app-todo.firebaseapp.com",
  projectId: "fir-app-todo",
  storageBucket: "fir-app-todo.appspot.com",
  messagingSenderId: "652863719383",
  appId: "1:652863719383:web:86899a55bb3f0cf7f0ad92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

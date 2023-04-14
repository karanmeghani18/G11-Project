// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjrog7TM-28ySS79xZkNnjG2OJgmLn-bg",
  authDomain: "share-783be.firebaseapp.com",
  projectId: "share-783be",
  storageBucket: "share-783be.appspot.com",
  messagingSenderId: "373223892896",
  appId: "1:373223892896:web:09538b388a8efd59ae66c5",
  measurementId: "G-E0Z17NWNHN"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);




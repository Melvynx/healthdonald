// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Q9fmM-xrTi2BpSswreNr_DysRizvAdE",
  authDomain: "healthdonald-d7983.firebaseapp.com",
  projectId: "healthdonald-d7983",
  storageBucket: "healthdonald-d7983.appspot.com",
  messagingSenderId: "1042632849926",
  appId: "1:1042632849926:web:c8a85f1c5590dcbf2ee187",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

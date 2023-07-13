import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage, ref } from "firebase/storage";
import { getFirestore,collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlowFTpB-7LxYWYtQX2T6b4CuWzu1efQI",
  authDomain: "mychat-a187d.firebaseapp.com",
  projectId: "mychat-a187d",
  storageBucket: "mychat-a187d.appspot.com",
  messagingSenderId: "197199639362",
  appId: "1:197199639362:web:a2753d687d96e2dbaf4edb",
  measurementId: "G-L4CY3V0FNC"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
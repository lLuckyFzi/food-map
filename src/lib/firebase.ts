import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxUnf86fZ5SjdoqL8UZlpSsYX8CsuU06Y",
  authDomain: "aroma-be-15f48.firebaseapp.com",
  projectId: "aroma-be-15f48",
  storageBucket: "aroma-be-15f48.appspot.com",
  messagingSenderId: "1075645560125",
  appId: "1:1075645560125:web:0c2154e9e6aaba93854154",
  measurementId: "G-SY80HCB8Z1",
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

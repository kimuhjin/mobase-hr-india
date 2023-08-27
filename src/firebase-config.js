import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLb2SMiatiJB8sVtr9-FZ9ovRpnwyoE1w",
  authDomain: "mobase-hr-1caa8.firebaseapp.com",
  projectId: "mobase-hr-1caa8",
  storageBucket: "mobase-hr-1caa8.appspot.com",
  messagingSenderId: "1013654752533",
  appId: "1:1013654752533:web:3d03dd26a60acae4916d1c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

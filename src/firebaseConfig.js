import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // 
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
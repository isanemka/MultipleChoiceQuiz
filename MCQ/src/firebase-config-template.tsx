import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  // Insert config text here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

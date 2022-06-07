import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCMY53DnD70kzlmsTL_twCrkXJXdrETJd0",
  authDomain: "deskala-2c4f2.firebaseapp.com",
  projectId: "deskala-2c4f2",
  storageBucket: "deskala-2c4f2.appspot.com",
  messagingSenderId: "230641353689",
  appId: "1:230641353689:web:33c427d217f542325f8fc8"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth,db }
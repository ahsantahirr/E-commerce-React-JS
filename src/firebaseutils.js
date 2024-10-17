
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD7cazRppxklt-uWYV0WoO9Jn9OyRtDwks",
  authDomain: "e-commerce-reac-f7b6c.firebaseapp.com",
  projectId: "e-commerce-reac-f7b6c",
  storageBucket: "e-commerce-reac-f7b6c.appspot.com",
  messagingSenderId: "238857192496",
  appId: "1:238857192496:web:bbb6f63c61a5d1169199f5",
  measurementId: "G-D37XJHN6J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // Add Firestore initialization
console.log(app)

export{auth, signInWithPopup, GoogleAuthProvider }





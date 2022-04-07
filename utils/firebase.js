import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCsGyf4z2SrI7HTb5pdqdvidondd9dlao",
  authDomain: "nft-capstone.firebaseapp.com",
  projectId: "nft-capstone",
  storageBucket: "nft-capstone.appspot.com",
  messagingSenderId: "516410884959",
  appId: "1:516410884959:web:1373710a3304453162ecea",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()

// Use Firestore authentication
export const auth = getAuth(app)
export default db

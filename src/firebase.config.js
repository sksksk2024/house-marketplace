import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw5vavXNJKbLRHCy3EkiHAMvk2ldWv5rc",
  authDomain: "house-marketplace-app-e5664.firebaseapp.com",
  projectId: "house-marketplace-app-e5664",
  storageBucket: "house-marketplace-app-e5664.appspot.com", // Update storage bucket format
  messagingSenderId: "88198328469",
  appId: "1:88198328469:web:00628da4074641e6302b9c"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);
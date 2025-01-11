import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCw5vavXNJKbLRHCy3EkiHAMvk2ldWv5rc',
  authDomain: 'house-marketplace-app-e5664.firebaseapp.com',
  projectId: 'house-marketplace-app-e5664',
  storageBucket: 'house-marketplace-app-e5664.appspot.com',
  messagingSenderId: '88198328469',
  appId: '1:88198328469:web:00628da4074641e6302b9c',
};

const app = initializeApp(firebaseConfig); // Store app initialization in a variable

export const db = getFirestore(app); // Now using the initialized app to get Firestore

import auth from '@react-native-firebase/auth';
import { initializeApp } from '@react-native-firebase/app';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5_nF60Qxj2tqbPeGBESqefgrrtgO_xTM",
  authDomain: "isl-slt.firebaseapp.com",
  projectId: "isl-slt",
  storageBucket: "isl-slt.firebasestorage.app",
  messagingSenderId: "900537886059",
  appId: "1:900537886059:web:5a7d9eb586d343af80982e",
  measurementId: "G-BTKBRZ1S0T"
};

// Initialize Firebase
if (!auth().app) {
  initializeApp(firebaseConfig);
}

export { auth }; 
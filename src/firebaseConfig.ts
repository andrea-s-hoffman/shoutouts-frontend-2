import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLEkcIZbwS5GQUUW3ac6VEP0d81PhiIfo",
  authDomain: "shoutouts-bc324.firebaseapp.com",
  projectId: "shoutouts-bc324",
  storageBucket: "shoutouts-bc324.appspot.com",
  messagingSenderId: "910592594104",
  appId: "1:910592594104:web:999b6dad8a1bfd9db7e44d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export const signInWithGoogle = (): void => {
  signInWithPopup(auth, authProvider);
};

export const signOut = (): void => {
  auth.signOut();
};

export const storage = getStorage(app);

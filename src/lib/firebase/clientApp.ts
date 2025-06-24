
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage"; // Added FirebaseStorage import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVm3i_p2gL8Uq8qK9yJ1lB3nZ6H4fD5s",
  authDomain: "vaultbychase.firebaseapp.com",
  projectId: "vaultbychase",
  storageBucket: "vaultbychase.appspot.com",
  messagingSenderId: "430503191055",
  appId: "1:430503191055:web:663966a7b3c71dc738797a",
  measurementId: "G-138PW9EKND"
};

let app: FirebaseApp;
let auth: Auth;
let storage: FirebaseStorage; // Added storage variable

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
auth = getAuth(app);
storage = getStorage(app); // Initialize Firebase Storage

export { app, auth, storage }; // Export storage

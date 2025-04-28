
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAQJFWFhWj0pJbqKwxAzAq08QzmuzcuCtQ", // Clave de API
  authDomain: "ecommerce-app-26174.firebaseapp.com", // ID del proyecto + firebaseapp.com
  projectId: "ecommerce-app-26174", // ID del proyecto
  storageBucket: "ecommerce-app-26174.appspot.com", // ID del proyecto + appspot.com
  messagingSenderId: "174511783980", // Número del proyecto
  appId: "1:174511783980:web:abcd1234efgh5678", // ID específico de la app
  measurementId: "G-XXXXXXXXXX" 
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app); 

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

export { auth, providerGoogle, providerFacebook, db }; // Exporta db para su uso en otras partes de la aplicación

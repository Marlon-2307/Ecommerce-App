"use client";

import { auth, providerGoogle, db } from "@/firebase/firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Image from 'next/image'; 
import { setDoc, doc } from "firebase/firestore"; 

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true); 

  const loginGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, providerGoogle);
      onClose(); 
      router.refresh();
    } catch (error) {
      console.error("Error con Google Login:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loginEmailPassword = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose(); 
      router.refresh(); 
    } catch (error) {
      console.error(error); 
      setErrorMessage("Credenciales incorrectas. Intenta de nuevo.");
    }
    finally {
      setIsLoading(false);
    }
  };

  const registerEmailPassword = async () => {
    setIsLoading(true);
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });

      onClose(); 
      router.refresh(); 
    } catch (error) {
      console.error(error); 
      setErrorMessage("Error al crear la cuenta. Intenta de nuevo.");
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
        </h2>

        <div className="space-y-4 mb-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-b rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-b rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-b rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {errorMessage && (
            <div className="text-red-600 text-sm text-center">{errorMessage}</div>
          )}

          <button
            onClick={isLogin ? loginEmailPassword : registerEmailPassword}
            className="w-full bg-pink-600 text-white py-3 rounded-md shadow-md hover:bg-pink-700 transition flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Cargando...</span>
              </div>
            ) : (
              isLogin ? 'Iniciar sesión' : 'Crear cuenta'
            )}
          </button>
        </div>

        <button
          onClick={loginGoogle}
          className="w-full bg-gray-100 text-gray-800 py-3 rounded-md shadow-md hover:bg-gray-200 transition mb-4 flex items-center justify-center"
        >
          <Image src="/logoGoogle.png" alt="Google Icon" width={20} height={20} className="mr-3" loading="lazy" />
          {isLogin ? 'Iniciar con Google' : 'Registrarse con Google'}
        </button>

        <p className="text-center text-sm">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-semibold ml-1"
          >
            {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;

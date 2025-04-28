"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { db } from "@/firebase/firebaseConfig"; // Importa la conexión a Firestore
import { addDoc, collection } from "firebase/firestore"; // Para guardar pedidos

const CheckoutPage: React.FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [nequiNumber, setNequiNumber] = useState("");
  const [daviplataNumber, setDaviplataNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simular el pago y guardar en Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !address || (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCVC)) || 
        (paymentMethod === "nequi" && !nequiNumber) || 
        (paymentMethod === "daviplata" && !daviplataNumber)) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setIsSubmitting(true);
    
    const orderData = {
      name,
      address,
      paymentMethod,
      cardNumber: paymentMethod === "card" ? cardNumber : null,
      cardExpiry: paymentMethod === "card" ? cardExpiry : null,
      cardCVC: paymentMethod === "card" ? cardCVC : null,
      nequiNumber: paymentMethod === "nequi" ? nequiNumber : null,
      daviplataNumber: paymentMethod === "daviplata" ? daviplataNumber : null,
      createdAt: new Date(),
    };

    try {
      // Guarda el pedido en Firestore
      const orderRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Pedido guardado en Firestore con ID:", orderRef.id);
      
      setIsSubmitting(false);
      setPaymentSuccess(true);
    } catch (err) {
      console.error("Error al guardar el pedido:", err);
      setIsSubmitting(false);
      setError("Hubo un problema al procesar tu pago. Intenta nuevamente.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="max-w-2xl mx-auto p-6 mt-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Detalles del Pago</h1>
        
        {paymentSuccess ? (
          <div className="text-center text-green-600 py-8">
            <h2 className="text-3xl font-semibold mb-4">¡Pago exitoso!</h2>
            <p>Gracias por tu compra. Te enviaremos los detalles al correo electrónico.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-md">
            {error && <p className="text-red-600">{error}</p>}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                placeholder="Marlon Colon"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Dirección de Envío
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                placeholder="Calle 123, Ciudad, País"
              />
            </div>

            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                Método de Pago
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="card">Tarjeta de Crédito/Débito</option>
                <option value="nequi">Nequi</option>
                <option value="daviplata">Daviplata</option>
                <option value="transferencia">Transferencia Bancaria</option>
              </select>
            </div>

            {paymentMethod === "card" && (
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Número de Tarjeta
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  placeholder="1234 5678 9876 5432"
                  maxLength={16}
                />
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                    Expiración
                  </label>
                  <input
                    type="text"
                    id="cardExpiry"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                    placeholder="MM/AA"
                  />
                </div>

                <div className="w-1/2">
                  <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cardCVC"
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value)}
                    className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
            )}

            {paymentMethod === "nequi" && (
              <div>
                <label htmlFor="nequiNumber" className="block text-sm font-medium text-gray-700">
                  Número de Nequi
                </label>
                <input
                  type="text"
                  id="nequiNumber"
                  value={nequiNumber}
                  onChange={(e) => setNequiNumber(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  placeholder="3001234567"
                />
              </div>
            )}

            {paymentMethod === "daviplata" && (
              <div>
                <label htmlFor="daviplataNumber" className="block text-sm font-medium text-gray-700">
                  Número de Daviplata
                </label>
                <input
                  type="text"
                  id="daviplataNumber"
                  value={daviplataNumber}
                  onChange={(e) => setDaviplataNumber(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  placeholder="3001234567"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out"
            >
              {isSubmitting ? "Procesando..." : "Pagar Ahora"}
            </button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;

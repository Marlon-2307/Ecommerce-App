"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { auth } from "@/firebase/firebaseConfig"; 
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LoginModal from "@/app/components/LoginModal"; 

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [customLoginMessage, setCustomLoginMessage] = useState("");
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const total = cart.reduce((acc, product) => acc + product.price, 0);

  const groupedCart = cart.reduce((acc, product) => {
    const existingProduct = acc.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      acc.push({ ...product, quantity: 1 });
    }
    return acc;
  }, [] as any[]);

  const handleProceedToPayment = () => {
    if (!user) {
      setCustomLoginMessage("Debes registrarte para poder completar tu compra.");
      setShowLoginModal(true);
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 mt-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-left">
          Carrito de Compras
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-8 text-xl text-gray-600">
            Tu carrito está vacío. ¡Agrega algunos productos!
          </div>
        ) : (
          <div className="flex space-x-8">
            {/* Productos */}
            <div className="flex-2 space-y-6 w-3/4">
              {groupedCart.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                >
                  <div className="flex items-center space-x-5">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <p className="text-md font-semibold text-gray-800">
                          Precio: ${product.price.toFixed(2)}
                        </p>
                        <p className="text-md font-semibold text-gray-800">
                          Cantidad: {product.quantity}
                        </p>
                        <p className="text-md font-semibold text-pink-600">
                          Total: ${(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="text-red-600 hover:text-red-800 font-semibold transition-all duration-300"
                  >
                    <span className="sr-only">Eliminar producto</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Resumen de compra */}
            <div className="w-2/5 space-y-6 bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resumen de Compra</h2>

              <div className="flex justify-between text-gray-800">
                <span className="text-lg font-semibold">Subtotal</span>
                <span className="text-lg font-semibold">${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-800 mt-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold text-pink-600">${total.toFixed(2)}</span>
              </div>

              {/* Cupón de descuento */}
              <div className="mt-4">
                <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">
                  Cupón de descuento
                </label>
                <input
                  type="text"
                  id="coupon"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Ingresa tu código"
                />
              </div>

              {/* Botón de pagar */}
              <div className="mt-auto">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out"
                >
                  Proceder al pago
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal si no esta logueado */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          customMessage={customLoginMessage}
        />
      )}

      <Footer />
    </div>
  );
};

export default CartPage;

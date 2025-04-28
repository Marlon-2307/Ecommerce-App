"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import Image from "next/image";
import UserOrders from "../components/UserOrders";

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">

      <aside className="w-full md:w-1/4 bg-white shadow-lg p-6 flex flex-col items-center rounded-r-xl">
        <div className="w-24 h-24 relative mb-4">
          <Image
            src="/logoPerfil2.png"
            alt="Avatar"
            fill
            className="rounded-full object-cover border-4 border-pink-500 p-1"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          {user?.displayName || "Usuario"}
        </h2>

        <p className="text-gray-500 text-sm mb-8 text-center">
          {user?.email || "correo@ejemplo.com"}
        </p>

        <div className="flex flex-col gap-4 w-full mt-6">
          <button
            className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-md text-md transition-all"
            onClick={() => router.push("/profile")}
          >
            Editar Perfil
          </button>

          <button
            className="w-full py-2 px-4 bg-white border border-pink-600 hover:bg-pink-600 text-pink-500 hover:text-white rounded-md text-md transition-all"
            onClick={() => router.push("/settings")}
          >
            Configuraciones
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-md text-md transition-all mt-auto"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <section className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Hola, {user?.displayName?.split(" ")[0]}
          </h1>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-md shadow-lg transition-all"
            onClick={() => {
              if (user) {
                router.push("/");
              } else {
                router.push("/login"); 
              }
            }}
          >
            Nuevo pedido
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Tus pedidos</h2>
          <UserOrders />
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;

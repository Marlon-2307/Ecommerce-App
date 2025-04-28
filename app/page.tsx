"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { db } from "@/firebase/firebaseConfig";  
import { collection, getDocs } from "firebase/firestore";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductoCard";  

interface Product {
  id: string;        
  name: string;     
  description: string;
  price: number;     
  imageUrl: string;  
}

const HomePage: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");  
      const productSnapshot = await getDocs(productsCollection);  
      const productList = productSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,      
          name: data.name,  
          description: data.description,
          price: data.price, 
          imageUrl: data.imageUrl, 
        };
      });

      console.log("Productos obtenidos de Firestore:", productList);  
      setProducts(productList);  
      setIsLoading(false);  
    };

    fetchProducts();
  }, []);  

  if (isLoading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <>
      <Navbar />
      
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 space-y-10">
        {/* Banner */}
        <section
          className="w-full h-[450px] relative bg-cover bg-center rounded-xl"
          style={{ backgroundImage: "url('/banner3.jpg')" }}
        >
          <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-12">
            <div className="bg-white bg-opacity-70 p-6 sm:p-8 rounded-xl max-w-md text-left mr-4 lg:mr-32 max-md:rounded-none">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                Nueva
                <br />
                <span className="text-6xl sm:text-7xl">Colección</span>
              </h1>
              <p className="text-xl text-pink-600 font-semibold mb-4">Con el ¡20% Off! para clientes VIP.</p>
              <p className="text-gray-700 mb-6 max-sm:text-center">
                Vive el estilo con nuestra nueva línea de temporada en <span className="text-pink-700">Julie Boutique</span>
                .</p>
              <button
                onClick={() => router.push("/productos")}
                className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-all shadow-md text-center flex items-center justify-center"
              >
                Ver Catalogo
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          {products.length === 0 ? (
            <p>No se encontraron productos</p>  
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))
          )}
        </section>

        {!user && (
          <button
            onClick={() => router.push("/productos")}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Ver Todo
          </button>
        )}
      </main>
      <Footer />
    </>
  );
}

export default HomePage;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useCart } from "@/app/context/CartContext"; 

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  details: string;
  price: number;
  imageUrl: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); 
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [quantity, setQuantity] = useState<number>(1); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || Array.isArray(id)) {
        setError("ID del producto inválido");
        setLoading(false);
        return;
      }

      const docRef = doc(db, "products", id);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({
            id: docSnap.id,
            name: data.name,
            description: data.description,
            details: data.details,
            price: data.price,
            imageUrl: data.imageUrl,
          });
        } else {
          setError("Producto no encontrado");
        }
      } catch (error) {
        console.log(error);
        setError("Hubo un error al cargar los detalles del producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {

      addToCart({ ...product, quantity });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuantity = Number(e.target.value);
    setQuantity(selectedQuantity);

    if (product) {

      addToCart({ ...product, quantity: selectedQuantity });
    }
  };

  if (loading) return <p className="text-center text-xl">Cargando detalles del producto...</p>;
  if (error) return <p className="text-center text-xl text-red-600">{error}</p>;
  if (!product) return <p className="text-center text-xl">Producto no encontrado</p>;

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center bg-gray- p-14 bg-gray-50">

        <section className="flex flex-col md:flex-row w-full max-w-5xl rounded-xl overflow-hidden">

          <div className="w-full md:w-1/3 flex justify-center items-center p-4 bg-white">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover rounded-lg"
              loading="lazy"
            />
          </div>

          <div className="w-full md:w-2/3 md:ml-6 mt-6 md:mt-0 px-6 py-4 flex flex-col justify-start space-y-6 bg-white">
            <h1 className="text-3xl font-semibold text-left">{product.name}</h1>
            <p className="text-md text-left text-gray-600">{product.details}</p>

            <div className="space-y-2">
              <p className="text-2xl font-bold text-pink-600">$ {product.price} COP</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <select
                  id="quantity"
                  className="p-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 w-36"
                  value={quantity}
                  onChange={handleQuantityChange} 
                >
                  {[1, 2, 3, 4, 5].map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart} 
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-md text-lg transition-all duration-300"
              >
                Agregar al Carro
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h3 className="text-gray-700 font-semibold">MEDIOS DE FINANCIACIÓN:</h3>
              <div className="flex items-center space-x-6">
                <Image src="/sistecredito.png" alt="Sistecrédito" width={120} height={30} />
                <Image src="/addi.png" alt="Addi" width={60} height={30} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-semibold">Comparte:</span>
              <a href="#" className="text-blue-600 hover:underline">
                <FacebookIcon fontSize="small" />
              </a>
              <a href="#" className="text-pink-500 hover:underline">
                <InstagramIcon fontSize="small" />
              </a>
              <a href="#" className="text-red-600 hover:underline">
                <YouTubeIcon fontSize="small" />
              </a>
              <a href="#" className="text-green-500 hover:underline">
                <WhatsAppIcon fontSize="small" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetailPage;

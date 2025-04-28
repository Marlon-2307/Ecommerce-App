"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext"; 

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  description,
}) => {
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {

    addToCart({ id, name, price, description, imageUrl });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-lg p-4">
      <div className="relative w-full h-64">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="object-cover transition-all duration-500 ease-in-out transform hover:scale-105 rounded-md"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 truncate text-center">{name}</h3>
        <p className="text-sm text-gray-600 truncate text-center">{description}</p>
        <p className="text-lg text-pink-600 text-center font-semibold mt-4">${price.toFixed(2)}</p>

        <div className="mt-6 flex flex-col gap-2">
          <Link href={`/product/${id}`} passHref>
            <button className="w-full border border-pink-600 font-semibold text-pink-600 py-2 rounded-lg hover:text-white hover:bg-pink-700 transition-all duration-300">
              Ver más detalles
            </button>
          </Link>

          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-600 text-white font-semibold py-2 rounded-lg hover:bg-pink-700 transition-all duration-300"
          >
            Compra rapida
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

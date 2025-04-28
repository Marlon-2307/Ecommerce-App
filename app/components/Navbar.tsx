import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LoginModal from "../components/LoginModal"; 
import { useState } from 'react';
import { useCart } from '@/app/context/CartContext'; 

const Navbar: React.FC = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const { cart } = useCart(); 

    return (
        <nav className="bg-white max-w-full flex justify-between items-center mx-auto px-6 py-4 shadow-sm">

            <Link href="/" className="flex items-center text-3xl font-semibold">
                <h1>Julie Boutique.</h1>
            </Link>

            <ul className="flex space-x-8 text-gray-800 font-medium">
                {["Inicio", "Nosotros", "Catalogo", "Blog", "Contacto"].map((item, index) => {
                    const path = ["/", "/about", "/products", "/blog", "/contact"][index];
                    return (
                    <li key={item} className="group relative">
                        <Link href={path} className="relative z-10">
                        {item}
                        <span className="block h-0.5 w-0 bg-pink-600 transition-all duration-300 group-hover:w-full absolute left-0 -bottom-1"></span>
                        </Link>
                    </li>
                    );
                })}
            </ul>

            <div className="flex space-x-6 items-center text-gray-700">
                <SearchIcon className="cursor-pointer" />
                
                <Link href="/cart" className="relative">
                    <ShoppingCartIcon className="cursor-pointer" />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 text-white bg-red-500 rounded-full text-xs px-2">
                            {cart.length}
                        </span>
                    )}
                </Link>

                <button onClick={() => setOpenLogin(true)}>
                    <PersonIcon className="cursor-pointer" />
                </button>
            </div>

            {openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}
        </nav>
    );
};

export default Navbar;

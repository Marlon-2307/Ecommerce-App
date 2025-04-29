import { FaFacebookF, FaPinterest, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-600 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 text-gray-100 max-md:px-8">

        <div className="max-md:text-center">
          <h3 className="text-xl font-bold mb-4 uppercase text-white">Acerca</h3>
          <hr className="text-gray-100" />
          <p className="text-sm leading-relaxed mt-4 text-gray-50">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="mt-4 text-white font-bold">Julie Boutique S.A</p>
        </div>

        {/* Columna Contacto */}
        <div className="max-md:text-center">
          <h3 className="text-xl font-bold mb-4 uppercase text-white">Contacto</h3>
          <hr className="text-gray-100" />
          <p className="text-sm mb-2 mt-4 text-gray-50">Teléfono: +57 300 6549873</p>
          <p className="text-sm mb-2 text-gray-50">Correo: info@gmail.com</p>
          <p className="text-sm mb-4 text-gray-50">Barranquilla | Colombia.</p>
          <div className="flex space-x-4 max-md:justify-center">
            {/* Íconos Sociales */}
            <a
              href="#"
              className="text-white hover:text-pink-200 transition"
              aria-label="Facebook"
            >
              <FaFacebookF size={22} />
            </a>
            <a
              href="#"
              className="text-white hover:text-pink-200 transition"
              aria-label="Twitter"
            >
              <FaPinterest size={22} />
            </a>
            <a
              href="#"
              className="text-white hover:text-pink-200 transition"
              aria-label="Instagram"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              className="text-white hover:text-pink-200 transition"
              aria-label="Tiktok"
            >
              <FaTiktok size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="border-t border-gray-100 mt-8 pt-4 text-left text-sm text-gray-100 max-md:text-center">
        <span className="ml-6">Copyright 2025 © Julie Boutique S.A</span>
      </div>
    </footer>
  );
};

export default Footer;

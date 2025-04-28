import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  // Asegúrate de importar jest-dom para usar toBeInTheDocument
import Navbar from '../app/components/Navbar'; // Ajusta la ruta de tu componente

test('Navbar muestra el logo correctamente', () => {
  render(<Navbar />);
  screen.debug(); // Esto imprimirá el DOM renderizado en la consola
  const logoElement = screen.getByText(/Julie Boutique./i);
  expect(logoElement).toBeInTheDocument(); // Verificar que el texto esté en el documento
});


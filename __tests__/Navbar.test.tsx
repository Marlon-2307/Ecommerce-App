import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  
import Navbar from '../app/components/Navbar'; 

test('Navbar muestra el logo correctamente', () => {
  render(<Navbar />);
  screen.debug(); 
  const logoElement = screen.getByText(/Julie Boutique./i);
  expect(logoElement).toBeInTheDocument(); 
});


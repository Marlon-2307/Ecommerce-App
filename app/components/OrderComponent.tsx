import { useState, useEffect } from 'react';

const OrderComponent = () => {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await fetch('/api/csrf'); // Solicitamos el token CSRF
      const data = await response.json();
      setCsrfToken(data.csrfToken);  // Guardamos el token CSRF en el estado
    };

    fetchCsrfToken(); // Llamamos a la función para obtener el token
  }, []);

  const handleOrder = async () => {
    const response = await fetch('/api/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken, // Enviamos el token CSRF en los encabezados
      },
      body: JSON.stringify({ orderData: 'Datos del pedido' }), // Datos del pedido
    });

    const result = await response.json();
    console.log(result);  // Mostrar el resultado de la solicitud
  };

  return (
    <div>
      <button onClick={handleOrder}>Realizar Pedido</button>
    </div>
  );
};

export default OrderComponent;

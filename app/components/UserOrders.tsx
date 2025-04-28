import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/app/hooks/useAuth"; 

type Order = {
  date: { seconds: number };
  total: string;
  status: string;
  products: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
};

const UserOrders: React.FC = () => {
  const { user } = useAuth(); 
  const [orders, setOrders] = useState<Order[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid) 
        );

        try {
          const querySnapshot = await getDocs(ordersQuery);
          const ordersData: Order[] = querySnapshot.docs.map((doc) => doc.data() as Order); 
          setOrders(ordersData);
        } catch (error) {
          console.error("Error al obtener los pedidos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Historial de Pedidos</h2>
      {orders.length === 0 ? (
        <p>No tienes pedidos aún.</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={index} className="bg-white p-4 mb-4 rounded-lg shadow-md">
              <p><strong>Fecha:</strong> {new Date(order.date.seconds * 1000).toLocaleString()}</p>
              <p><strong>Total:</strong> {order.total} COP</p>
              <p><strong>Estado:</strong> {order.status}</p>
              <ul>
                {order.products.map((product, i) => (
                  <li key={i}>
                    {product.name} - {product.quantity} x {product.price} COP
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;

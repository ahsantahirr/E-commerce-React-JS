import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseutils"; // Firebase Firestore config
import { userContext } from "../Contexts/userContext";
// import { Spinner } from "../components/Spinner"; // Add spinner component
import { ColorRing } from 'react-loader-spinner';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { user } = useContext(userContext);
  // console.log("user", user);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        setLoading(true); // Set loading to true when fetching data
        const ordersQuery = query(
          collection(db, "orders"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(ordersQuery);

        const ordersList = [];
        querySnapshot.forEach((doc) => {
          ordersList.push(doc.data());
        });

        setOrders(ordersList);
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
        <div className="flex justify-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#849b87']}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 h-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg mb-6 p-6 border border-gray-200 h-full"
          >
            <h3 className="text-xl font-semibold mb-4">Order #{index + 1}</h3>
            <p className="text-lg mb-2">Subtotal: ${order.subtotal}</p>
            <p className="text-lg mb-4">Status: {order.status}</p>
            <ul className="space-y-4">
              {order.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                >
                  <img
                    className="w-16 h-16 rounded object-cover"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <span className="text-lg">
                    {item.title} - {item.quantity} x ${item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;

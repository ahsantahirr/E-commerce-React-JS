import { useEffect, useState } from "react";
import { collection, query, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseutils"; // Firebase Firestore config
import { ColorRing } from 'react-loader-spinner';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to update the order status in Firestore
  const updateOrderStatus = async (orderId, newStatus) => {
    const orderRef = doc(db, "orders", orderId);
    try {
      await updateDoc(orderRef, {
        status: newStatus,
      });
      console.log(`Order ${orderId} updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const q = query(collection(db, "orders"));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const ordersList = [];
        querySnapshot.forEach((doc) => {
          ordersList.push({ id: doc.id, ...doc.data() });
        });
        setOrders(ordersList);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchOrders();
  }, []);

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
    <div className="max-w-6xl mx-auto my-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Order Management</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            >
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Order #{index + 1}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "pending" ? "bg-yellow-100 text-yellow-600" :
                    order.status === "processed" ? "bg-blue-100 text-blue-600" :
                    order.status === "shipped" ? "bg-indigo-100 text-indigo-600" :
                    order.status === "delivered" ? "bg-green-100 text-green-600" :
                    "bg-red-100 text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* User Information */}
              <div className="mb-4">
                <h4 className="text-lg font-bold text-gray-700">Customer Information</h4>
                <p className="text-gray-600">Name: <span className="font-medium">{order.name}</span></p>
                <p className="text-gray-600">Email: <span className="font-medium">{order.email}</span></p>
                <p className="text-gray-600">Phone: <span className="font-medium">{order.phone}</span></p>
                <p className="text-gray-600">Address: <span className="font-medium">{order.address}</span></p>

              </div>

              <p className="text-lg font-medium mb-2">Subtotal: <span className="font-bold">${order.subtotal}</span></p>

              <ul className="mb-4">
                {order.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center space-x-4 py-2 border-b last:border-b-0"
                  >
                    <img
                      className="w-16 h-16 rounded-lg object-cover"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                    <span className="text-gray-700">
                      {item.title} - {item.quantity} x ${item.price}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <select
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processed">Processed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminOrders;

import React, { useState } from 'react';

function AdminOrders() {
  // Sample order data (in reality, you would fetch this from a database)
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', product: 'Laptop', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', product: 'Phone', status: 'Shipped' },
    { id: 3, customer: 'Sam Johnson', product: 'Headphones', status: 'Rejected' },
  ]);

  // Handler to update order status
  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6">Order Management</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b text-center">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.customer}</td>
                <td className="py-2 px-4 border-b">{order.product}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <button 
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded" 
                      onClick={() => updateStatus(order.id, 'Pending')}
                    >
                      Pending
                    </button>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" 
                      onClick={() => updateStatus(order.id, 'Rejected')}
                    >
                      Reject
                    </button>
                    <button 
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded" 
                      onClick={() => updateStatus(order.id, 'Completed')}
                    >
                      Complete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;

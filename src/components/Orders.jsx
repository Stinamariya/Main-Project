import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setOrders(response.data);
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
    });
  }, []);

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Items:</strong> {order.items.join(', ')}</p>
              {/* Render other order details */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}

      <style jsx>{`
        .orders {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h2 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 20px;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        .order-item {
          background-color: #f8f8f8;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 15px;
          margin-bottom: 15px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .order-item p {
          margin: 5px 0;
        }

        .order-item strong {
          font-weight: bold;
        }

        p {
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default Orders;
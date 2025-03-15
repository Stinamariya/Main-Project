// import React, { useEffect, useState } from "react";

// function Orders() {
//   const [order, setOrder] = useState(null);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const storedOrder = JSON.parse(localStorage.getItem(`order_${userId}`));
//     setOrder(storedOrder);
//   }, [userId]);

//   return (
//     <div>
//       <h1>Your Order Details</h1>
//       {order ? (
//         <div>
//           <h3>Order ID: {userId}</h3>
//           <p><strong>Name:</strong> {order.user.name}</p>
//           <p><strong>Phone:</strong> {order.user.phone}</p>
//           <p><strong>Address:</strong> {order.user.address}</p>
//           <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
//           <h3>Products Ordered:</h3>
//           <ul>
//             {order.products.map((product) => (
//               <li key={product._id}>
//                 {product.productName} - {product.quantity} x ${product.price} = ${(product.price * product.quantity).toFixed(2)}
//               </li>
//             ))}
//           </ul>
//           <h3>Total Paid: ${order.totalAmount}</h3>
//           <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
//         </div>
//       ) : (
//         <p>No orders found.</p>
//       )}
//     </div>
//   );
// }

// export default Orders;










import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Orders() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem(`order_${userId}`));
    setOrder(storedOrder);
  }, [userId]);
  const navigateToOrderConfirm = () => {
    navigate("/orderconfirm");  // Navigate to the order confirm page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Order Details</h1>
      {order ? (
        <div style={styles.orderDetails}>
          <h3>Order ID: {userId}</h3>
          <p><strong>Name:</strong> {order.user.name}</p>
          <p><strong>Phone:</strong> {order.user.phone}</p>
          <p><strong>Address:</strong> {order.user.address}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          
          <h3>Products Ordered:</h3>
          <ul style={styles.productList}>
            {order.products.map((product) => (
              <li key={product._id} style={styles.productItem}>
                {product.productName} - {product.quantity} x ${product.price} = ${(product.price * product.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          
          <h3>Total Paid: ${order.totalAmount}</h3>
          <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
          <button onClick={navigateToOrderConfirm} style={styles.button}>
            Go to Order Confirmation
          </button>
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  heading: {
    textAlign: "center",
    color: "#007BFF",
    marginBottom: "20px",
  },
  orderDetails: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "80%",
    margin: "0 auto",
  },
  productList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  productItem: {
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
};

export default Orders;


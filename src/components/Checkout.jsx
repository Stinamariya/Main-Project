import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "Card Payment",
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    try {
      const storedCheckoutItems = JSON.parse(localStorage.getItem(`checkout_${userId}`)) || [];
      setSelectedProducts(storedCheckoutItems);
    } catch (error) {
      console.error("Error loading checkout items:", error);
    }
  }, [userId]);

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, phone, address } = userDetails;
    const phoneRegex = /^[0-9]{10}$/;
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("All fields are required.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      alert("Enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
  
    const orderDetails = {
      userId,
      name: userDetails.name,
      phone: userDetails.phone,
      address: userDetails.address,
      paymentMethod: userDetails.paymentMethod,
      products: selectedProducts,
      totalPrice: selectedProducts.reduce((sum, product) => sum + (product.price || 0) * product.quantity, 0).toFixed(2),
      paymentStatus: "Paid",
    };
  
    console.log("🔹 Sending order to backend:", orderDetails);
  
    try {
      const response = await fetch("http://localhost:3031/api/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        console.error("❌ Order placement failed:", errorMessage);
        alert("Error placing order. Please try again.");
        return;
      }
  
      const result = await response.json();
      console.log("✅ Order placed successfully:", result);
  
      localStorage.setItem(`order_${userId}`, JSON.stringify(orderDetails));
      localStorage.removeItem(`checkout_${userId}`);
      
      alert(`Payment Successful! Order placed using ${userDetails.paymentMethod}.`);
      navigate("/orders");
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Failed to place order. Please check your connection.");
    }
  };
  
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "600px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Checkout</h1>
      <h3 style={{ color: "#555" }}>Enter Your Details:</h3>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={userDetails.name}
        onChange={handleInputChange}
        required
        style={{ width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "4px" }}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={userDetails.phone}
        onChange={handleInputChange}
        required
        style={{ width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "4px" }}
      />
      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={userDetails.address}
        onChange={handleInputChange}
        required
        style={{ width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "4px" }}
      />

      <h3 style={{ color: "#555" }}>Select Payment Method:</h3>
      <select
        name="paymentMethod"
        value={userDetails.paymentMethod}
        onChange={handleInputChange}
        style={{ width: "100%", padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "4px" }}
      >
        <option value="Card Payment">Card Payment</option>
        <option value="UPI">UPI</option>
        <option value="Net Banking">Net Banking</option>
        <option value="Cash on Delivery">Cash on Delivery</option>
      </select>

      <h3 style={{ color: "#555" }}>Order Summary:</h3>
<ul style={{ listStyleType: "none", padding: "0" }}>
  {selectedProducts.map((product) => (
    <li key={product._id} style={{ padding: "10px 0", borderBottom: "1px solid #ddd" }}>
      {product.productName} - ₹{product.price} x {product.quantity} = ₹{(product.price * product.quantity).toFixed(2)}
    </li>
  ))}
</ul>
<h3 style={{ fontWeight: "bold", color: "#333" }}>
  Total: ₹{selectedProducts.reduce((sum, product) => sum + (product.price || 0) * product.quantity, 0).toFixed(2)}
</h3>

      <button
        onClick={handlePayment}
        style={{
          padding: "12px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          width: "100%",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;

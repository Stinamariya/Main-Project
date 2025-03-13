import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const { cart, billingDetails: initialBillingDetails } = location.state || {}; // Receive billingDetails
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [billingDetails, setBillingDetails] = useState(initialBillingDetails || {});
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const navigate = useNavigate();
  const selectedProducts = cart.filter((product) => product.selected); 


  useEffect(() => {
    // Validate the form: all fields should be filled
    const isValid =
      billingDetails.name && billingDetails.address && billingDetails.phone;
    setIsFormValid(isValid);
  }, [billingDetails]);
  

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
  
    // Check if value is defined, otherwise default to an empty string
    const newValue = value ? value.trim() : '';  // Default to empty string if undefined
  
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: newValue,
    }));
  };
  

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
  
    // Ensure value is defined and not null before calling .trim()
    const newValue = value ? value.trim() : '';  // Default to empty string if value is undefined
  
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: newValue,
    }));
  };
  

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
  
    // Check if value is defined, otherwise default to an empty string
    const newValue = value ? value.trim() : '';  // Default to empty string if undefined
  
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: newValue,
    }));
  };
  
  // Inside your Checkout page (or wherever the payment is handled):
  const handleCheckout = () => {
    const orderSummary = {
      products: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    };
  
    // Simulate successful payment
    alert("Payment successful! Your order has been placed.");
  
    // Navigate to the order confirmation page with orderSummary
    navigate("/order-confirmation", { state: { orderSummary } });
  };
  
  const handlePaymentSuccess = (paymentData) => {
    const userId = localStorage.getItem("userId"); // Get userId from local storage or context
    if (!userId) {
      alert("User not logged in. Please log in first.");
      navigate("/login"); // Redirect to login if userId is missing
      return;
    }
  
    const selectedProducts = cart.filter((product) => product.selected);
  
    const orderDetails = {
      userId, // Include userId
      cart: selectedProducts,
      payment: {
        id: paymentData.id,
        amount: paymentData.amount,
        method: paymentData.method,
        status: "Success",
      },
    };
  
    // Navigate to the order confirmation page with order details
    navigate("/order-confirmation", { state: { order: orderDetails } });
  };
  
  
  

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Shipping and Billing Details</h1>
      
      <br />
      <div className="billing-details">
        
        <label>
          <strong>Name:</strong>
          <input
            type="text"
            name="name"
            value={billingDetails.name}
            onChange={handleBillingChange}
            placeholder="Enter your full name"
          />
        </label>
        <br />
        <label>
            <br/>
          <strong>Address:</strong>
          <input
            type="text"
            name="address"
            value={billingDetails.address}
            onChange={handleAddressChange}
            placeholder="Enter your shipping address"
          />
        </label>
        <br />
        <label>
        <br/>
          <strong>Phone:</strong>
          <input
            type="text"
            name="phone"
            value={billingDetails.phone}
            onChange={handlePhoneChange}
            placeholder="Enter your phone number"
          />
        </label>
        
      </div>
      <br />
      <label className="checkout-label">
        Payment Method:
        <select 
          className="checkout-select" 
          value={paymentMethod} 
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </label>

      <button 
        className="checkout-btn" 
        onClick={handleCheckout} 
        disabled={!isFormValid} // Disable if form is not valid
      >
        Place Order
      </button>

      <style jsx>{`
        /* General Checkout Styles */
        .checkout-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #f9f9f9;
        }

        .checkout-title {
          text-align: center;
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }

        .checkout-label {
          display: block;
          margin-bottom: 10px;
          font-weight: bold;
          font-size: 16px;
        }

        .checkout-input,
        .checkout-select {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
        }

        .checkout-btn {
          width: 100%;
          padding: 12px;
          background-color: #4CAF50;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .checkout-btn:disabled {
          background-color: #b0b0b0;
          cursor: not-allowed;
        }

        .checkout-btn:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}

export default Checkout;
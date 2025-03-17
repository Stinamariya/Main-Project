import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || []; // Default to empty array

  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    const initialSelectedItems = cart.reduce((acc, product) => {
      acc[product._id] = { selected: true, quantity: product.quantity }; // Use _id for uniqueness
      return acc;
    }, {});
    setSelectedItems(initialSelectedItems);
  }, [cart]);

  // Calculate subtotal, discount, tax, and total
  const calculateTotal = () => {
    let subtotal = 0;
    cart.forEach((product) => {
      if (selectedItems[product._id]?.selected) {
        subtotal += product.price * selectedItems[product._id]?.quantity;
      }
    });

    const discount = subtotal > 50 ? 10 : 0; // Discount if subtotal is above 50
    const tax = subtotal * 0.08; // Tax rate of 8%
    const total = subtotal + tax - discount;
    return { subtotal, total, discount, tax };
  };

  const { subtotal, total, discount, tax } = calculateTotal();

  const handleProductSelection = (productId) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [productId]: {
        ...prevState[productId],
        selected: !prevState[productId].selected,
      },
    }));
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [productId]: {
        ...prevState[productId],
        quantity: Math.max(1, quantity),
      },
    }));
  };

  const proceedToPayment = () => {
    const selectedProducts = cart.filter((product) => selectedItems[product._id]?.selected);
    navigate("/checkout", { state: { cart: selectedProducts } });
  };

  if (cart.length === 0) {
    return <div>No items in cart. Please add items before proceeding.</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h3 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>Order Summary</h3>
      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
        {cart.map((product) => (
          <li key={product._id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "16px" }}>
                <input
                  type="checkbox"
                  checked={selectedItems[product._id]?.selected}
                  onChange={() => handleProductSelection(product._id)}
                  style={{ marginRight: "10px" }}
                />
                <span>{product.productName}</span> - {product.quantity} x ${product.price}
              </label>
            </div>

            {selectedItems[product._id]?.selected && (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="number"
                  value={selectedItems[product._id]?.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product._id, parseInt(e.target.value) || 1)
                  }
                  min="1"
                  style={{
                    padding: "5px",
                    fontSize: "14px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "60px",
                  }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        {discount > 0 && <p><strong>Discount:</strong> -${discount.toFixed(2)}</p>}
        <p><strong>Tax (8%):</strong> +${tax.toFixed(2)}</p>
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>

      <button
        onClick={proceedToPayment}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Proceed to Pay
      </button>
    </div>
  );
}

export default OrderSummary;


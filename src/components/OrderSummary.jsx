import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || []; // Default to empty array

  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    // Initialize selectedItems with the quantity of each product (default is 1)
    const initialSelectedItems = cart.reduce((acc, product) => {
      acc[product.productName] = { selected: true, quantity: product.quantity }; // Default all products as selected with their initial quantity
      return acc;
    }, {});
    setSelectedItems(initialSelectedItems);
  }, [cart]);

  // Calculate subtotal, discount, tax, and total
  const calculateTotal = () => {
    let subtotal = 0;
    cart.forEach((product) => {
      if (selectedItems[product.productName]?.selected) {
        subtotal += product.price * selectedItems[product.productName]?.quantity;
      }
    });

    const discount = 10; // Example fixed discount
    const tax = subtotal * 0.08; // Example tax rate of 8%
    const total = subtotal + tax - discount;
    return { subtotal, total, discount, tax };
  };

  const { subtotal, total, discount, tax } = calculateTotal();

  // Handle product selection toggle
  const handleProductSelection = (productName) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [productName]: {
        ...prevState[productName],
        selected: !prevState[productName].selected,
      },
    }));
  };

  // Handle quantity change using number input
  const handleQuantityChange = (productName, quantity) => {
    setSelectedItems((prevState) => {
      const newQuantity = Math.max(1, quantity); // Prevent quantity from going below 1
      return {
        ...prevState,
        [productName]: {
          ...prevState[productName],
          quantity: newQuantity,
        },
      };
    });
  };

  const proceedToPayment = () => {
    // Filter the selected products and pass them to the checkout page
    const selectedProducts = cart.filter(
      (product) => selectedItems[product.productName]?.selected
    );
    navigate("/checkout", { state: { cart: selectedProducts } });
  };

  if (cart.length === 0) {
    return <div>No items in cart. Please add items before proceeding.</div>;
  }

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <ul>
        {cart.map((product, index) => (
          <li key={index} className="product-item">
            <div className="product-info">
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems[product.productName]?.selected}
                  onChange={() => handleProductSelection(product.productName)}
                />
                <span>{product.productName}</span> - {product.quantity} x ${product.price}
              </label>
            </div>

            {selectedItems[product.productName]?.selected && (
              <div className="quantity-container">
                <input
                  type="number"
                  value={selectedItems[product.productName]?.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product.productName, parseInt(e.target.value) || 1)
                  }
                  min="1"
                  className="quantity-input"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
      {discount > 0 && <p><strong>Discount:</strong> -${discount.toFixed(2)}</p>}
      <p><strong>Tax (8%):</strong> +${tax.toFixed(2)}</p>
      <p><strong>Total:</strong> ${total.toFixed(2)}</p>

      <button onClick={proceedToPayment} className="checkout">
        Proceed to Pay
      </button>

      <style jsx>{`
        .order-summary {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .order-summary h3 {
          font-size: 2rem;
          color: #343a40;
        }
        .order-summary ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .product-item {
          font-size: 1.1rem;
          color: #555;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .product-info {
          flex: 1;
        }
        .quantity-container {
          display: flex;
          align-items: center;
        }
        .quantity-input {
          width: 60px;
          padding: 5px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          text-align: center;
        }
        .checkout {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: green;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          margin-top: 20px;
        }
        .checkout:hover {
          background-color: darkgreen;
        }
      `}</style>
    </div>
  );
}

export default OrderSummary;

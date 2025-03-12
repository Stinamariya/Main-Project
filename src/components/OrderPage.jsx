import React from "react";
import OrderSummary from "./OrderSummary"; // Assuming this is in the same folder

function OrderPage() {
  const orderSummary = {
    products: [
      { name: "Product 1", price: 20, quantity: 2 },
      { name: "Product 2", price: 30, quantity: 1 }
    ],
    discount: 10, // Example of a discount
    billing: {
      name: "John Doe",
      address: "123 Main St, Springfield",
      phone: "+1 123 456 7890"
    }
  };

  return (
    <div>
      <OrderSummary orderSummary={orderSummary} />
    </div>
  );
}

export default OrderPage;

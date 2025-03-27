// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Products() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { recommendedProducts, skinType, skinCondition } = location.state || {};

//   const predictedSkinType = skinType || localStorage.getItem("predictedSkinType") || "Normal";
//   let predictedSkinCondition = skinCondition || localStorage.getItem("predictedSkinCondition") || "Healthy";

//   if (!predictedSkinCondition || !predictedSkinCondition.trim()) {
//     console.warn("⚠️ Missing skinCondition! Defaulting to 'Healthy'.");
//     predictedSkinCondition = "Healthy";
//     localStorage.setItem("predictedSkinCondition", "Healthy");
//   }

//   const [products, setProducts] = useState([]);
//   const [sortBy, setSortBy] = useState("default");

//   useEffect(() => {
//     fetch(
//       `http://localhost:3031/api/recommended-products?skinType=${predictedSkinType}&skinCondition=${predictedSkinCondition}`
//     )
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("❌ Error fetching products:", error));
//   }, [predictedSkinType, predictedSkinCondition]);

//   const addToCart = (product) => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       alert("Please log in first!");
//       navigate("/login");
//       return;
//     }

//     let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
//     const existingProduct = cart.find((item) => item._id === product._id);
//     if (existingProduct) {
//       existingProduct.quantity += 1;
//       alert("Quantity updated in the cart!");
//     } else {
//       product.quantity = 1;
//       cart.push(product);
//       alert("Added to cart!");
//     }
//     localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
//   };

//   const sortedProducts = [...products].sort((a, b) => {
//     if (sortBy === "priceLow") return a.price - b.price;
//     if (sortBy === "priceHigh") return b.price - a.price;
//     return 0;
//   });

//   return (
//     <div style={styles.container}>
//       <h1>Recommended Products</h1>

//       <label>
//         Sort by:
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
//           <option value="default">Default</option>
//           <option value="priceLow">Price: Low to High</option>
//           <option value="priceHigh">Price: High to Low</option>
//         </select>
//       </label>

//       {sortedProducts.length > 0 ? (
//         <ul style={styles.productList}>
//           {sortedProducts.map((product) => (
//             <li key={product._id} style={styles.productItem}>
//               <h3>{product.productName}</h3>
//               <p><strong>Brand:</strong> {product.brand || "Unknown"}</p>
//               <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
//               <p><strong>Price:</strong> {product.price ? `Rs.${product.price.toFixed(2)}` : "N/A"}</p>
//               <p><strong>Ingredients:</strong> {product.ingredients || "Not Available"}</p>
//               <p><strong>Usage Instructions:</strong> {product.usageInstructions || "Not Available"}</p>
//               <p><strong>Benefits:</strong> {product.benefits || "Not Available"}</p>
//               <p><strong>Rating:</strong> {product.rating ? `${product.rating} ⭐` : "No reviews yet"}</p>

//               {product.productPic && (
//                 <img src={product.productPic} alt={product.productName} style={styles.productImage} />
//               )}

//               <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//                 <button
//                   onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
//                   style={styles.viewDetailsBtn}
//                 >
//                   View Details
//                 </button>
//                 <button onClick={() => addToCart(product)} style={styles.addToCartBtn}>
//                   Add to Cart
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No recommended products available for your skin type and concern.</p>
//       )}

//       <button onClick={() => navigate("/cart")} style={styles.goToCartBtn}>
//         Go to Cart
//       </button>
//     </div>
//   );
// }

// const styles = {
//   container: { padding: "20px", fontFamily: "Arial, sans-serif" },
//   productList: { listStyleType: "none", padding: 0 },
//   productItem: { marginBottom: "15px", border: "1px solid #ddd", padding: "15px", borderRadius: "5px", backgroundColor: "#f9f9f9" },
//   productImage: { width: "120px", height: "120px", objectFit: "cover", borderRadius: "5px", marginTop: "10px" },
//   select: { marginLeft: "10px", padding: "5px" },
//   viewDetailsBtn: { padding: "8px 12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
//   addToCartBtn: { padding: "8px 12px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
//   goToCartBtn: { marginTop: "20px", padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
// };

// export default Products;






// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Products() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { recommendedProducts, skinType, skinCondition } = location.state || {};
//   const predictedSkinType = skinType || localStorage.getItem("predictedSkinType") || "Normal";
//   let predictedSkinCondition = skinCondition || localStorage.getItem("predictedSkinCondition") || "Healthy";

//   if (!predictedSkinCondition.trim()) {
//     console.warn("⚠️ Missing skinCondition! Defaulting to 'Healthy'.");
//     predictedSkinCondition = "Healthy";
//     localStorage.setItem("predictedSkinCondition", "Healthy");
//   }

//   const [products, setProducts] = useState([]);
//   const [sortBy, setSortBy] = useState("default");
//   const [expandedDetails, setExpandedDetails] = useState({});

//   useEffect(() => {
//     fetch(
//       `http://localhost:3031/api/recommended-products?skinType=${predictedSkinType}&skinCondition=${predictedSkinCondition}`
//     )
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("❌ Error fetching products:", error));
//   }, [predictedSkinType, predictedSkinCondition]);

//   const toggleDetails = (productId) => {
//     setExpandedDetails((prev) => ({
//       ...prev,
//       [productId]: !prev[productId],
//     }));
//   };

//   const addToCart = (product) => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       alert("Please log in first!");
//       navigate("/login");
//       return;
//     }

//     let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
//     const existingProduct = cart.find((item) => item._id === product._id);
//     if (existingProduct) {
//       existingProduct.quantity += 1;
//       alert("Quantity updated in the cart!");
//     } else {
//       product.quantity = 1;
//       cart.push(product);
//       alert("Added to cart!");
//     }
//     localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
//   };

//   const sortedProducts = [...products].sort((a, b) => {
//     if (sortBy === "priceLow") return a.price - b.price;
//     if (sortBy === "priceHigh") return b.price - a.price;
//     return 0;
//   });

//   return (
//     <div style={styles.container}>
//       <h1>Recommended Products</h1>

//       <label>
//         Sort by:
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
//           <option value="default">Default</option>
//           <option value="priceLow">Price: Low to High</option>
//           <option value="priceHigh">Price: High to Low</option>
//         </select>
//       </label>

//       {sortedProducts.length > 0 ? (
//         <ul style={styles.productList}>
//           {sortedProducts.map((product) => (
//             <li key={product._id} style={styles.productItem}>
//               <h3>{product.productName}</h3>
//               <p><strong>Brand:</strong> {product.brand || "Unknown"}</p>
//               <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
//               <p><strong>Price:</strong> {product.price ? `Rs.${product.price.toFixed(2)}` : "N/A"}</p>
//               <p><strong>Rating:</strong> {product.rating ? `${product.rating} ⭐` : "No reviews yet"}</p>

//               {product.productPic ? (
//                 <img src={product.productPic} alt={product.productName} style={styles.productImage} />
//               ) : (
//                 <p>No Image Available</p>
//               )}

//               <div style={styles.buttonContainer}>
//                 <button onClick={() => toggleDetails(product._id)} style={styles.viewDetailsBtn}>
//                   {expandedDetails[product._id] ? "Hide Details" : "View Details"}
//                 </button>

//                 <button onClick={() => navigate(`/product/${product._id}`)} style={styles.viewReviewsBtn}>
//                   View Reviews
//                 </button>

//                 <button onClick={() => addToCart(product)} style={styles.addToCartBtn}>
//                   Add to Cart
//                 </button>
//               </div>

//               {expandedDetails[product._id] && (
//                 <div style={styles.detailsSection}>
//                   <p><strong>Ingredients:</strong> {product.ingredients || "Not Available"}</p>
//                   <p><strong>Usage Instructions:</strong> {product.usageInstructions || "Not Available"}</p>
//                   <p><strong>Benefits:</strong> {product.benefits || "Not Available"}</p>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No recommended products available for your skin type and concern.</p>
//       )}

//       <button onClick={() => navigate("/cart")} style={styles.goToCartBtn}>
//         Go to Cart
//       </button>
//     </div>
//   );
// }

// // 🔥 Styles
// const styles = {
//   container: { padding: "20px", fontFamily: "Arial, sans-serif" },
//   productList: { listStyleType: "none", padding: 0 },
//   productItem: { 
//     marginBottom: "15px", 
//     border: "1px solid #ddd", 
//     padding: "15px", 
//     borderRadius: "5px", 
//     backgroundColor: "#f9f9f9",
//     position: "relative"
//   },
//   productImage: { 
//     width: "120px", 
//     height: "120px", 
//     objectFit: "cover", 
//     borderRadius: "5px", 
//     marginTop: "10px" 
//   },
//   select: { marginLeft: "10px", padding: "5px" },
//   buttonContainer: {
//     display: "flex",
//     gap: "10px",
//     marginTop: "10px",
//   },
//   viewDetailsBtn: { 
//     padding: "8px 12px", 
//     backgroundColor: "#007bff", 
//     color: "white", 
//     border: "none", 
//     borderRadius: "5px", 
//     cursor: "pointer" 
//   },
//   viewReviewsBtn: { 
//     padding: "8px 12px", 
//     backgroundColor: "#ff9900", 
//     color: "white", 
//     border: "none", 
//     borderRadius: "5px", 
//     cursor: "pointer" 
//   },
//   addToCartBtn: { 
//     padding: "8px 12px", 
//     backgroundColor: "green", 
//     color: "white", 
//     border: "none", 
//     borderRadius: "5px", 
//     cursor: "pointer" 
//   },
//   goToCartBtn: { 
//     marginTop: "20px", 
//     padding: "10px 20px", 
//     backgroundColor: "blue", 
//     color: "white", 
//     border: "none", 
//     borderRadius: "5px", 
//     cursor: "pointer" 
//   },
//   detailsSection: {
//     marginTop: "10px",
//     padding: "10px",
//     backgroundColor: "#eef3f7",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   }
// };

// export default Products;











import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Products() {
  const location = useLocation();
  const navigate = useNavigate();

  const { recommendedProducts, skinType, skinCondition } = location.state || {};
  const predictedSkinType = skinType || localStorage.getItem("predictedSkinType") || "Normal";
  let predictedSkinCondition = skinCondition || localStorage.getItem("predictedSkinCondition") || "Healthy";

  if (!predictedSkinCondition.trim()) {
    console.warn("⚠️ Missing skinCondition! Defaulting to 'Healthy'.");
    predictedSkinCondition = "Healthy";
    localStorage.setItem("predictedSkinCondition", "Healthy");
  }

  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [expandedDetails, setExpandedDetails] = useState({});

  useEffect(() => {
    fetch(
      `http://localhost:3031/api/recommended-products?skinType=${predictedSkinType}&skinCondition=${predictedSkinCondition}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("❌ Error fetching products:", error));
  }, [predictedSkinType, predictedSkinCondition]);

  const toggleDetails = (productId) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const addToCart = (product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      alert("Quantity updated in the cart!");
    } else {
      product.quantity = 1;
      cart.push(product);
      alert("Added to cart!");
    }
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    return 0;
  });

  return (
    <div style={styles.container}>
      <h1>Recommended Products</h1>

      <label>
        Sort by:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
          <option value="default">Default</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </label>

      {sortedProducts.length > 0 ? (
        <ul style={styles.productList}>
          {sortedProducts.map((product) => (
            <li key={product._id} style={styles.productItem}>
              <h3>{product.productName}</h3>
              <p><strong>Brand:</strong> {product.brand || "Unknown"}</p>
              <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
              <p><strong>Price:</strong> {product.price ? `Rs.${product.price.toFixed(2)}` : "N/A"}</p>
              <p><strong>Rating:</strong> {product.rating ? `${product.rating} ⭐` : "No reviews yet"}</p>

              {product.productPic ? (
                <img src={product.productPic} alt={product.productName} style={styles.productImage} />
              ) : (
                <p>No Image Available</p>
              )}

              <div style={styles.buttonContainer}>
                <button onClick={() => toggleDetails(product._id)} style={styles.viewDetailsBtn}>
                  {expandedDetails[product._id] ? "Hide Details" : "View Details"}
                </button>

                <button onClick={() => navigate(`/Review/${product._id}`)} style={styles.viewReviewsBtn}>
                  View Reviews
                </button>

                <button onClick={() => addToCart(product)} style={styles.addToCartBtn}>
                  Add to Cart
                </button>
              </div>

              {expandedDetails[product._id] && (
                <div style={styles.detailsSection}>
                  <p><strong>Ingredients:</strong> {product.ingredients || "Not Available"}</p>
                  <p><strong>Usage Instructions:</strong> {product.usageInstructions || "Not Available"}</p>
                  <p><strong>Benefits:</strong> {product.benefits || "Not Available"}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommended products available for your skin type and concern.</p>
      )}

      <button onClick={() => navigate("/cart")} style={styles.goToCartBtn}>
        Go to Cart
      </button>
    </div>
  );
}

// 🔥 Styles
const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  productList: { listStyleType: "none", padding: 0 },
  productItem: { 
    marginBottom: "15px", 
    border: "1px solid #ddd", 
    padding: "15px", 
    borderRadius: "5px", 
    backgroundColor: "#f9f9f9",
    position: "relative"
  },
  productImage: { 
    width: "120px", 
    height: "120px", 
    objectFit: "cover", 
    borderRadius: "5px", 
    marginTop: "10px" 
  },
  select: { marginLeft: "10px", padding: "5px" },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  viewDetailsBtn: { 
    padding: "8px 12px", 
    backgroundColor: "#007bff", 
    color: "white", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
  },
  viewReviewsBtn: { 
    padding: "8px 12px", 
    backgroundColor: "#ff9900", 
    color: "white", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
  },
  addToCartBtn: { 
    padding: "8px 12px", 
    backgroundColor: "green", 
    color: "white", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
  },
  goToCartBtn: { 
    marginTop: "20px", 
    padding: "10px 20px", 
    backgroundColor: "blue", 
    color: "white", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer" 
  },
  detailsSection: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#eef3f7",
    borderRadius: "5px",
    border: "1px solid #ccc",
  }
};

export default Products;



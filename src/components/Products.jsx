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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [expandedDetails, setExpandedDetails] = useState({});

  useEffect(() => {
    fetch(
      `http://localhost:3031/api/recommended-products?skinType=${predictedSkinType}&skinCondition=${predictedSkinCondition}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initially display all products
      })
      .catch((error) => console.error("❌ Error fetching products:", error));
  }, [predictedSkinType, predictedSkinCondition]);

  // Handle the search query and filter the products
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter((product) => {
      return (
        product.productName.toLowerCase().includes(query) ||
        (product.concern && product.concern.toLowerCase().includes(query)) ||
        (product.brand && product.brand.toLowerCase().includes(query))
      );
    });

    setFilteredProducts(filtered);
  };

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

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    return 0;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Recommended Products</h1>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }}>
          Search Products:
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name, concern, or brand"
            style={styles.searchInput}
          />
        </label>
      </div>

      {sortedProducts.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {sortedProducts.map((product) => (
            <li key={product._id} style={styles.productItem}>
              <h3 style={{ marginBottom: "5px", color: "#222" }}>{product.productName}</h3>
              <p><strong>Brand:</strong> {product.brand || "Unknown"}</p>
              <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
              <p><strong>Price:</strong> {product.price ? `Rs.${product.price.toFixed(2)}` : "N/A"}</p>

              {product.productPic ? (
                <img src={product.productPic} alt={product.productName} style={styles.productImage} />
              ) : (
                <p>No Image Available</p>
              )}

              <div style={styles.buttonContainer}>
                <button onClick={() => toggleDetails(product._id)} style={styles.viewDetailsBtn}>
                  {expandedDetails[product._id] ? "Hide Details" : "View Details"}
                </button>

                <button onClick={() => addToCart(product)} style={styles.addToCartBtn}>
                  Add to Cart
                </button>
              </div>

              {expandedDetails[product._id] && (
                <div style={styles.detailsSection}>
                  <p><strong>Ingredients:</strong></p>
                  <ul>
                    {product.ingredients
                      ? product.ingredients.split(",").map((item, index) => <li key={index}>{item.trim()}</li>)
                      : <li>Not Available</li>}
                  </ul>

                  <p><strong>Usage Instructions:</strong></p>
                  <ul>
                    {product.usageInstructions
                      ? product.usageInstructions.split(".").map((item, index) => item.trim() && <li key={index}>{item}</li>)
                      : <li>Not Available</li>}
                  </ul>

                  <p><strong>Benefits:</strong></p>
                  <ul>
                    {product.benefits
                      ? product.benefits.split(",").map((item, index) => <li key={index}>{item.trim()}</li>)
                      : <li>Not Available</li>}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>No products found matching your search criteria.</p>
      )}

      <button onClick={() => navigate("/cart")} style={styles.goToCartBtn}>
        Go to Cart
      </button>
    </div>
  );
}

// 🔥 Styles
const styles = {
  searchInput: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  productItem: {
    marginBottom: "20px",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
  productImage: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "5px",
    marginTop: "10px",
    display: "block",
  },
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
    cursor: "pointer",
    transition: "0.3s",
  },
  addToCartBtn: {
    padding: "8px 12px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  goToCartBtn: {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    textAlign: "center",
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

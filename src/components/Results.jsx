// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Results() {
//   const location = useLocation();
//   const navigate = useNavigate();
  
  
//   const prediction = location.state?.prediction || JSON.parse(localStorage.getItem("prediction"));

//   if (!prediction) {
//     return <p>No results found. Please complete the questionnaire.</p>;
//   }

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
//       <h2>Prediction Result</h2>
//       <p><strong>Skin Type:</strong> {prediction.skinType}</p>
//       <p><strong>Skin Condition:</strong> {prediction.skinCondition}</p>

//       {prediction.recommendedProducts && prediction.recommendedProducts.length > 0 && (
//         <div>
//           <h3>Recommended Products:</h3>
//           <ul style={{ listStyleType: "none", padding: 0 }}>
//             {prediction.recommendedProducts.map((product) => (
//               <li key={product._id} style={{ marginBottom: "15px", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
//                 <h4>{product.productName || "Unnamed Product"}</h4>
//                 <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
//                 {product.productPic && (
//                   <img src={product.productPic} alt={product.productName} width="100" style={{ borderRadius: "5px" }} />
//                 )}
//                 <br />
//                 {product.productUrl && (
//                   <a href={product.productUrl} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
//                     View Product
//                   </a>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
        
//         <button onClick={() => navigate("/")}>Retake Questionnaire</button>
//       <button onClick={() => navigate("/products", { state: { skinType: prediction.skinType, skinCondition: prediction.skinCondition } })}>
//         View Recommended Products
//       </button>
//       <button onClick={() => navigate("/cart")}>Go to Cart</button>
//     </div>
//   );
// }

// export default Results;













import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction } = location.state || {};

  // Store recommended products in localStorage
  localStorage.setItem("recommendedProducts", JSON.stringify(prediction.recommendedProducts));

  // Navigate to Products page with state
  navigate("/products", { state: { recommendedProducts: prediction.recommendedProducts } });

  if (!prediction) {
    return <p>No prediction data available.</p>;
  }

  console.log("Prediction Data:", prediction);

  return (
    <div className="results-container">
      <h1>Prediction Result</h1>
      <p><strong>Skin Type:</strong> {prediction.skinType}</p>
      <p><strong>Skin Condition:</strong> {prediction.skinCondition}</p>

      <button className="btn" onClick={() => navigate("/Questionnaire")}>Retake Questionnaire</button>
      <button className="btn" onClick={() => navigate("/products", { state: { skinType: prediction.skinType, skinCondition: prediction.skinCondition } })}>
        View Recommended Products
      </button>
      <button className="btn" onClick={() => navigate("/cart")}>Go to Cart</button>
      
      <style jsx>{`
        .results-container {
          text-align: center;
          padding: 20px;
        }
        
        .results-container h1 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .results-container p {
          font-size: 1.2rem;
          margin-bottom: 15px;
        }

        .btn {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          margin: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        .btn:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}

export default Results;


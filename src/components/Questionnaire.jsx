import React, { useState } from "react";
import axios from "axios";

function Questionnaire() {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Water_Intake_Glasses: "",
    Diet_Quality: "",
    Sleep_Hours: "",
    Exercise_Frequency: "",
    Stress_Level: "",
    Sun_Exposure: "",
    Hydration_Level: "",
    Acne_History: "",
    Redness: "",
    Sensitivity_to_Products: "",
    Wrinkles_Fine_Lines: "",
    Dark_Spots: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);
  
    try {
      const response = await axios.post("http://localhost:3031/predict-skin", formData);
      console.log("Prediction Response:", response.data); // Debugging
  
      setPrediction(response.data);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError("Error fetching prediction. Please try again.");
    }
    setLoading(false);
  };
  

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1>Personal Skincare Assistant</h1>
      <h2>Questionnaire</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        {/* Form fields */}
        <div>
          <label>Age:</label>
          <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Water Intake (Glasses):</label>
          <input type="number" name="Water_Intake_Glasses" value={formData.Water_Intake_Glasses} onChange={handleChange} required />
        </div>
        <div>
          <label>Diet Quality:</label>
          <select name="Diet_Quality" value={formData.Diet_Quality} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Healthy">Healthy</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        <div>
          <label>Sleep Hours:</label>
          <input type="number" name="Sleep_Hours" value={formData.Sleep_Hours} onChange={handleChange} required />
        </div>
        <div>
          <label>Exercise Frequency:</label>
          <select name="Exercise_Frequency" value={formData.Exercise_Frequency} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Regularly">Regularly</option>
          </select>
        </div>
        <div>
          <label>Stress Level:</label>
          <select name="Stress_Level" value={formData.Stress_Level} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Sun Exposure:</label>
          <select name="Sun_Exposure" value={formData.Sun_Exposure} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Hydration Level:</label>
          <select name="Hydration_Level" value={formData.Hydration_Level} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Acne History:</label>
          <select name="Acne_History" value={formData.Acne_History} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Redness:</label>
          <select name="Redness" value={formData.Redness} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Sensitivity to Products:</label>
          <select name="Sensitivity_to_Products" value={formData.Sensitivity_to_Products} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Wrinkles/Fine Lines:</label>
          <select name="Wrinkles_Fine_Lines" value={formData.Wrinkles_Fine_Lines} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Dark Spots:</label>
          <select name="Dark_Spots" value={formData.Dark_Spots} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button type="submit">Submit Questionnaire</button>
      </form>

      {loading && <p>Loading prediction...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {prediction && (
        <div>
          <h2>Prediction Result</h2>
          <p><strong>Skin Type:</strong> {prediction.skinType}</p>
          <p><strong>Skin Condition:</strong> {prediction.skinCondition}</p>

          {prediction.recommendedProducts && prediction.recommendedProducts.length > 0 && (
            <div>
              <h3>Recommended Products:</h3>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {prediction.recommendedProducts.map((product) => (
                  <li key={product._id} style={{ marginBottom: "15px", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
                    <h4>{product.productName || "Unnamed Product"}</h4>
                    <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
                    {product.productPic && (
                      <img src={product.productPic} alt={product.productName} width="100" style={{ borderRadius: "5px" }} />
                    )}
                    <br />
                    {product.productUrl && (
                      <a href={product.productUrl} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                        View Product
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Questionnaire;
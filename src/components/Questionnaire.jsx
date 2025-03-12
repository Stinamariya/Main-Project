// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Questionnaire() {
  
//   const navigate = useNavigate(); // Initialize navigate function

  
//   const [formData, setFormData] = useState({
//     Age: "",
//     Gender: "",
//     Water_Intake_Glasses: "",
//     Diet_Quality: "",
//     Sleep_Hours: "",
//     Exercise_Frequency: "",
//     Stress_Level: "",
//     Sun_Exposure: "",
//     Hydration_Level: "",
//     Acne_History: "",
//     Redness: "",
//     Sensitivity_to_Products: "",
//     Wrinkles_Fine_Lines: "",
//     Dark_Spots: "",
//   });

//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");
  //   setPrediction(null);
  
  //   try {
  //     const response = await axios.post("http://localhost:3031/predict-skin", formData);
  //     console.log("Prediction Response:", response.data); // Debugging
      
  
  //     setPrediction(response.data);
  //   } catch (err) {
  //     console.error("Error fetching prediction:", err);
  //     setError("Error fetching prediction. Please try again.");
  //   }
  //   setLoading(false);
  // };
  

  // return (
  //   <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
  //     <h1>Personal Skincare Assistant</h1>
  //     <h2>Questionnaire</h2>
  //     <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
  //       {/* Form fields */}
  //       <div>
  //         <label>Age:</label>
  //         <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />
  //       </div>
  //       <div>
  //         <label>Gender:</label>
  //         <select name="Gender" value={formData.Gender} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Female">Female</option>
  //           <option value="Male">Male</option>
  //           <option value="Other">Other</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label>Water Intake (Glasses):</label>
  //         <input type="number" name="Water_Intake_Glasses" value={formData.Water_Intake_Glasses} onChange={handleChange} required />
  //       </div>
  //       <div>
  //         <label>Diet Quality:</label>
  //         <select name="Diet_Quality" value={formData.Diet_Quality} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Healthy">Healthy</option>
  //           <option value="Average">Average</option>
  //           <option value="Poor">Poor</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label>Sleep Hours:</label>
  //         <input type="number" name="Sleep_Hours" value={formData.Sleep_Hours} onChange={handleChange} required />
  //       </div>
  //       <div>
  //         <label>Exercise Frequency:</label>
  //         <select name="Exercise_Frequency" value={formData.Exercise_Frequency} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Never">Never</option>
  //           <option value="Occasionally">Occasionally</option>
  //           <option value="Regularly">Regularly</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label>Stress Level:</label>
  //         <select name="Stress_Level" value={formData.Stress_Level} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Low">Low</option>
  //           <option value="Medium">Medium</option>
  //           <option value="High">High</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label>Sun Exposure:</label>
  //         <select name="Sun_Exposure" value={formData.Sun_Exposure} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Low">Low</option>
  //           <option value="Medium">Medium</option>
  //           <option value="High">High</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label>Hydration Level:</label>
  //         <select name="Hydration_Level" value={formData.Hydration_Level} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Low">Low</option>
  //           <option value="Medium">Medium</option>
  //           <option value="High">High</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label>Acne History:</label>
  //         <select name="Acne_History" value={formData.Acne_History} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Yes">Yes</option>
  //           <option value="No">No</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label>Redness:</label>
  //         <select name="Redness" value={formData.Redness} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Yes">Yes</option>
  //           <option value="No">No</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label>Sensitivity to Products:</label>
  //         <select name="Sensitivity_to_Products" value={formData.Sensitivity_to_Products} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Yes">Yes</option>
  //           <option value="No">No</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label>Wrinkles/Fine Lines:</label>
  //         <select name="Wrinkles_Fine_Lines" value={formData.Wrinkles_Fine_Lines} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Yes">Yes</option>
  //           <option value="No">No</option>
  //         </select>
  //       </div>
  //       <div>
  //         <label>Dark Spots:</label>
  //         <select name="Dark_Spots" value={formData.Dark_Spots} onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="Yes">Yes</option>
  //           <option value="No">No</option>
  //         </select>
  //       </div>

  //       <button type="submit">Submit Questionnaire</button>
  //     </form>

  //     {loading && <p>Loading prediction...</p>}
  //     {error && <p style={{ color: "red" }}>{error}</p>}

  //     {prediction && (
  //       <div>
  //         <h2>Prediction Result</h2>
  //         <p><strong>Skin Type:</strong> {prediction.skinType}</p>
  //         <p><strong>Skin Condition:</strong> {prediction.skinCondition}</p>

//           {prediction.recommendedProducts && prediction.recommendedProducts.length > 0 && (
//             <div>
//               <h3>Recommended Products:</h3>
//               <ul style={{ listStyleType: "none", padding: 0 }}>
//                 {prediction.recommendedProducts.map((product) => (
//                   <li key={product._id} style={{ marginBottom: "15px", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
//                     <h4>{product.productName || "Unnamed Product"}</h4>
//                     <p><strong>Concern:</strong> {product.concern || "N/A"}</p>
//                     {product.productPic && (
//                       <img src={product.productPic} alt={product.productName} width="100" style={{ borderRadius: "5px" }} />
//                     )}
//                     <br />
//                     {product.productUrl && (
//                       <a href={product.productUrl} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
//                         View Product
//                       </a>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Questionnaire;













import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Questionnaire() {
  const navigate = useNavigate(); // Initialize navigate function

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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit form data and fetch prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await axios.post(
        "http://localhost:3031/predict-skin",
        formData
      );
      console.log("Prediction Response:", response.data);
      setPrediction(response.data);

      // Navigate to the result page with prediction data
      navigate("/results", { state: { prediction: response.data } });
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError("Error fetching prediction. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      
      <h2>Questionnaire</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Age Input */}
        <div style={styles.inputGroup}>
          <label>Age:</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Gender Selection */}
        <div style={styles.inputGroup}>
          <label>Gender:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Gender"
                value="Female"
                checked={formData.Gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="Gender"
                value="Male"
                checked={formData.Gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="Gender"
                value="Other"
                checked={formData.Gender === "Other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        {/* Water Intake */}
        <div style={styles.inputGroup}>
          <label>Water Intake (Glasses):</label>
          <input
            type="number"
            name="Water_Intake_Glasses"
            value={formData.Water_Intake_Glasses}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Diet Quality */}
        <div style={styles.inputGroup}>
          <label>Diet Quality:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Diet_Quality"
                value="Healthy"
                checked={formData.Diet_Quality === "Healthy"}
                onChange={handleChange}
              />
              Healthy
            </label>
            <label>
              <input
                type="radio"
                name="Diet_Quality"
                value="Average"
                checked={formData.Diet_Quality === "Average"}
                onChange={handleChange}
              />
              Average
            </label>
            <label>
              <input
                type="radio"
                name="Diet_Quality"
                value="Poor"
                checked={formData.Diet_Quality === "Poor"}
                onChange={handleChange}
              />
              Poor
            </label>
          </div>
        </div>

        {/* Sleep Hours */}
        <div style={styles.inputGroup}>
          <label>Sleep Hours:</label>
          <input
            type="number"
            name="Sleep_Hours"
            value={formData.Sleep_Hours}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Exercise Frequency */}
        <div style={styles.inputGroup}>
          <label>Exercise Frequency:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Exercise_Frequency"
                value="Never"
                checked={formData.Exercise_Frequency === "Never"}
                onChange={handleChange}
              />
              Never
            </label>
            <label>
              <input
                type="radio"
                name="Exercise_Frequency"
                value="Occasionally"
                checked={formData.Exercise_Frequency === "Occasionally"}
                onChange={handleChange}
              />
              Occasionally
            </label>
            <label>
              <input
                type="radio"
                name="Exercise_Frequency"
                value="Regularly"
                checked={formData.Exercise_Frequency === "Regularly"}
                onChange={handleChange}
              />
              Regularly
            </label>
          </div>
        </div>

        {/* Stress Level */}
        <div style={styles.inputGroup}>
          <label>Stress Level:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Stress_Level"
                value="Low"
                checked={formData.Stress_Level === "Low"}
                onChange={handleChange}
              />
              Low
            </label>
            <label>
              <input
                type="radio"
                name="Stress_Level"
                value="Medium"
                checked={formData.Stress_Level === "Medium"}
                onChange={handleChange}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="Stress_Level"
                value="High"
                checked={formData.Stress_Level === "High"}
                onChange={handleChange}
              />
              High
            </label>
          </div>
        </div>

        {/* Sun Exposure */}
        <div style={styles.inputGroup}>
          <label>Sun Exposure:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Sun_Exposure"
                value="Low"
                checked={formData.Sun_Exposure === "Low"}
                onChange={handleChange}
              />
              Low
            </label>
            <label>
              <input
                type="radio"
                name="Sun_Exposure"
                value="Medium"
                checked={formData.Sun_Exposure === "Medium"}
                onChange={handleChange}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="Sun_Exposure"
                value="High"
                checked={formData.Sun_Exposure === "High"}
                onChange={handleChange}
              />
              High
            </label>
          </div>
        </div>

        {/* Hydration Level */}
        <div style={styles.inputGroup}>
          <label>Hydration Level:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Hydration_Level"
                value="Low"
                checked={formData.Hydration_Level === "Low"}
                onChange={handleChange}
              />
              Low
            </label>
            <label>
              <input
                type="radio"
                name="Hydration_Level"
                value="Medium"
                checked={formData.Hydration_Level === "Medium"}
                onChange={handleChange}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="Hydration_Level"
                value="High"
                checked={formData.Hydration_Level === "High"}
                onChange={handleChange}
              />
              High
            </label>
          </div>
        </div>

        {/* Acne History */}
        <div style={styles.inputGroup}>
          <label>Acne History:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Acne_History"
                value="Yes"
                checked={formData.Acne_History === "Yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="Acne_History"
                value="No"
                checked={formData.Acne_History === "No"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Redness */}
        <div style={styles.inputGroup}>
          <label>Redness:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Redness"
                value="Yes"
                checked={formData.Redness === "Yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="Redness"
                value="No"
                checked={formData.Redness === "No"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Sensitivity to Products */}
        <div style={styles.inputGroup}>
          <label>Sensitivity to Products:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Sensitivity_to_Products"
                value="Yes"
                checked={formData.Sensitivity_to_Products === "Yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="Sensitivity_to_Products"
                value="No"
                checked={formData.Sensitivity_to_Products === "No"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Wrinkles/Fine Lines */}
        <div style={styles.inputGroup}>
          <label>Wrinkles/Fine Lines:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Wrinkles_Fine_Lines"
                value="Yes"
                checked={formData.Wrinkles_Fine_Lines === "Yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="Wrinkles_Fine_Lines"
                value="No"
                checked={formData.Wrinkles_Fine_Lines === "No"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Dark Spots */}
        <div style={styles.inputGroup}>
          <label>Dark Spots:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Dark_Spots"
                value="Yes"
                checked={formData.Dark_Spots === "Yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="Dark_Spots"
                value="No"
                checked={formData.Dark_Spots === "No"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.submitButton}>
          {loading ? "Loading..." : "Submit"}
        </button>

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

// CSS-in-JS styles
const styles = {
  container: {
    backgroundColor: "#f4f4f9",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "16px",
    color: "#333",
  },
  input: {
    padding: "12px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "0.3s",
  },
  radioGroup: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: "14px",
    color: "#333",
  },
  radioInput: {
    marginRight: "5px",
  },
  submitButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  submitButtonHovered: {
    backgroundColor: "#45a049",
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
};



export default Questionnaire;

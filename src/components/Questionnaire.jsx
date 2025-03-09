import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...formData };

    // Debugging: Check if all fields are correctly collected
    console.log("Data being sent:", data);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Prediction Result:", result);

      if (result.skin_type && result.skin_condition) {
        // Pass the correct keys to the results page
        navigate("/results", {
          state: { predictedSkinType: result.skin_type, predictedSkinCondition: result.skin_condition }
        });
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <div>
      <h2>Skin Analysis Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />
        </div>

        {/* Gender */}
        <div>
          <label>Gender:</label>
          {["Male", "Female", "Other"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="Gender"
                value={option}
                checked={formData.Gender === option}
                onChange={handleChange}
                required
              />
              {option}
            </label>
          ))}
        </div>

        {/* Other Inputs */}
        {[
          { label: "Water Intake (Glasses)", name: "Water_Intake_Glasses", options: ["Less than 4", "4-6", "7-9", "10 or more"] },
          { label: "Diet Quality", name: "Diet_Quality", options: ["Poor", "Average", "Healthy"] },
          { label: "Sleep Hours", name: "Sleep_Hours", options: ["Less than 5", "5-6", "7-8", "More than 8"] },
          { label: "Exercise Frequency", name: "Exercise_Frequency", options: ["Never", "Occasionally", "Regularly"] },
          { label: "Stress Level", name: "Stress_Level", options: ["Low", "Medium", "High"] },
          { label: "Sun Exposure", name: "Sun_Exposure", options: ["None", "Low", "Medium", "High"] },
          { label: "Hydration Level", name: "Hydration_Level", options: ["Low", "Medium", "High"] },
          { label: "Acne History", name: "Acne_History", options: ["Yes", "No"] },
          { label: "Redness", name: "Redness", options: ["Yes", "No"] },
          { label: "Sensitivity to Products", name: "Sensitivity_to_Products", options: ["Yes", "No"] },
          { label: "Wrinkles/Fine Lines", name: "Wrinkles_Fine_Lines", options: ["Yes", "No"] },
          { label: "Dark Spots", name: "Dark_Spots", options: ["Yes", "No"] },
        ].map(({ label, name, options }) => (
          <div key={name}>
            <label>{label}:</label>
            {options.map((option) => (
              <label key={option}>
                <input type="radio" name={name} value={option} checked={formData[name] === option} onChange={handleChange} required />
                {option}
              </label>
            ))}
          </div>
        ))}

        <button type="submit">Get Prediction</button>
      </form>
    </div>
  );
};

export default Questionnaire;

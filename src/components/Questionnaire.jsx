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

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Prediction Data:", data);
        console.log("Form Submission Data:", data);  // Log to check data before navigation
        // Navigate to Results page with prediction data
        navigate("/results", {
          state: {
            predictedSkinType: data.predicted_skin_type,  // Use the correct variable names
            predictedSkinCondition: data.predicted_skin_condition,  // Use the correct variable names
          },
        });
        
      } else {
        console.error("Prediction error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Skin Analysis Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        {/* Age as Ranges */}
        <label>Age:</label>
        {["Under 18", "18-25", "26-35", "36-45", "46+"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Age"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Gender */}
        <label>Gender:</label>
        {["Male", "Female", "Other"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Gender"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Water Intake as Ranges */}
        <label>Water Intake (Glasses per day):</label>
        {["Less than 4", "4-6", "7-9", "10+"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Water_Intake_Glasses"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Diet Quality */}
        <label>Diet Quality:</label>
        {["Poor", "Average", "Healthy"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Diet_Quality"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Sleep Hours as Ranges */}
        <label>Sleep Hours per Day:</label>
        {["Less than 4", "4-6", "7-9", "10+"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Sleep_Hours"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Exercise Frequency */}
        <label>Exercise Frequency:</label>
        {["None", "Occasional", "Regular"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Exercise_Frequency"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Stress Level */}
        <label>Stress Level:</label>
        {["Low", "Moderate", "High"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Stress_Level"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Sun Exposure */}
        <label>Sun Exposure:</label>
        {["Low", "Moderate", "High"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Sun_Exposure"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Hydration Level */}
        <label>Hydration Level:</label>
        {["Poor", "Average", "Good"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Hydration_Level"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Acne History */}
        <label>Acne History:</label>
        {["Yes", "No"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Acne_History"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Redness */}
        <label>Redness:</label>
        {["Yes", "No"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Redness"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Sensitivity to Products */}
        <label>Sensitivity to Products:</label>
        {["Yes", "No"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Sensitivity_to_Products"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Wrinkles/Fine Lines */}
        <label>Wrinkles/Fine Lines:</label>
        {["Yes", "No"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Wrinkles_Fine_Lines"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        {/* Dark Spots */}
        <label>Dark Spots:</label>
        {["Yes", "No"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="Dark_Spots"
              value={option}
              onChange={handleChange}
              required
            />{" "}
            {option}
          </label>
        ))}

        <button type="submit">Get Prediction</button>
      </form>
    </div>
  );
};

export default Questionnaire;

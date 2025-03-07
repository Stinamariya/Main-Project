import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    waterIntakeGlasses: "",
    dietQuality: "",
    sleepHours: "",
    exerciseFrequency: "",
    stressLevel: "",
    sunExposure: "",
    hydrationLevel: "",
    acneHistory: "",
    redness: "",
    sensitivityToProducts: "",
    wrinklesFineLines: "",
    darkSpots: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in. Please log in first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3031/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      navigate("/results", { state: { prediction: data } });

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to connect to the server. Make sure the backend is running.");
    }
  };

  return (
    <div className="container">
      <h2>Skincare Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label>Gender:</label>
        <div>
          {["Male", "Female", "Other"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="gender"
                value={option}
                checked={formData.gender === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Water Intake (glasses per day):</label>
        <div>
          {["1-2", "3-4", "5-6", "7-8", "9+"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="waterIntakeGlasses"
                value={option}
                checked={formData.waterIntakeGlasses === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Diet Quality:</label>
        <div>
          {["Poor", "Average", "Healthy"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="dietQuality"
                value={option}
                checked={formData.dietQuality === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Sleep Hours:</label>
        <div>
          {["3-4", "5-6", "7-8", "9+"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="sleepHours"
                value={option}
                checked={formData.sleepHours === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Exercise Frequency:</label>
        <div>
          {["Never", "Occasionally", "Regularly"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="exerciseFrequency"
                value={option}
                checked={formData.exerciseFrequency === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Stress Level:</label>
        <div>
          {["Low", "Medium", "High"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="stressLevel"
                value={option}
                checked={formData.stressLevel === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Sun Exposure:</label>
        <div>
          {["Low", "Medium", "High"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="sunExposure"
                value={option}
                checked={formData.sunExposure === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Hydration Level:</label>
        <div>
          {["Low", "Medium", "High"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="hydrationLevel"
                value={option}
                checked={formData.hydrationLevel === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Acne History:</label>
        <div>
          {["Yes", "No"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="acneHistory"
                value={option}
                checked={formData.acneHistory === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Redness:</label>
        <div>
          {["Yes", "No"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="redness"
                value={option}
                checked={formData.redness === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Sensitivity to Products:</label>
        <div>
          {["Yes", "No"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="sensitivityToProducts"
                value={option}
                checked={formData.sensitivityToProducts === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Wrinkles & Fine Lines:</label>
        <div>
          {["Yes", "No"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="wrinklesFineLines"
                value={option}
                checked={formData.wrinklesFineLines === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <label>Dark Spots:</label>
        <div>
          {["Yes", "No"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="darkSpots"
                value={option}
                checked={formData.darkSpots === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Questionnaire;

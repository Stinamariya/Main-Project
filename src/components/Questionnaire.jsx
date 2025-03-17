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
    e.preventDefault(); // Prevent form refresh
    const userId = localStorage.getItem("userId"); // Get userId from localStorage
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const data = {
      ...formData,
      userId, // Add the userId to the request payload
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3031/predict-skin", data);
      setPrediction(response.data);
      setLoading(false);

      // Navigate to results page and pass the prediction as state
      navigate("/results", { state: { prediction: response.data } });
    } catch (err) {
      setError("An error occurred while fetching prediction.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Questionnaire</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Age Input */}
        <div style={styles.inputGroup}>
          <label>Age</label>
          <small>(Enter your age):</small>
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
          <label>Gender</label>
          <small>(Select your gender):</small>
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
          <label>Water Intake (Glasses)</label>
          <small>(How many glasses of water do you drink daily?):</small>
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
          <label>Diet Quality</label>
          <small>(Select your overall diet quality):</small>
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
          <label>Sleep Hours</label>
          <small>(How many hours do you sleep each night?):</small>
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
          <label>Exercise Frequency</label>
          <small>(How often do you exercise?):</small>
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
          <label>Stress Level</label>
          <small>(How would you rate your stress levels?):</small>
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
          <label>Sun Exposure</label>
          <small>(How much time do you spend in the sun?):</small>
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
          <label>Hydration Level</label>
          <small>(How well-hydrated do you feel?):</small>
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
          <label>Acne History</label>
          <small>(Do you have a history of acne?):</small>
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
          <label>Redness</label>
          <small>(Do you experience redness in your skin?):</small>
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
          <label>Sensitivity to Products</label>
          <small>(Are you sensitive to skincare products?):</small>
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

        {/* Wrinkles / Fine Lines */}
        <div style={styles.inputGroup}>
          <label>Wrinkles/Fine Lines</label>
          <small>(Do you have wrinkles or fine lines?):</small>
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
          <label>Dark Spots</label>
          <small>(Do you have dark spots on your skin?):</small>
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
          Submit
        </button>
      </form>

      {/* Loading and Error Handling */}
      {loading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    marginTop: "5px",
    width: "100%",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
  },
};

export default Questionnaire;

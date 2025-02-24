import React, { useState } from "react";

const SkinAnalysis = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (question, value) => {
    setFormData({ ...formData, [question]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const questions = [
    { label: "Age", options: ["Under 18", "18-25", "26-35", "36-45", "46+"] },
    { label: "Gender", options: ["Male", "Female", "Other"] },
    { label: "Skin Feels After Washing", options: ["Tight", "Normal", "Oily"] },
    { label: "Oiliness in T-Zone", options: ["None", "Slight", "Moderate", "Severe"] },
    { label: "Dry Patches", options: ["None", "Occasionally", "Frequently"] },
    { label: "Greasy by Midday", options: ["Never", "Sometimes", "Always"] },
    { label: "Breakouts Frequency", options: ["Never", "Rarely", "Often", "Always"] },
    { label: "Redness Sensitivity", options: ["None", "Mild", "Moderate", "Severe"] },
    { label: "Hyperpigmentation", options: ["None", "Mild", "Moderate", "Severe"] },
    { label: "Fine Lines", options: ["None", "Few", "Some", "Many"] },
    { label: "Sun Exposure Daily", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { label: "Water Intake per Day", options: ["Less than 1L", "1-2L", "More than 2L"] },
    { label: "Diet Influence", options: ["Unhealthy", "Balanced", "Very Healthy"] },
    { label: "Sleep Hours per Night", options: ["Less than 5", "5-7", "7-9", "More than 9"] },
    { label: "Stress Level", options: ["Low", "Moderate", "High"] },
  ];

  return (
    <div className="container">
      <h2>✨ Skin Analysis Quiz ✨</h2>
      <p>Answer the questions below to get insights into your skin type & condition.</p>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} className="question">
            <p className="question-label">{q.label}</p>
            <div className="options">
              {q.options.map((option, i) => (
                <label key={i} className={`option ${formData[q.label] === option ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name={q.label}
                    value={option}
                    onChange={() => handleChange(q.label, option)}
                  />
                  <span className="custom-radio"></span>
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">🔮 Predict Skin Type & Condition</button>
      </form>

      <style>
        {`
          body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: #f8f9fa;
            height: 100%;
            overflow-y: auto; /* Enable scrolling */
          }

          .container {
            width: 100%;
            max-width: 800px;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            min-height: 100vh; /* Ensure full page height */
            overflow-y: auto; /* Allow scrolling inside container */
          }

          h2 {
            font-size: 26px;
            color: #ff4d6d;
          }

          p {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
          }

          .question {
            margin-bottom: 20px;
            text-align: left;
          }

          .question-label {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
          }

          .options {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .option {
            display: flex;
            align-items: center;
            background: #f1f1f1;
            padding: 12px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            border: 2px solid transparent;
          }

          .option:hover, .option.selected {
            background: #ffedf0;
            border-color: #ff4d6d;
          }

          .option input {
            display: none;
          }

          .custom-radio {
            width: 16px;
            height: 16px;
            border: 2px solid #ff4d6d;
            border-radius: 50%;
            margin-right: 8px;
            display: inline-block;
            transition: 0.3s;
          }

          .option input:checked + .custom-radio {
            background: #ff4d6d;
            border-color: #ff4d6d;
          }

          button {
            background: #ff4d6d;
            color: white;
            font-size: 18px;
            padding: 12px 20px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.3s ease-in-out;
            width: 100%;
            margin-top: 20px;
          }

          button:hover {
            background: #d73353;
          }
        `}
      </style>
    </div>
  );
};

export default SkinAnalysis;

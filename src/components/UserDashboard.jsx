import React, { useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    waterIntake: '',
    dietQuality: '',
    sleepHours: '',
    exerciseFrequency: '',
    stressLevel: '',
    sunExposure: '',
    hydrationLevel: '',
    acneHistory: '',
    redness: '',
    sensitivityToProducts: '',
    wrinkles: '',
    darkSpots: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3031/predict-skin', formData);
      setPrediction(response.data.prediction);
      setRecommendedProducts(response.data.recommendedProducts);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('An error occurred while predicting your skin type and recommending products.');
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <h1>Skincare Questionnaire</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="form-input"
        />
        {/* Add other input fields for gender, water intake, diet, etc. */}
        
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {prediction && (
        <div className="result-container">
          <h2>Prediction Results</h2>
          <p><strong>Skin Type:</strong> {prediction.skinType}</p>
          <p><strong>Skin Condition:</strong> {prediction.skinCondition}</p>

          <h3>Recommended Products:</h3>
          {recommendedProducts.map((product, index) => (
            <div key={index} className="product-item">
              <p>{product.name}</p>
              <a href={product.url} target="_blank" rel="noopener noreferrer" className="product-link">View Product</a>
            </div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        .dashboard-container {
          padding: 20px;
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .form-input {
          padding: 10px;
          margin: 10px;
          width: 200px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .submit-btn {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }

        .loading-text, .error-text {
          font-size: 1.2rem;
          color: #ff0000;
        }

        .result-container {
          margin-top: 20px;
          text-align: left;
        }

        .product-item {
          margin: 10px 0;
        }

        .product-link {
          color: #4CAF50;
          text-decoration: none;
          font-weight: bold;
        }

        .product-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;

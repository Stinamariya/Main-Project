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
    <div>
      <h1>Skincare Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
        />
        {/* Add other input fields for gender, water intake, diet, etc. */}
        
        <button type="submit">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {prediction && (
        <div>
          <h2>Prediction Results</h2>
          <p><strong>Skin Type:</strong> {prediction.skinType}</p>
          <p><strong>Skin Condition:</strong> {prediction.skinCondition}</p>

          <h3>Recommended Products:</h3>
          {recommendedProducts.map((product, index) => (
            <div key={index}>
              <p>{product.name}</p>
              <a href={product.url} target="_blank" rel="noopener noreferrer">View Product</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

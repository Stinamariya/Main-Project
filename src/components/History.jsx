import React, { useEffect, useState } from "react";

const History = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`http://localhost:3031/api/predictions/${userId}`);
      const data = await response.json();
      setHistory(data);
    };
    fetchHistory();
  }, [userId]);

  return (
    <div className="container">
      <h2>Your Skincare History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            <strong>Date:</strong> {new Date(item.createdAt).toLocaleDateString()} <br />
            <strong>Predicted Skin Type:</strong> {item.predictedSkinType} <br />
            <strong>Predicted Skin Condition:</strong> {item.predictedSkinCondition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const Dashboard = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`http://localhost:3031/api/predictions/${userId}`);
      const data = await response.json();
      setHistory(data);
    };
    fetchHistory();
  }, [userId]);

  const data = {
    labels: history.map(item => new Date(item.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Skin Type Changes",
        data: history.map(item => item.predictedSkinType.length),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Skin Condition Changes",
        data: history.map(item => item.predictedSkinCondition.length),
        borderColor: "red",
        fill: false,
      }
    ]
  };

  return (
    <div className="container">
      <h2>Skin Progress Dashboard</h2>
      <Line data={data} />
    </div>
  );
};

export default Dashboard;

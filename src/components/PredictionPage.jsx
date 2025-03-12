import { useNavigate } from "react-router-dom";

const PredictionPage = ({ predictedSkinType, predictedCondition }) => {
  const navigate = useNavigate();

  const handleShowRecommendations = () => {
    navigate("/recommended-products", {
      state: { predictedSkinType, predictedCondition },
    });
  };

  return (
    <button onClick={handleShowRecommendations} className="bg-blue-500 text-white px-4 py-2 rounded">
      Show Recommended Products
    </button>
  );
};

export default PredictionPage;

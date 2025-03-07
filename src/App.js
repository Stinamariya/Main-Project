import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Questionnaire from "./components/Questionnaire";
import Recommendations from "./components/Recommendations";
import Results from "./components/Results";
import History from "./components/History";

function App() {
  const userId = localStorage.getItem("userId"); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Questionnaire" element={<Questionnaire userId={userId} />} />
        <Route path="/results" element={<Results />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/History" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

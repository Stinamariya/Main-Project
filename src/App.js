import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Questionnaire from "./components/Questionnaire";
import Recommendations from "./components/Recommendations";
import Results from "./components/Results";
import History from "./components/History";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import DashboardPage from "./components/DashboardPage";
import Orders from "./components/Orders";

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
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboardpage" element={<DashboardPage />} />
        <Route path="/orders" element={<Orders />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { CartProvider } from "./context/CartContext";

import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Questionnaire from "./components/Questionnaire";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ChooseLogin from "./components/ChooseLogin";
import UserDashboard from "./components/UserDashboard";
import EditProduct from "./components/EditProduct";
import PredictionPage from "./components/PredictionPage";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart"; // Corrected import
import Results from "./components/Results";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import Profile from "./components/Profile";
import OrderSummary from "./components/OrderSummary";
import OrderManagement from "./components/OrderManagement";
import ProductManagement from "./components/ProductManagement";
import UserManagement from "./components/UserManagement";

function App() {
  const role = localStorage.getItem("role");

  return (
    <CartProvider>
      <BrowserRouter>
      <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/choose-login" element={<ChooseLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={role === "admin" ? <AdminDashboard /> : <Navigate to="/admin-login" />}
          />
          <Route
            path="/user-dashboard"
            element={role === "user" ? <UserDashboard /> : <Navigate to="/admin-login" />}
          />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/predictionpage" element={<PredictionPage />} />
          <Route path="/recommended-products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/ordermanagement" element={<OrderManagement />} />
          <Route path="/productmanagement" element={<ProductManagement />} />
          <Route path="/usermanagement" element={<UserManagement />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
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



function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/choose-login" element={<ChooseLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={role === "admin" ? <AdminDashboard /> : <Navigate to="/admin-login" />}
        />
        {/* Protect the User Dashboard route */}
        <Route
          path="/user-dashboard"
          element={role === "user" ? <UserDashboard /> : <Navigate to="/admin-login" />}
          />
        <Route path="/questionnaire" element={<Questionnaire />} /> 
        
        <Route path="/editproduct" element={<EditProduct />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

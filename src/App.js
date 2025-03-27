import { CartProvider } from "./context/CartContext";

import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Questionnaire from "./components/Questionnaire";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
// import EditProduct from "./components/EditProduct";
// import PredictionPage from "./components/PredictionPage";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart"; // Corrected import
import Results from "./components/Results";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import Profile from "./components/Profile";
import { Payment } from "@mui/icons-material";
import Orders from "./components/Orders";
import ProductDetails from "./components/ProductDetails";

// import ReviewForm from "./components/ReviewForm";
import ProductReviews from "./components/ProductReviews";
import ManageProducts from "./components/ManageProducts";
import ManageUsers from "./components/ManageUsers";
import ManageOrders from "./components/ManageOrders";
import MyOrders from "./components/MyOrders";
import Review from "./components/Review";
import FeedbackPage from './components/FeedbackPage';
import AdmNavbar from './components/AdmNavbar';


// import OrderSummary from "./components/OrderSummary";
// import OrderManagement from "./components/OrderManagement";
// import ProductManagement from "./components/ProductManagement";


function App() {
  const role = localStorage.getItem("role");

  return (
    <CartProvider>
      <BrowserRouter>
      <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<SignUp />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/results" element={<Results />} />
          {/* <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={role === "admin" ? <AdminDashboard /> : <Navigate to="/admin-login" />}
          />
          <Route
            path="/user-dashboard"
            element={role === "user" ? <UserDashboard /> : <Navigate to="/admin-login" />}
          />
          
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/predictionpage" element={<PredictionPage />} />
         
          
        
          
          
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/ordermanagement" element={<OrderManagement />} />
          <Route path="/productmanagement" element={<ProductManagement />} /> */}
        
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/recommended-products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/product/:productId/reviews" element={<ProductReviews />} />
          {/* <Route path="/product/:id/add-review" element={<ReviewForm />} /> */}
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/orderconfirm/:orderId" element={<OrderConfirmation />} />
          <Route path="/review/:productId" element={<Review />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/admnav" element={<AdmNavbar />} />

       
          {/* <Route path="/reviewform" element={<ReviewForm />} /> */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
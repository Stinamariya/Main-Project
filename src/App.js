import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Skinanalysis from './components/Skinanalysis';

import './App.css';  // Include global styles

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Skinanalysis" element={<Skinanalysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

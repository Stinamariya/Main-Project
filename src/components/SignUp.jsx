import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await axios.post("http://localhost:3031/Signup", formData);
            alert("Signup Successful! Please login.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    };

    const pageBackgroundStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfDMf3Fmu58pImuumotXNTd2GXKhGr8CNCob3ziIVjj0snylCiybi9rloXkay80jaAAH8&usqp=CAU')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1,
    };

    const headingStyle = {
        textAlign: "center",
        marginBottom: "20px",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "4px",
        border: "1px solid #ddd",
    };

    const selectStyle = {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "4px",
        border: "1px solid #ddd",
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        width: "100%",
        marginTop: "20px",
    };

    const errorStyle = {
        color: "red",
        marginBottom: "15px",
    };

    const loginLinkStyle = {
        textAlign: "center",
        marginTop: "20px",
        color: "#007bff",
        textDecoration: "none",
    };

    return (
        <div style={pageBackgroundStyle}>
            <div style={containerStyle}>
                <h2 style={headingStyle}>Signup</h2>
                {error && <p style={errorStyle}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                    <select
                        name="role"
                        onChange={handleChange}
                        style={selectStyle}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" style={buttonStyle}>Sign Up</button>
                </form>
                <Link to="/login" style={loginLinkStyle}>
                    Already have an account? Login here
                </Link>
            </div>
        </div>
    );
};

export default Signup;

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const response = await fetch("http://localhost:3031/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            console.log("Login successful:", data);

            // Store token in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("role", data.role);

            // Redirect based on role
            if (data.role === "admin") {
                navigate("/admin-dashboard"); // Redirect to Admin Dashboard
            } else {
                navigate("/user-dashboard"); // Redirect to User Dashboard
            }
        } catch (error) {
            console.error("Error during login:", error.message);
        }
    };

    // Full-page background image styles
    const pageBackgroundStyle = {
        position: "fixed", // Make the background image fill the entire page
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "url('https://www.shutterstock.com/image-photo/light-green-serum-texture-aloe-260nw-1711629997.jpg')", // Replace with your image URL
        backgroundSize: "cover", // Ensure the image covers the entire viewport
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Keeps the background image fixed when scrolling
        zIndex: 1, // Keeps the background image behind the form
    };

    // Form container styles
    const formContainerStyle = {
        position: "absolute", // Center the form in the page
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Center form vertically and horizontally
        maxWidth: "700px",
        padding: "90px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Add slight transparency for readability
        zIndex: 2, // Keeps the form above the background
    };

    return (
        <div style={pageBackgroundStyle}>
            <div style={formContainerStyle}>
                <h2 style={{ textAlign: "center", color: "#333" }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ fontSize: "16px", fontWeight: "bold" }}>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            style={{
                                width: "100%", 
                                padding: "10px", 
                                marginTop: "5px", 
                                border: "1px solid #ccc", 
                                borderRadius: "4px",
                                fontSize: "14px"
                            }} 
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ fontSize: "16px", fontWeight: "bold" }}>Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            style={{
                                width: "100%", 
                                padding: "10px", 
                                marginTop: "5px", 
                                border: "1px solid #ccc", 
                                borderRadius: "4px",
                                fontSize: "14px"
                            }} 
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            width: "100%", 
                            padding: "12px", 
                            backgroundColor: "#4CAF50", 
                            color: "white", 
                            border: "none", 
                            borderRadius: "4px", 
                            fontSize: "16px", 
                            cursor: "pointer"
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

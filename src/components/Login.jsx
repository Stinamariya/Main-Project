// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate(); // Initialize navigation

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const userData = { email, password };

//         try {
//             const response = await fetch("http://localhost:3031/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(userData),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || "Login failed");
//             }

//             console.log("Login successful:", data);

//             // Store token in localStorage
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("userId", data.userId);
//             localStorage.setItem("role", data.role);

//             // Redirect based on role
//             if (data.role === "admin") {
//                 navigate("/admin-dashboard"); // Redirect to Admin Dashboard
//             } else {
//                 navigate("/user-dashboard"); // Redirect to User Dashboard
//             }
//         } catch (error) {
//             console.error("Error during login:", error.message);
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Email:</label>
//                 <input 
//                     type="email" 
//                     value={email} 
//                     onChange={(e) => setEmail(e.target.value)} 
//                     required 
//                 />

//                 <label>Password:</label>
//                 <input 
//                     type="password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                     required 
//                 />

//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;











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

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
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
    );
};

export default Login;

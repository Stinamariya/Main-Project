import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage(""); 
    setIsLoading(true); 
    try {
      const response = await axios.post("http://localhost:3031/Login", { email, password });
  
      if (response.data.status === "success") {
        const { token, role, userId, username } = response.data; 
  
        sessionStorage.setItem("token", token);  
        sessionStorage.setItem("userId", userId); 
        sessionStorage.setItem("username", username); 
  
        navigate("/Questionnaire");  
      } else {
        setErrorMessage("Login failed: " + response.data.message); 
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please try again."); 
    } finally {
      setIsLoading(false); 
    }
  };
  

  return (
    <div style={styles.body}>
      <div className="login-container" style={styles.loginContainer}>
        <div className="login-form" style={styles.loginForm}>
          <center>
            <h1 style={styles.header}>Personal Skincare Assistant</h1>
            <h3 style={styles.subHeader}>Login to Your Account</h3>
          </center>
          {errorMessage && <div style={styles.alert}>{errorMessage}</div>} {/* Error Message */}
          
          <div className="form-group">
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <button
              onClick={handleLogin}
              className="btn btn-success"
              disabled={isLoading}
              style={styles.button}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          <br />
          <div className="form-group">
            <a href="/SignUp" style={styles.signupLink}>
              New to Skincare Assistant? Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundImage: 'url(https://your-image-link.com/skincare-bg.jpg)', // Replace with an appropriate background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    maxWidth: '400px',
    width: '100%',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  header: {
    fontSize: '2.5em',
    color: '#FF6F61', 
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: '1.2em',
    color: '#333',
    marginBottom: '20px',
  },
  label: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    fontSize: '1em',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#FF6F61',
    color: '#fff',
    border: 'none',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  alert: {
    color: 'red',
    marginBottom: '15px',
  },
  signupLink: {
    color: '#FF6F61',
    fontSize: '1em',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
};

export default Login;

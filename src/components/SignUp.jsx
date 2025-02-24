import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3031/SignUp", {
        username,
        email,
        password,
      });

      if (response.data.status === "success") {
        setSuccessMessage("Registration successful! Please log in.");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(response.data.message || "Sign up failed.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Response Error:", error.response.data);
        setErrorMessage(error.response.data.message || "Sign up failed.");
      } else if (error.request) {
        console.error("No Response from Server:", error.request);
        setErrorMessage("No response from server. Please check your backend.");
      } else {
        console.error("Axios Error:", error.message);
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div className="signup-container" style={styles.signupContainer}>
        <div className="signup-form" style={styles.signupForm}>
          <center>
            <h1 style={styles.header}>Create Your Account</h1>
            <h3 style={styles.subHeader}>Personal Skincare Assistant</h3>
          </center>

          {errorMessage && <div style={styles.alert}>{errorMessage}</div>}
          {successMessage && <div style={styles.successAlert}>{successMessage}</div>}

          <div className="form-group">
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              type="email"
              className="form-control"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Confirm your password"
            />
          </div>

          <div className="form-group">
            <button
              onClick={handleSignUp}
              className="btn btn-success"
              disabled={isLoading}
              style={styles.button}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          <br />
          <div className="form-group">
            <a href="/Login" style={styles.loginLink}>
              Already have an account? Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  signupContainer: {
    maxWidth: '400px',
    width: '100%',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
  header: { fontSize: '2.5em', color: '#FF6F61', fontWeight: 'bold' },
  alert: { color: 'red', marginBottom: '15px' },
  successAlert: { color: 'green', marginBottom: '15px' },
  label: { fontSize: '1.1em', fontWeight: 'bold', color: '#555', marginBottom: '5px' },
  input: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' },
  button: { width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#FF6F61', color: '#fff', border: 'none', cursor: 'pointer' },
  loginLink: { color: '#FF6F61', fontSize: '1em', textDecoration: 'none' },
};

export default SignUp;

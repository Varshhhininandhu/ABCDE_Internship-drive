import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Register = ({ onLogin, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      toast.warn("Please fill in both fields");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/users", {
        username,
        password,
      });

      toast.success("Registered successfully!");
      localStorage.setItem("token", "mock-token");
      onLogin();
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("Username already taken");
      } else {
        toast.error("Registration failed");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>📝 Register</h2>
        <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
          <div style={styles.inputGroup}>
            <i className="fas fa-user" style={styles.icon}></i>
            <input
              type="text"
              placeholder="Username"
              style={styles.input}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <i className="fas fa-lock" style={styles.icon}></i>
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={handleRegister}
          >
            Register
          </button>
          {onSwitchToLogin && (
            <button
              style={styles.backBtn}
              onClick={onSwitchToLogin}
            >
              ← Back to Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #ffecd2, #fcb69f)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  box: {
    backgroundColor: "#fff",
    padding: "3rem",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    color: "#c2410c",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "0.5rem",
    background: "#f9f9f9",
  },
  icon: {
    marginRight: "0.5rem",
    color: "#555",
  },
  input: {
    border: "none",
    outline: "none",
    flex: 1,
    background: "transparent",
    fontSize: "1rem",
    padding: "0.5rem 0",
  },
  button: {
    backgroundColor: "#fb923c",
    color: "white",
    padding: "0.7rem",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#f97316",
  },
  backBtn: {
    marginTop: "10px",
    background: "#f3f4f6",
    color: "#333",
    padding: "0.6rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Register;

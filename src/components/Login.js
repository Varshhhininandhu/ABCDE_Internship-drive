import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.warn("Please fill in both fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLogin();
      toast.success("Login successful!");
      navigate("/items");
    } catch {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>🔐 Login</h2>
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
            style={styles.button}
            onClick={handleLogin}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Login
          </button>
          <button style={styles.backBtn} onClick={onSwitchToRegister}>
            New user? Register →
          </button>
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
    background: "linear-gradient(to right, #d9a7c7, #fffcdc)",
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
    color: "#8b5cf6",
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
    backgroundColor: "#8b5cf6",
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
    backgroundColor: "#7c3aed",
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

export default Login;

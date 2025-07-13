import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Checkout = ({ onPlaceOrder, onBack }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/cart", { user_id: 1 })
      .then((res) => setCart(res.data))
      .catch(() => toast.error("Failed to fetch cart"));
  }, []);

  const handlePlace = () => {
    if (cart.length === 0) {
      toast.warning("Cart is empty! Cannot place order.");
      return;
    }
    onPlaceOrder();
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "2rem",
      background: "linear-gradient(to right, #d9a7c7, #fffcdc)",
      fontFamily: "'Segoe UI', sans-serif",
    },
    card: {
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#4f46e5",
      marginBottom: "1.5rem",
    },
    cartItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f9f9f9",
      padding: "0.75rem 1rem",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      marginBottom: "0.75rem",
      transition: "transform 0.2s ease",
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginTop: "1.5rem",
      flexWrap: "wrap",
    },
    button: {
      backgroundColor: "#4f46e5",
      color: "#fff",
      border: "none",
      padding: "0.6rem 1.2rem",
      borderRadius: "10px",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#4338ca",
    },
    backButton: {
      backgroundColor: "#f3f4f6",
      color: "#333",
      border: "1px solid #ccc",
      padding: "0.6rem 1.2rem",
      borderRadius: "10px",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    backButtonHover: {
      backgroundColor: "#e5e7eb",
    },
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={styles.card}
      >
        <h2 style={styles.title}>🧾 Checkout</h2>

        {cart.length === 0 ? (
          <p style={{ color: "#555" }}>Your cart is empty.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {cart.map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={styles.cartItem}
              >
                <span style={{ color: "#333", fontWeight: "500" }}>
                  {item.name}
                </span>
                <span style={{ color: "#16a34a", fontWeight: "600" }}>
                  ₹{item.price}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div style={styles.buttonsContainer}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            onClick={handlePlace}
          >
            Place Order
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={styles.backButton}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                styles.backButtonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor =
                styles.backButton.backgroundColor)
            }
            onClick={onBack}
          >
            Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;

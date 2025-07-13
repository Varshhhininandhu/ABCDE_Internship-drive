import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const OrderHistory = ({ onBack }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/orders", {
        user_id: 1,
      })
      .then((res) => {
        setOrders(res.data);
        if (res.data.length === 0) toast.info("No orders placed yet.");
      })
      .catch(() => toast.error("Failed to load order history"));
  }, []);

  const containerStyle = {
    padding: "2rem",
    maxWidth: "800px",
    margin: "auto",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const headingStyle = {
    fontSize: "2rem",
    color: "#1e40af",
    textAlign: "center",
    marginBottom: "2rem",
    borderBottom: "3px solid #cbd5e1",
    paddingBottom: "0.5rem"
  };

  const cardStyle = {
    backgroundColor: "#f1f5f9",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    marginBottom: "1.5rem",
    transition: "transform 0.3s",
    borderLeft: "5px solid #1e40af"
  };

  const backBtnStyle = {
    display: "inline-block",
    background: "#1e40af",
    color: "#fff",
    border: "none",
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1.5rem",
    transition: "all 0.3s ease"
  };

  const backBtnHover = {
    backgroundColor: "#1d4ed8",
    transform: "scale(1.05)"
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📦 Your Orders</h2>

      <AnimatePresence>
        {orders.length === 0 ? (
          <motion.p
            key="no-orders"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: "center", fontStyle: "italic" }}
          >
            No orders found.
          </motion.p>
        ) : (
          orders.map((order) => (
            <motion.div
              key={order.id}
              style={cardStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <div><strong>🧾 Order ID:</strong> {order.id}</div>
              <div><strong>🛒 Cart ID:</strong> {order.cart_id}</div>
              <div><strong>📅 Date:</strong> {new Date(order.created_at).toLocaleString()}</div>
            </motion.div>
          ))
        )}
      </AnimatePresence>

      <motion.div style={{ textAlign: "center" }}>
        <motion.button
          style={backBtnStyle}
          whileHover={backBtnHover}
          onClick={onBack}
        >
          ← Back
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OrderHistory;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ItemList = ({ onLogout, onAddToCart, onGoToCheckout, onGoToOrders }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/items")
      .then((res) => setItems(res.data))
      .catch(() => toast.error("Failed to load items"));
  }, []);

  const viewCart = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/cart", { user_id: 1 });
      const cart = res.data;
      if (cart.length === 0) return toast.info("Cart is empty.");
      let msg = "🛒 Cart Items:\n";
      cart.forEach((item, i) => {
        msg += `${i + 1}. ${item.name} — ₹${item.price}\n`;
      });
      toast(msg);
    } catch {
      toast.error("Could not load cart");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "'Segoe UI', sans-serif",
      background: "linear-gradient(to right, #d9a7c7, #fffcdc)",
      boxSizing: "border-box",
    },
    headerButtons: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginBottom: "2rem",
    },
    button: {
      backgroundColor: "#4f46e5",
      color: "#fff",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    buttonHover: {
      backgroundColor: "#4338ca",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1.5rem",
      width: "100%",
    },
    card: {
      backgroundColor: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.2s ease",
      overflow: "hidden",
    },
    cardImage: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
    },
    cardContent: {
      padding: "1rem",
      textAlign: "center",
    },
    addButton: {
      backgroundColor: "#4f46e5",
      color: "#fff",
      border: "none",
      padding: "0.6rem",
      fontWeight: "bold",
      cursor: "pointer",
      borderBottomLeftRadius: "12px",
      borderBottomRightRadius: "12px",
      transition: "background-color 0.2s ease",
    },
    addButtonHover: {
      backgroundColor: "#4338ca",
    },
    heading: {
      textAlign: "center",
      marginBottom: "1.5rem",
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#4f46e5",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerButtons}>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={onGoToCheckout}
        >
          🛒 Checkout
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={viewCart}
        >
          📦 View Cart
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={onGoToOrders}
        >
          🕑 Order History
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={onLogout}
        >
          🚪 Logout
        </button>
      </div>

      <h2 style={styles.heading}>🛍️ Items</h2>

      <div style={styles.grid}>
        {items.map((item) => (
          <div
            key={item.id}
            style={styles.card}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={item.name}
              style={styles.cardImage}
            />
            <div style={styles.cardContent}>
              <h4 style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>{item.name}</h4>
              <p style={{ margin: 0, color: "#16a34a", fontWeight: "600" }}>₹{item.price}</p>
            </div>
            <button
              style={styles.addButton}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.addButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.addButton.backgroundColor)}
              onClick={() => onAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;

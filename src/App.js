import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ItemList from "./components/ItemList";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState("items");
  const [view, setView] = useState("login"); // 'login' or 'register'

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const handleAddToCart = async (item) => {
    try {
      await axios.post("http://localhost:8080/api/cart/add", {
        user_id: 1,
        item_id: item.id,
      });
      toast.success(`${item.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await axios.post("http://localhost:8080/api/order/place", {
        user_id: 1,
      });
      toast.success("Order placed successfully!");
      setScreen("items");
    } catch {
      toast.error("Failed to place order");
    }
  };

  return (
    <div>
      {!loggedIn ? (
        view === "login" ? (
          <Login
            onLogin={() => setLoggedIn(true)}
            onSwitchToRegister={() => setView("register")}
          />
        ) : (
          <Register onLogin={() => setLoggedIn(true)} />
        )
      ) : screen === "checkout" ? (
        <Checkout
          onPlaceOrder={handlePlaceOrder}
          onBack={() => setScreen("items")}
        />
      ) : screen === "orders" ? (
        <OrderHistory onBack={() => setScreen("items")} />
      ) : (
        <ItemList
          onLogout={handleLogout}
          onAddToCart={handleAddToCart}
          onGoToCheckout={() => setScreen("checkout")}
          onGoToOrders={() => setScreen("orders")}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;

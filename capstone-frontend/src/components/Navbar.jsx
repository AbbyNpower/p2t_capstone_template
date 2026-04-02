import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import "../styles/navbar.css";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = cart.length;

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem("token");
      const adminStatus = localStorage.getItem("isAdmin") === "true";

      setIsLoggedIn(!!token);
      setIsAdmin(adminStatus);
    };

    updateAuthState();
    window.addEventListener("storage", updateAuthState);

    return () => window.removeEventListener("storage", updateAuthState);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");

    clearCart();

    setIsLoggedIn(false);
    setIsAdmin(false);

    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <nav className="navbar">
      <h1>🧸 Abby's Toy Store</h1>

      <section className="nav-links-container">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/products" className="nav-link">Products</NavLink>

        {isAdmin && (
          <>
            <NavLink to="/add-product" className="nav-link">Add Product</NavLink>
            <NavLink to="/orders" className="nav-link">Orders</NavLink>
          </>
        )}

        {isLoggedIn ? (
          <button className="nav-link" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/signup" className="nav-link">Signup</NavLink>
          </>
        )}

        <NavLink to="/cart" className="nav-link">
          Cart ({totalItems})
        </NavLink>
      </section>
    </nav>
  );
};

export default Navbar;


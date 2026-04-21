import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LogOut, LogIn } from "lucide-react";
import "./Sidebar1.css";

const Sidebar1 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const loggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Csak a Főoldal maradt meg
  const NAV_ITEMS = [
    { icon: Home, label: "Főoldal", href: "/" },
  ];

  return (
    <div className="sidebar-container">
      <Link to="/" className="sidebar-logo-section">
        <div className="logo-circle">
          <span className="logo-text-icon">O</span>
        </div>
        <span className="logo-title">Okos Közösség</span>
      </Link>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`sidebar-item ${isActive ? "active" : ""}`}
            >
              <item.icon className="sidebar-icon" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {loggedIn ? (
          <button onClick={handleLogout} className="auth-button logout-style">
            <LogOut className="sidebar-icon" />
            <span>Kijelentkezés</span>
          </button>
        ) : (
          <Link to="/login" className="auth-button login-style">
            <LogIn className="sidebar-icon" />
            <span>Bejelentkezés</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar1;
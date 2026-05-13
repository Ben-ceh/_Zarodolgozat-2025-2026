import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Hozzáadtam a ShieldCheck ikont
import { Home, PlusCircle, Users, User, Settings, LogOut, LogIn, ShieldCheck } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Lekérjük a szerepkört
  const loggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Alap menüpontok mindenki számára
  const NAV_ITEMS = [
    { icon: Home, label: "Főoldal", href: userRole === "admin" ? "/user" : "/user" },
    { icon: PlusCircle, label: "Új bejegyzés", href: "/UserBejegyFelv" },
    { icon: Users, label: "Csoportjaim", href: "/csoportjaim" },
    { icon: User, label: "Profilom", href: "/profil" },
  ];

  // Admin specifikus menüpontok
  const ADMIN_ITEMS = [
    { icon: ShieldCheck, label: "Admin Panel", href: "/admin" },
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
        {/* Alap menü kirajzolása */}
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`sidebar-item ${location.pathname === item.href ? "active" : ""}`}
          >
            <item.icon className="sidebar-icon" />
            <span>{item.label}</span>
          </Link>
        ))}

        {/* ADMIN SZEKCIÓ - Csak ha az admin jelentkezett be */}
        {userRole === "admin" && (
          <>
            <div className="sidebar-divider" style={{ margin: "15px 0", borderTop: "1px solid #eee" }} />
            <p style={{ padding: "0 20px", fontSize: "12px", color: "#888", fontWeight: "bold" }}>ADMINISZTRÁCIÓ</p>
            {ADMIN_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`sidebar-item admin-style ${location.pathname === item.href ? "active" : ""}`}
                style={{ color: "#d97706" }} // Aranyos/Narancs szín az adminnak
              >
                <item.icon className="sidebar-icon" />
                <span>{item.label}</span>
              </Link>
            ))}
          </>
        )}
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

export default Sidebar;
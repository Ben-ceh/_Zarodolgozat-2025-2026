import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, PlusCircle, Users, User, Settings, LogOut, LogIn } from "lucide-react";
import "./Sidebar.css"; // Győződj meg róla, hogy az elérési út jó!

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const loggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const NAV_ITEMS = [
    { icon: Home, label: "Főoldal", href: "/" },
    { icon: PlusCircle, label: "Új bejegyzés", href: "/UserBejegyFelv" },
    { icon: Users, label: "Csoportjaim", href: "/csoportjaim" },
    { icon: User, label: "Profilom", href: "/profil" },
    { icon: Settings, label: "Beállítások", href: "/beallitasok" },
  ];

  return (
    <div className="sidebar-container">
      {/* Logo Szekció */}
      <Link to="/" className="sidebar-logo-section">
        <div className="logo-circle">
          <span className="logo-text-icon">O</span>
        </div>
        <span className="logo-title">Okos Közösség</span>
      </Link>

      {/* Navigáció */}
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

      {/* Footer / Auth */}
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
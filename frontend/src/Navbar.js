import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import "./App.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const loggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/menu1");
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <div style={{margin:"auto"}} className={`menu ${menuOpen ? "open" : ""}`}>
          
          <Link to="/FoOldal" className="link" onClick={() => setMenuOpen(false)}>
            FőOldal
          </Link>
          {loggedIn && role === "user" && (
            <Link to="/csoportjaim"  className="link NavBarNevek" onClick={() => setMenuOpen(false)}>
              Csoportjaim
            </Link>
            
          )}
          {loggedIn && role === "admin" && (
            <Link to="/admin" className="link" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
            
          )}
          <div className="dropdown">
                {loggedIn && role === "admin" && (
                <button className="dropdown-btn">
                  
                  Törlések ▼
                </button>
                )}
                <div className="dropdown-content">
                  {loggedIn && role === "admin" && (
                    <>
                      <Link 
                        to="/BejegyzesTorles" 
                        className="dropdown-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        Bejegyzések törlése
                      </Link>

                      <Link 
                        to="/FelhasznaloTorlese" 
                        className="dropdown-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        Felhasználók törlése
                      </Link>

                      <Link 
                        to="/HozzaszolasTorlese" 
                        className="dropdown-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        Hozzászolások törlése
                      </Link>

                    </>
                  )}
                  
                </div>
              </div>
           
          {loggedIn && role === "user" && (
            <Link to="/user" className="link" onClick={() => setMenuOpen(false)}>
              User menü
            </Link>
          )}
        </div>
      </div>

      <div className="navbar-right">
        {loggedIn ? (
          <button className="logoutButton" onClick={handleLogout}>
            Kijelentkezés
          </button>
        ) : (
          <Link to="/login" className="loginButton">
            Bejelentkezés
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

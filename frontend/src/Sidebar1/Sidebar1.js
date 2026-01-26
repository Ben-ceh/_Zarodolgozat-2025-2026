import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import "../App.css";
const Sidebar1 = () => {
const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const loggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/menu1");
  };

  return (
    <div className="sidebar">
      <h5 className="mb-4">Okos Közösség</h5>

      <ul className="list-unstyled">
        <li>
          <Link to="/FoOldal" className="sidebar-link">🏠 Főoldal</Link>
        </li>
        
        {/* <li>
          <Link to="/login" className="sidebar-link">➕ Új bejegyzés</Link>
        </li> */}
        <li style={{textAlign:"center"}}><b>-</b></li>
        {/* <li>
          <Link to="/login" className="sidebar-link">👥 Csoportjaim</Link>
        </li>
        <li>
          <Link to="/login" className="sidebar-link">👤 Profilom</Link>
        </li> */}
        
        <li>
          <Link to="/beallitasok" className="sidebar-link">⚙ Beállítások</Link>
        </li>

        {loggedIn ? (
          <li>
          <button className="logoutButton" onClick={handleLogout}>
          🚪 Kijelentkezés
          </button>
          </li>
        
          
        ) : (
          <li>
          <Link to="/login" className="loginButton">
          🚪 Bejelentkezés
          </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar1;

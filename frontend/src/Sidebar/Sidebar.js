import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h5 className="mb-4">Okos Közösség</h5>

      <ul className="list-unstyled">
        <li>
          <Link to="/" className="sidebar-link">🏠 Főoldal</Link>
        </li>
        
        <li>
          <Link to="/uj-bejegyzes" className="sidebar-link">➕ Új bejegyzés</Link>
        </li>
        <li style={{textAlign:"center"}}><b>-</b></li>
        <li>
          <Link to="/csoportjaim" className="sidebar-link">👥 Csoportjaim</Link>
        </li>
        <li>
          <Link to="/profil" className="sidebar-link">👤 Profilom</Link>
        </li>
        <li>
          <Link to="/beallitasok" className="sidebar-link">⚙ Beállítások</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

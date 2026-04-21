import Sidebar1 from "../Sidebar1/Sidebar1";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, Info } from "lucide-react"; // Ikonok a gombokhoz
import "./MainLayout1.css";

const MainLayout1 = ({ children }) => {
  const token = localStorage.getItem("token");
  const isGuest = !token;

  return (
    <div className="app-layout">
      <Sidebar1 />

      <main className="main-content">
        {children}
      </main>

      <aside className="right-sidebar-wrapper">
        {isGuest ? (
          <div className="guest-welcome-card">
            <div className="card-header">
              <Info size={20} className="info-icon" />
              <h3>Üdv az Okos Közösségben! 👋</h3>
            </div>
            
            <p className="welcome-text">
              Úgy tűnik, vendégként böngészel. Ahhoz, hogy:
            </p>
            
            <ul className="benefits-list">
              <li>✅ Saját csoportokat láss</li>
              <li>✅ Bejegyzéseket írhass</li>
              <li>✅ Véleményt nyilváníthass</li>
            </ul>

            <div className="cta-group">
              <Link to="/login" className="cta-button primary-btn">
                <LogIn size={18} />
                <span>Bejelentkezés</span>
              </Link>
              
              <div className="divider"><span>vagy</span></div>

              <Link to="/register" className="cta-button secondary-btn">
                <UserPlus size={18} />
                <span>Fiók létrehozása</span>
              </Link>
            </div>

            <p className="footer-note">
              Csatlakozz hozzánk és légy részese a helyi közösségnek!
            </p>
          </div>
        ) : (
          /* Ha be van jelentkezve, itt mutathatunk mást, pl. híreket */
          <div className="user-info-card">
             <h4>Üdv újra!</h4>
             <p className="small-text">Jó látni, hogy ma is benéztél.</p>
          </div>
        )}
      </aside>
    </div>
  );
};

export default MainLayout1;
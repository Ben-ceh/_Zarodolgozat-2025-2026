import "./CsoportUserMegtekintes.css";
import Cim from "../Cim";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CsoportUserMegtekintes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { csoportId, csoportNev, csoportLeiras, csoportTelepules, csoportKep, csoportLetrehozva } = location.state || {};
  
  const [belepUserid] = useState(localStorage.getItem("belepUserid"));
  const [loadingCsat, setLoadingCsat] = useState(false);
  const [csatlakozva, setCsatlakozva] = useState(false);

  const ido = (evHoNap) => {
    if (!evHoNap) return "";
    return evHoNap.split("T")[0];
  };

  const csatlakozasFugv = async (id, szoveg) => {
    if (csatlakozva || loadingCsat) return;

    const biztos = window.confirm(`Biztosan szeretnél csatlakozni a következő csoporthoz: "${szoveg}"?`);
    if (!biztos) return;

    try {
      setLoadingCsat(true);
      const response = await fetch(Cim.Cim + "/csoportCsat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          felhasznalok_id: belepUserid,
          csoport_id: id
        })
      });

      if (response.ok) {
        setCsatlakozva(true);
        alert("Sikeresen csatlakoztál!");
      } else {
        const data = await response.json();
        alert(data.error || "Hiba történt");
      }
    } catch (e) {
      alert("Hálózati hiba történt.");
    } finally {
      setLoadingCsat(false);
    }
  };
// console.log("A kép teljes elérési útja:", csoportKep);
console.log("cim " + Cim.Cim);
  return (
    
    <main className="csoport-view-container">
      <div className="csoport-content-width">
        
        {/* Vissza gomb */}
        <div className="top-nav">
          <button className="back-link" onClick={() => navigate(-1)}>
            <span className="arrow">←</span> Vissza a csoportokhoz
          </button>
        </div>

        {/* Csoport Kártya */}
        <div className="group-hero-card">
          <div 
            className={`hero-banner ${!csoportKep ? "default-banner" : ""}`}
            style={csoportKep ? { backgroundImage: `url("${Cim.Cim}/kepek/${csoportKep}")`, } : {}}
          >
            <div className="banner-overlay"></div>
          </div>

          <div className="group-info-section">
            <div className="group-details">
              <h1 className="group-name">{csoportNev || "Csoport neve"}</h1>
              <div className="group-badges">
                <span className="badge location">{csoportTelepules}</span>
                <span className="badge date">Létrehozva: {ido(csoportLetrehozva)}</span>
              </div>
              <p className="group-description">
                {csoportLeiras || "Ehhez a csoporthoz még nem tartozik leírás."}
              </p>
            </div>

            <div className="group-action-area">
              <button
                className={`join-button ${csatlakozva ? "joined" : ""}`}
                disabled={csatlakozva || loadingCsat}
                onClick={() => csatlakozasFugv(csoportId, csoportNev)}
              >
                {loadingCsat ? "Folyamatban..." : csatlakozva ? "✓ Tag vagy" : "Csatlakozás a csoporthoz"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default CsoportUserMegtekintes;
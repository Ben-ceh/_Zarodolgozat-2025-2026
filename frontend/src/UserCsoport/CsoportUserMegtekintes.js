// import CsoportUserBejegyzesekOsszesen from "./CsoportUserBejegyzesekOsszesen";
import "./CsoportUserMegtekintes.css";
import Cim from "../Cim"
import { useState } from "react";
import { useLocation } from "react-router-dom";

const CsoportUserMegtekintes = () => {
  const location = useLocation();
  const { csoportId, csoportNev,csoportLeiras,csoportTelepules, csoportKep,csoportLetrehozva } = location.state || {};
  const [userid] = useState(localStorage.getItem("userid"));
  const [belepUserid] = useState(localStorage.getItem("belepUserid"));
  const [siker,setSiker]=useState(false)

  const ido = (evHoNap) => evHoNap.split("T")[0];
// const csatlakozasFugv = async (id, szoveg) => {
//     const biztos = window.confirm(
//       `Biztosan szeretnél csatlakozni a csoportba?\n\n"${szoveg}"`
//     );
  


//     if (biztos) {
//       const response = await fetch(Cim.Cim + "/csoportCsat", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     felhasznalok_id: belepUserid,
//     csoport_id: id
//   })



// });
//  const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//         setSiker(!siker);
//       } else {
//         alert(data.error);
//       }
//     }
//   };
     const [loadingCsat, setLoadingCsat] = useState(false);
     const [csatlakozva, setCsatlakozva] = useState(false);


const csatlakozasFugv = async (id, szoveg) => {
  if (csatlakozva || loadingCsat) return;

  const biztos = window.confirm(
    `Biztosan szeretnél csatlakozni a csoportba?\n\n"${szoveg}"`
  );
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

    const data = await response.json();

    if (response.ok) {
      setCsatlakozva(true);   // 🔥 EZ A LÉNYEG
      alert("Sikeresen csatlakoztál a csoporthoz!");
    } else {
      alert(data.error || "Hiba történt");
    }
  } catch (e) {
    console.error(e);
    alert("Hálózati hiba");
  } finally {
    setLoadingCsat(false);
  }
};

 return (
  <main className="home">
    <section className="feed-container">

      {/* ===== FELSŐ NAV SÁV ===== */}
      <div className="csoport-topbar">
        <button
          className="vissza-btn"
          onClick={() => window.history.back()}
        >
          ← Vissza
        </button>
      </div>

      {/* ===== CSOPORT KÁRTYA ===== */}
      <div className="csoport-card">
        {/* ===== BORÍTÓ ===== */}
<div
  className={`csoport-cover ${!csoportKep ? "no-cover" : ""}`}
  style={csoportKep ? { backgroundImage: `url(${csoportKep})` } : {}}
>
  <div className="csoport-gradient"></div>

  <div className="csoport-header-content">
    <h1 className="csoport-title">{csoportNev || "Csoport neve"}</h1>

    <p className="csoport-desc">
      {csoportLeiras || "Itt jelenik meg a csoport leírása."}
    </p>

    <div className="csoport-meta">
      <span>{csoportTelepules}</span>
      <span>•</span>
      <span>{ido(csoportLetrehozva)}</span>
    </div>

    <div className="csoport-actions">
      <button
        className={`btn ${csatlakozva ? "btn-secondary" : "btn-primary"}`}
        disabled={csatlakozva || loadingCsat}
        onClick={() => csatlakozasFugv(csoportId, csoportNev)}
      >
        {loadingCsat
          ? "Csatlakozás..."
          : csatlakozva
          ? "Csatlakozva"
          : "Csatlakozás"}
      </button>
    </div>
  </div>
</div>


      </div>

      {/* Bejegyzések */}
      {/*
      <CsoportUserBejegyzesekOsszesen 
        userid={userid} 
        belepUserid={belepUserid} 
        csoportId={csoportId} 
      /> 
      */}

    </section>
  </main>
);
};

export default CsoportUserMegtekintes;

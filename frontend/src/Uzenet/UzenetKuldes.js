import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";
import Swal from "sweetalert2";
import "../Uzenet/Uzenet.css";

const UzenetKuldes = ({ kivalasztott }) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [siker, setSiker] = useState(false);

  const [lathato, setLathato] = useState(false);
  const [kinekNev, setKinekNev] = useState("");
  const [kinekId, setKinekId] = useState("");
  const [uzenet, setUzenet] = useState("");

  const [nevKereses, setNevKereses] = useState("");

  // -----------------------------
  useEffect(() => {
    const leToltes = async () => {
      try {
        const response = await fetch(Cim.Cim + "/Felhasznalok");
        const data = await response.json();

        if (response.ok) {
          setAdatok(data);
          setTolt(false);
        } else {
          setHiba(true);
          setTolt(false);
        }
      } catch (error) {
        console.log(error);
        setHiba(true);
      }
    };

    leToltes();
  }, [siker]);

  // -----------------------------
  const felvitel = async () => {
    if (uzenet.trim() === "") return;

    const biztos = window.confirm(
      `Biztosan el szeretnéd küldeni ezt az üzenetet ${kinekNev}-nak/nek?`
    );

    if (!biztos) return;

    const bemenet = {
      uzenet_iro: 6,
      uzenet_kinek: kinekId,
      uzenet_datum: "2026-01-26",
      uzenet_szoveg: uzenet,
    };

    const response = await fetch(Cim.Cim + "/uzenetFelvitel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bemenet),
    });

    const data = await response.json();

    if (response.ok) {
      setSiker(data.message);
      setUzenet(""); // ✅ textarea ürítése
      Swal.fire("Siker!", "Üzenet elküldve", "success");
    } else {
      Swal.fire("Hiba", data.error, "error");
    }
  };

  // -----------------------------
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // ne legyen új sor
      felvitel();
    }
  };

  // -----------------------------
  const nevKeres = (id, nev, email, bio) => {
    Swal.fire(nev, `${email} <br/> ${bio}`, "info");
  };

  const MegjelenitFuggveny = (felhasznalok_id, felhasznalonev) => {
    setLathato(true);
    setKinekId(felhasznalok_id);
    setKinekNev(felhasznalonev);
  };

  // -----------------------------
  const szurtAdatok = adatok.filter((elem) =>
    elem.felhasznalonev.toLowerCase().includes(nevKereses.toLowerCase())
  );

  if (tolt) return <div>Adatok betöltése folyamatban...</div>;
  if (hiba) return <div>Hiba történt</div>;

  return (
    <div className="bejegyzesekSzerkesztes">
      {/* 🔍 Keresés */}
      <input
        type="text"
        placeholder="Keresés felhasználónévre..."
        value={nevKereses}
        onChange={(e) => setNevKereses(e.target.value)}
        className="search-input"
      />

      <table className="styled-table">
        <thead>
          <tr>
            <th>Felhasználó neve</th>
            <th>Email</th>
            <th>Művelet</th>
          </tr>
        </thead>

        <tbody>
          {szurtAdatok.map((elem, index) => (
            <tr key={index}>
              <td>
                <button
                  className="name-btn"
                  onClick={() =>
                    nevKeres(
                      elem.felhasznalok_id,
                      elem.felhasznalonev,
                      elem.email,
                      elem.bio
                    )
                  }
                >
                  {elem.felhasznalonev}
                </button>
              </td>

              <td>
                <b>{elem.email}</b>
              </td>

              <td>
                <button
                  className="msg-btn"
                  onClick={() =>
                    MegjelenitFuggveny(
                      elem.felhasznalok_id,
                      elem.felhasznalonev
                    )
                  }
                >
                  💬 Üzenet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✉️ ÜZENETKÜLDÉS */}
      {lathato && (
        <div className="message-box slide-in">
          <h5>
            Üzenet küldése: <span>{kinekNev}</span>
          </h5>

          <textarea
            className="form-control"
            rows="4"
            placeholder="Írd ide az üzenetet... (Enter = küldés, Shift+Enter = új sor)"
            value={uzenet}
            onChange={(e) => setUzenet(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="btn btn-primary mt-2" onClick={felvitel}>
            📩 Küldés
          </button>
        </div>
      )}
    </div>
  );
};

export default UzenetKuldes;

import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";
import Swal from "sweetalert2";

const FelhasznaloTorlese = ({ kivalasztott }) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [siker, setSiker] = useState(false);

  // 🔍 NÉV KERESÉS
  const [nevKereses, setNevKereses] = useState("");

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
  const nevKeres = (id, nev, email, bio) => {
    Swal.fire(nev, `${email} <br/> ${bio}`, "info");
  };

  const torlesFuggveny = async (felhasznalok_id, felhasznalonev, email) => {
    const biztos = window.confirm(
      `Biztosan törölni szeretnéd ${felhasznalonev} (${email}) felhasználót?`
    );

    if (biztos) {
      const response = await fetch(
        Cim.Cim + "/FelhasznalokTorlese/" + felhasznalok_id,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setSiker(!siker);
      } else {
        alert(data.error);
      }
    }
  };

  // -----------------------------
  // 🔍 SZŰRÉS FELHASZNÁLÓNÉV ALAPJÁN
  const szurtAdatok = adatok.filter((elem) =>
    elem.felhasznalonev
      .toLowerCase()
      .includes(nevKereses.toLowerCase())
  );
  // -----------------------------

  if (tolt)
    return (
      <div style={{ textAlign: "center" }}>
        Adatok betöltése folyamatban...
      </div>
    );

  if (hiba) return <div>Hiba</div>;

  return (
    <div className="bejegyzesekSzerkesztes">

      {/* 🔍 NÉV KERESŐ */}
      <input
        type="text"
        placeholder="Keresés felhasználónévre..."
        value={nevKereses}
        onChange={(e) => setNevKereses(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <table className="styled-table">
        <thead>
          <tr>
            <th>Felhasználó neve</th>
            <th>Emailek</th>
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
                  className="delete-btn"
                  onClick={() =>
                    torlesFuggveny(
                      elem.felhasznalok_id,
                      elem.felhasznalonev,
                      elem.email
                    )
                  }
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FelhasznaloTorlese;

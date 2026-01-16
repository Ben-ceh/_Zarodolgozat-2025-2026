import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";
import Swal from "sweetalert2";

const BejegyzesTorles = ({ kivalasztott }) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [siker, setSiker] = useState(false);

  // kiemeléshez (tartalom)
  const [inputErtek, setInputErtek] = useState("");
  const [keresettSzo, setKeresettSzo] = useState("");

  // név szerinti keresés
  const [nevKereses, setNevKereses] = useState("");

  // --------------------------------------------------
  // Highlight függvény
  const highlight = (szoveg, keres) => {
    if (!keres) return szoveg;

    const regex = new RegExp(`(${keres})`, "gi");
    return szoveg.replace(
      regex,
      `<mark style="background: yellow; padding: 2px;">$1</mark>`
    );
  };
  // --------------------------------------------------

  const leToltes = async () => {
    try {
      const response = await fetch(Cim.Cim + "/bejegyzesek");
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

  useEffect(() => {
    leToltes();
  }, [siker]);

  const ido = (evHoNap) => evHoNap.split("T")[0];

  const nevKeres = async (felhaszanlok_id, felhasznalonev, email, bio) => {
    Swal.fire(`${felhasznalonev}`, `${email} <br></br> ${bio}`, `info`);
  };

  const torlesFuggveny = async (bejegyzesek_id, tartalom) => {
    const biztos = window.confirm(
      `Biztosan törölni szeretnéd "${tartalom}" bejegyzését?`
    );

    if (biztos) {
      const response = await fetch(
        Cim.Cim + "/bejegyzesekTorlese/" + bejegyzesek_id,
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

  // --------------------------------------------------
  // Szűrés név alapján
  const szurtAdatok = adatok.filter((elem) =>
    elem.felhasznalonev
      .toLowerCase()
      .includes(nevKereses.toLowerCase())
  );
  // --------------------------------------------------

  if (tolt)
    return (
      <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>
    );
  if (hiba) return <div>Hiba történt</div>;

  return (
    <div className="bejegyzesekSzerkesztes">

      {/* ---- NÉV KERESÉS ---- */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Keresés felhasználónévre..."
          value={nevKereses}
          onChange={(e) => setNevKereses(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* ---- TARTALOM KIEMELÉS ---- */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Írj be egy szót a tartalomból..."
          value={inputErtek}
          onChange={(e) => setInputErtek(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => setKeresettSzo(inputErtek)}
          style={{
            padding: "8px 15px",
            background: "#4a90e2",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Kiemelés
        </button>
      </div>

      {/* ---- TÁBLÁZAT ---- */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Felhasználó neve</th>
            <th>Tartalom</th>
            <th>Dátum</th>
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
                      elem.felhaszanlok_id,
                      elem.felhasznalonev,
                      elem.email,
                      elem.bio
                    )
                  }
                  dangerouslySetInnerHTML={{
                    __html: highlight(elem.felhasznalonev, nevKereses),
                  }}
                />
              </td>

              <td
                dangerouslySetInnerHTML={{
                  __html: highlight(elem.tartalom, keresettSzo),
                }}
              ></td>

              <td>
                <b>{ido(elem.letrehozva)}</b>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() =>
                    torlesFuggveny(elem.bejegyzesek_id, elem.tartalom)
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

export default BejegyzesTorles;

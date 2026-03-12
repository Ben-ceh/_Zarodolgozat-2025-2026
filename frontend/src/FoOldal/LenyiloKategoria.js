import { useState, useEffect } from "react";
import "./LenyiloKategoria.css";
import Cim from "../Cim";

const LenyiloKategoria = ({ kivalasztott }) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [aktivKat, setAktivKat] = useState(""); // 🔥 kiválasztott kategória

  useEffect(() => {
    const leToltes = async () => {
      try {
        const response = await fetch(Cim.Cim + "/kategoria/");
        const data = await response.json();

        if (response.ok) {
          setAdatok(data);
          setTolt(false);

          // első kategória automatikus kiválasztása
          // if (data.length > 0) {
          //   setAktivKat(data[0].kategoria_id);
          //   kivalasztott(data[0].kategoria_id);
          // }
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
  }, [kivalasztott]);

  const kezeles = (e) => {
    const id = e.target.value;
    setAktivKat(id);      // saját állapot frissítés
    kivalasztott(id);     // parent értesítés
  };

  if (tolt)
    return (
      <div style={{ textAlign: "center" }}>
        Adatok betöltése folyamatban...
      </div>
    );

  if (hiba)
    return <div>Hiba történt a kategóriák betöltésekor</div>;

  return (
  <div>
    <select
      className="form-select"
      style={{ maxWidth: "200px" }}
      onChange={(e) => kivalasztott(Number(e.target.value))}
      defaultValue={0}
    >
      {/* ÖSSZES */}
      <option value={0}>Összes kategória</option>

      {/* Backend kategóriák */}
      {adatok.map((elem) => (
        <option key={elem.kategoria_id} value={elem.kategoria_id}>
          {elem.kategoria_nev}
        </option>
      ))}
    </select>
  </div>
);
};

export default LenyiloKategoria;

import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";
import Swal from "sweetalert2";

const FelhasznaloTorlese = () => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [siker, setSiker] = useState(false);
  const [nevKereses, setNevKereses] = useState("");

  // Token lekérése a localStorage-ból
  const token = localStorage.getItem("token");

  useEffect(() => {
    const leToltes = async () => {
      try {
        const response = await fetch(Cim.Cim + "/Felhasznalok", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const data = await response.json();

        if (response.ok) {
          setAdatok(data);
          setTolt(false);
        } else {
          setHiba(true);
          setTolt(false);
        }
      } catch (error) {
        console.log("Hiba a letöltéskor:", error);
        setHiba(true);
      }
    };

    leToltes();
  }, [siker, token]);

  const nevKeres = (id, nev, email, bio) => {
    Swal.fire(nev, `${email} <br/> ${bio || "Nincs bio megadva"}`, "info");
  };

  const torlesFuggveny = async (felhasznalok_id, felhasznalonev, email) => {
    const biztos = window.confirm(
      `Biztosan törölni szeretnéd ${felhasznalonev} (${email}) felhasználót?`
    );

    if (biztos) {
      try {
        const response = await fetch(
          `${Cim.Cim}/FelhasznalokTorlese/${felhasznalok_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token // TOKEN HOZZÁADÁSA
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          Swal.fire("Siker!", data.message, "success");
          setSiker(!siker); // Lista frissítése
        } else {
          // Ha az adatbázis nem engedi a törlést (pl. vannak posztjai), itt írjuk ki
          Swal.fire("Posztok és kommentek vannak a felhasználóhoz rendelve.", data.error || "Nem sikerült a törlés", "error");
        }
      } catch (error) {
        console.error("Hálózati hiba:", error);
        Swal.fire("Hiba!", "Hálózati hiba történt.", "error");
      }
    }
  };

  const szurtAdatok = adatok.filter((elem) =>
    elem.felhasznalonev.toLowerCase().includes(nevKereses.toLowerCase())
  );

  if (tolt) return <div style={{ textAlign: "center", padding: "50px" }}>Adatok betöltése...</div>;
  if (hiba) return <div className="alert alert-danger">Hiba történt az adatok lekérésekor.</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Felhasználók kezelése</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Keresés felhasználónévre..."
        value={nevKereses}
        onChange={(e) => setNevKereses(e.target.value)}
        style={{ maxWidth: "300px" }}
      />

      <table className="styled-table w-100">
        <thead>
          <tr>
            <th>Felhasználó neve</th>
            <th>Email cím</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {szurtAdatok.map((elem) => (
            <tr key={elem.felhasznalok_id}>
              <td>
                <button className="name-btn" onClick={() => nevKeres(elem.felhasznalok_id, elem.felhasznalonev, elem.email, elem.bio)}>
                  {elem.felhasznalonev}
                </button>
              </td>
              <td><b>{elem.email}</b></td>
              <td>
                <button className="delete-btn" onClick={() => torlesFuggveny(elem.felhasznalok_id, elem.felhasznalonev, elem.email)}>
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
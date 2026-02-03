
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
  const [kinekNev, setKinekNev] = useState("")
  const [kinekId, setKinekId] = useState("")
  const [uzenet, setUzenet] = useState("")
  
  const [helyes,setHelyes]=useState(true)
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
//------------------------------------

  const felvitel = async () => {
    
    if (uzenet !== ""){
      const biztos = window.confirm(`Biztosan el szeretnéd küldeni ezt az üzenetet ${kinekNev}-nak/nek?`)
    
    if (biztos) {
       //alert("ok")

        const bemenet={
                    "uzenet_iro":6,
                    "uzenet_kinek":kinekId,
                    "uzenet_datum":"2026-01-26",
                    "uzenet_szoveg":uzenet,
                }

        const response=await fetch(Cim.Cim+"/uzenetFelvitel", {
                          method: "post",
                          headers: {
                               "Content-Type": "application/json"
                            },
                            body: JSON.stringify(bemenet)
                        })

        const data = await response.json()

                if (response.ok) {
                        setSiker(data["message"])
                        setHelyes(true)
                } else {
                        setSiker(data["error"])
                }
         }
         }
    
  }

  // -----------------------------
  const nevKeres = (id, nev, email, bio) => {
    Swal.fire(nev, `${email} <br/> ${bio}`, "info");
  };

  const MegjelenitFuggveny=(felhasznalok_id,felhasznalonev)=>{
    //alert(felhasznalok_id)
    setLathato(true)
    setKinekId(felhasznalok_id)
    setKinekNev(felhasznalonev)
  }

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
      <br/>
      {lathato === true && (
  <div className="message-box">
    <h5>Üzenet küldése neki: <span>{kinekNev}</span></h5>

    <input
      type="text"
      className="form-control"
      placeholder="Írd ide az üzenetet..."
      onChange={(e) => setUzenet(e.target.value)}
    />

    <button
      type="button"
      className="btn btn-primary mt-2"
      onClick={() => felvitel()}
    >
      📩 Küldés
    </button>
  </div>
)}

    </div>
  );
};

export default UzenetKuldes;

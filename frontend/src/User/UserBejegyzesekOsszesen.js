// BejegyzesekOsszesen.jsx
import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";
import "./Userfeed.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import UserLenyiloKategoria from "./UserLenyiloKategoria";

const UserBejegyzesekOsszesen = ({userid,belepUserid}) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [expanded1, setExpanded1] = useState({});
  const [expanded2, setExpanded2] = useState({});
  const [kommentek, setKommentek] = useState({});
  const [loadingKomment, setLoadingKomment] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [kivalasztott,setKivalasztott]=useState(0)


  const formatRelativeTime = (iso) => {
    const now = new Date();
    const date = new Date(iso);
    const diff = (now - date) / 1000;
    if (diff < 60) return "egy perce";
    if (diff < 3600) return `${Math.floor(diff / 60)} perce`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} órája`;
    if (diff < 172800) return "tegnap";
    return `${Math.floor(diff / 86400)} napja`;
  };

  const formatExactDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const leToltes = async () => {

      // alert(kivalasztott)

      if(kivalasztott===0){
try {
        const response = await fetch(Cim.Cim + "/bejegyEsFelhKategoria",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "kategoria_id":kivalasztott })});
        const data = await response.json();
        if (response.ok) {
          setAdatok(data);
          setTolt(false);
        } else {
          setHiba(true);
          setTolt(false);
        }
      } catch (error) {
        console.error(error);
        setHiba(true);
      }
      }else{
        try {
        const response = await fetch(Cim.Cim + "/bejegyEsFelhKategoria",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "kategoria_id":kivalasztott }),
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
        console.error(error);
        setHiba(true);
      }
      }
      


    };
    leToltes();
  }, [kivalasztott,userid]);



  const formatDate = (mysqlDate) =>
    mysqlDate ? mysqlDate.split("T")[0] : "";

  const toggleExpand1 = (index) => {
    setExpanded1((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const refreshKomentek = async (bejegyzesek_id) => {
    try {
      const res = await fetch(`${Cim.Cim}/kommentKeresBejegyId`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bejegyzesek_id }),
      });
      const data = await res.json();
      if (res.ok) {
        setKommentek((prev) => ({ ...prev, [bejegyzesek_id]: data }));
      }
    } catch (err) {
      console.error("Hiba frissítéskor:", err);
    }
  };

  const komment = async (index, bejegyzesek_id) => {

    

    setExpanded2((prev) => ({ ...prev, [index]: !prev[index] }));
    const isOpening = !expanded2[index];
    if (isOpening && !kommentek[bejegyzesek_id]) {
      setLoadingKomment((prev) => ({ ...prev, [bejegyzesek_id]: true }));
      try {
        const res = await fetch(`${Cim.Cim}/kommentKeresBejegyId`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bejegyzesek_id }),
        });
        const data = await res.json();
        if (res.ok) {
          setKommentek((prev) => ({ ...prev, [bejegyzesek_id]: data }));
        } else {
          setKommentek((prev) => ({ ...prev, [bejegyzesek_id]: [] }));
        }
      } catch (err) {
        console.error("Hálózati hiba:", err);
        setKommentek((prev) => ({ ...prev, [bejegyzesek_id]: [] }));
      } finally {
        setLoadingKomment((prev) => ({ ...prev, [bejegyzesek_id]: false }));
      }
    }
  };

  const onCommentInputChange = (bejegyzesId, value) => {
    setCommentInputs((prev) => ({ ...prev, [bejegyzesId]: value }));
  };

  const submitComment = async (bejegyzesek_id) => {
    const szoveg = (commentInputs[bejegyzesek_id] || "").trim();
    //If--------------------------- Ha nincs bejelenkezve akkor irjon ki egy uzenetet // else felvitel
    
    
    const now = new Date();
    const offsetDate = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    );
    const letrehozva = offsetDate.toISOString().slice(0, 19);

    try {
      const res = await fetch(`${Cim.Cim}/hozzaszolasFelv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bejegyzes_id: bejegyzesek_id,
          felhasznalo_id: belepUserid,
          hozzaszolas_szoveg: szoveg,
          letrehozva,
        }),
      });
      if (res.ok) {
        setCommentInputs((prev) => ({ ...prev, [bejegyzesek_id]: "" }));
        refreshKomentek(bejegyzesek_id);
      }
    } catch (err) {
      console.error("Hiba komment küldésekor:", err);
    }
  };

  if (tolt) return <div style={{ textAlign: "center" }}>Adatok betöltése...</div>;
  if (hiba) return <div>Hiba történt</div>;

  return (
    <div className="card mb-3 p-3">
  <div className="d-flex gap-3 flex-wrap">

    {/* Category filter */}
    <UserLenyiloKategoria kivalasztott={setKivalasztott}/>

    {/* <select
      className="form-select"
      style={{ maxWidth: "200px" }}
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="all">Összes</option>
      <option value="road"> Közlekedés</option>
      <option value="news"> Események </option>
      <option value="alert"> Veszélyhelyzetek</option>
      <option value="lostItems"> Elveszett tárgyak</option>
      <option value="localNews">Helyi hírek </option> 
    </select> */}

    

 
      {adatok.filter((elem) => {
      const categoryOk =
      selectedCategory === "all" ||
      elem.kategoria_nev === selectedCategory;

    const groupOk =
      selectedGroup === "all" ||
      elem.csoport_nev === selectedGroup;

    return categoryOk && groupOk; 
  })
  .map((elem, index) => (
        <div key={elem.bejegyzesek_id} className="bejegyzesKartya">

          {/* HEADER */}
          <div className="post-header">
            <img
              className="profilKep"
              src={
                elem.profil_kep
                  ? `${Cim.Cim}/kepekFelhasznalo/${elem.profil_kep}`
                  : elem.neme === 1
                  ? `${Cim.Cim}/kepekFelhasznalo/M.jpg`
                  : `${Cim.Cim}/kepekFelhasznalo/F.jpg`
              }
              alt=""
            />

            <div>
              <strong>{elem.felhasznalonev}</strong>
              <div className="post-meta">
                {formatDate(elem.letrehozva)} · {elem.telepules_nev}
                <br />
          <span className="badge bg-warning ms-2">
            {elem.kategoria_nev}
          </span>
          
              </div>
            </div>
          </div>

          {/* TITLE */}
          
          <h2 className="bejegyzesCim">{elem.cim}</h2>
              
          {/* IMAGE */}
          <div className="post-image">
            <img
              src={
                elem.kep_url
                  ? `${Cim.Cim}/bejegyzesKepek/${elem.kep_url}`
                  : `${Cim.Cim}/bejegyzesKepek/X.png`
              }
              alt=""
            />
          </div>

          {/* CONTENT */}
          <p className="bejegyzesTartalom">
            {expanded1[index]
              ? elem.tartalom
              : elem.tartalom.slice(0, 100)}
            {!expanded1[index] && elem.tartalom.length > 100 && "..."}
          </p>

          <div className="post-actions">
  <button
    className="action-btn"
    onClick={() => toggleExpand1(index)}
  >
    {expanded1[index] ? "Kevesebb" : "Tovább"}
  </button>

  <button
    className="action-btn"
    onClick={() => komment(index, elem.bejegyzesek_id)}
  >
    💬 Kommentek
  </button>
</div>


          {/* COMMENTS */}
          <div className="mt-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => komment(index, elem.bejegyzesek_id)}
              
            >
              {expanded2[index] ? "Bezár" : "Kommentek"}
            </button>

            {expanded2[index] && (
            <div className="comments-box">
                {loadingKomment[elem.bejegyzesek_id] ? (
                  <div>Kommentek betöltése...</div>
                ) : (
                  kommentek[elem.bejegyzesek_id]?.map((k, i) => (
                    <div key={i} className="d-flex mb-2">
                      <img
                        className="profilKepKomment"
                        src={
                          k.profil_kep
                            ? `${Cim.Cim}/kepekFelhasznalo/${k.profil_kep}`
                            : k.neme === 1
                            ? `${Cim.Cim}/kepekFelhasznalo/M.jpg`
                            : `${Cim.Cim}/kepekFelhasznalo/F.jpg`
                        }
                        alt=""
                      />
                      <div className="ms-2">
                        <strong>{k.felhasznalonev}</strong>
                        <div>{k.hozzaszolas_szoveg}</div>
                        <div
                          className="text-muted"
                          title={formatExactDate(k.letrehozva)}
                          style={{ fontSize: "12px" }}
                        >
                          {formatRelativeTime(k.letrehozva)}
                        </div>
                      </div>
                    </div>
                  ))
                )}

                <textarea
                  className="form-control mt-2"
                  rows={2}
                  placeholder="Írj egy hozzászólást..."
                  value={commentInputs[elem.bejegyzesek_id] || ""}
                  
                  onChange={(e) =>
                    onCommentInputChange(
                      elem.bejegyzesek_id,
                      e.target.value
                    )
                  }
                />

                <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => submitComment(elem.bejegyzesek_id)}
                >
                  Küldés
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
     </div>

  );
};

export default UserBejegyzesekOsszesen;

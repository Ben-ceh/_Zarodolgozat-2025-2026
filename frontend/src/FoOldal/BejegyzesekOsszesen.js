import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";
import "./feed.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import LenyiloKategoria from "./LenyiloKategoria";
// Ikonok importálása az új dizájnhoz
import { MessageCircle, MapPin, Tag, Users, Send } from "lucide-react";

const BejegyzesekOsszesen = () => {
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
  const [kivalasztott, setKivalasztott] = useState(0);

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
      if (kivalasztott === 0) {
        try {
          const response = await fetch(Cim.Cim + "/bejegyEsFelh");
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
      } else {
        try {
          const response = await fetch(Cim.Cim + "/bejegyEsFelhKategoria", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ kategoria_id: kivalasztott }),
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
  }, [kivalasztott]);

  const CommentingWithOutALogin = (szoveg) => {
    Swal.fire({
      title: szoveg,
      html: 'Ismeretlenként tudsz kommentelni, kérlek légy tiszteletteljes.<br><br>Kérlek jelentkezz be <a href="/login">itt</a>, ha saját néven szeretnél írni.',
      icon: 'info'
    });
  };

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
      if (res.ok) setKommentek((prev) => ({ ...prev, [bejegyzesek_id]: data }));
    } catch (err) {
      console.error("Hiba frissítéskor:", err);
    }
  };

  const komment = async (index, bejegyzesek_id) => {
    const isOpening = !expanded2[index];
    setExpanded2((prev) => ({ ...prev, [index]: isOpening }));
    
    // Csak kinyitáskor szólunk neki, bezáráskor ne ugráljon fel az ablak
    if (isOpening) {
        CommentingWithOutALogin("Nem vagy bejelentkezve!");
    }

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
    if (!szoveg) return;

    const now = new Date();
    const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    const letrehozva = offsetDate.toISOString().slice(0, 19);

    try {
      const res = await fetch(`${Cim.Cim}/hozzaszolasFelv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bejegyzes_id: bejegyzesek_id,
          felhasznalo_id: 5, // A vendég azonosítója a backendben
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

  if (tolt) return <div style={{ textAlign: "center", marginTop: "50px" }}>Adatok betöltése...</div>;
  if (hiba) return <div className="text-danger text-center mt-5">Hiba történt az adatok betöltésekor.</div>;

  return (
    <div className="feed-wrapper">
      <h2 className="mb-4" style={{ fontWeight: 800, color: '#0f1419' }}>Általános Hírfolyam</h2>
      
      <div className="mb-4">
        <LenyiloKategoria kivalasztott={setKivalasztott}/>
      </div>
 
      {adatok.filter((elem) => {
        const categoryOk = selectedCategory === "all" || elem.kategoria_nev === selectedCategory;
        const groupOk = selectedGroup === "all" || elem.csoport_nev === selectedGroup;
        return categoryOk && groupOk; 
      }).map((elem, index) => (
        <div key={elem.bejegyzesek_id} className="post-card">
          <div className="post-layout">
            {/* BAL OSZLOP: Profilkép */}
            <div className="post-avatar-col">
              <img 
                src={elem.profil_kep ? `${Cim.Cim}/kepek/${elem.profil_kep}` : `${Cim.Cim}/kepekFelhasznalo/${elem.neme === 1 ? 'M.jpg' : 'F.jpg'}`} 
                className="post-avatar" alt="avatar" 
              />
            </div>
            
            {/* JOBB OSZLOP: Tartalom */}
            <div className="post-main-col">
              <div className="post-header-info">
                <span className="user-name">{elem.felhasznalonev}</span>
                <span className="post-meta"> · {formatRelativeTime(elem.letrehozva)}</span>
                <div className="post-badges">
                   <span className="badge-item"><Tag size={12}/> {elem.kategoria_nev}</span>
                   {/* Itt alapból az Általános csoportot írjuk ki, hiszen a vendégek csak ezt látják */}
                   <span className="badge-item"><Users size={12}/> {elem.csoport_nev || "Általános"}</span>
                </div>
              </div>

              <h4 className="post-title">{elem.cim}</h4>
              <p className="post-text">
                {expanded1[index] ? elem.tartalom : `${elem.tartalom.slice(0, 150)}${elem.tartalom.length > 150 ? '...' : ''}`}
                {elem.tartalom.length > 150 && (
                  <button className="text-btn" onClick={() => toggleExpand1(index)}>
                    {expanded1[index] ? " Kevesebb" : " Mutass többet"}
                  </button>
                )}
              </p>

              {elem.kep_url && (
                <div className="post-media">
                  <img src={`${Cim.Cim}/kepek/${elem.kep_url}`} alt="poszt kép" />
                </div>
              )}

              {/* LÁBLÉC: Helyszín és CSAK Komment gomb */}
              <div className="post-footer">
                <div className="post-location"><MapPin size={14}/> {elem.telepules_nev}</div>
                
                <div className="post-actions-wrapper">
                    <button className="action-btn comment-trigger" onClick={() => komment(index, elem.bejegyzesek_id)}>
                        <MessageCircle size={18} /> 
                        <span>Kommentek</span>
                    </button>
                </div>
              </div>

              {/* KOMMENTEK SZEKCIÓ */}
              {expanded2[index] && (
              <div className="comment-section-wrapper">
                <div className="comment-list">
                  {loadingKomment[elem.bejegyzesek_id] ? (
                    <div className="comment-loading">
                      <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                    </div>
                  ) : (
                    Array.isArray(kommentek[elem.bejegyzesek_id]) && kommentek[elem.bejegyzesek_id].length > 0 ? (
                      kommentek[elem.bejegyzesek_id].map((k, i) => (
                        <div key={i} className="comment-item">
                          <img
                            className="c-avatar-small"
                            src={k.profil_kep ? `${Cim.Cim}/kepek/${k.profil_kep}` : `${Cim.Cim}/kepekFelhasznalo/${k.neme === 1 ? 'M.jpg' : 'F.jpg'}`}
                            alt=""
                          />
                          <div className="comment-bubble">
                            <div className="c-user-name">{k.felhasznalonev}</div>
                            <div className="c-text">{k.hozzaszolas_szoveg}</div>
                            <div className="c-time" title={formatExactDate(k.letrehozva)}>
                              {formatRelativeTime(k.letrehozva)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted small py-2">
                        Még nincs hozzászólás. Legyél te az első!
                      </div>
                    )
                  )}
                </div>

                {/* BEVITELI MEZŐ (Vendégként) */}
                <div className="comment-input-container">
                  <img 
                    className="c-avatar-tiny" 
                    src={`${Cim.Cim}/kepekFelhasznalo/M.jpg`} 
                    title="Ismeretlen felhasználó"
                    alt="Guest" 
                  />
                  <div className="input-with-button">
                    <input
                      type="text"
                      placeholder="Írj egy hozzászólást vendégként..."
                      value={commentInputs[elem.bejegyzesek_id] || ""}
                      onChange={(e) => onCommentInputChange(elem.bejegyzesek_id, e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitComment(elem.bejegyzesek_id)}
                    />
                    <button 
                      className="c-send-btn" 
                      onClick={() => submitComment(elem.bejegyzesek_id)}
                      disabled={!(commentInputs[elem.bejegyzesek_id] || "").trim()}
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BejegyzesekOsszesen;
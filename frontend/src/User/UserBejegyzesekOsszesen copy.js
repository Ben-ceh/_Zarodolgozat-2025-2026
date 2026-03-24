import { useState, useEffect } from "react";
import Cim from "../Cim";
import "./Userfeed.css"; 
import Swal from "sweetalert2";
import UserLenyiloKategoria from "./UserLenyiloKategoria";
import UserBejegyFelv from "./UserBejegyFelv"; // Importáltam a posztolót
import { MessageCircle, MapPin, Tag, Users } from "lucide-react";

const UserBejegyzesekOsszesen = ({ userid, belepUserid }) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [expanded1, setExpanded1] = useState({});
  const [expanded2, setExpanded2] = useState({});
  const [kommentek, setKommentek] = useState({});
  const [loadingKomment, setLoadingKomment] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [kivalasztott, setKivalasztott] = useState(0);

  // --- LOGIKA MEGMARADT ---
  const formatRelativeTime = (iso) => {
    const now = new Date();
    const date = new Date(iso);
    const diff = (now - date) / 1000;
    if (diff < 60) return "most";
    if (diff < 3600) return `${Math.floor(diff / 60)}p`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}ó`;
    return `${Math.floor(diff / 86400)}n`;
  };

  const betoltes = async () => {
    try {
      const url = kivalasztott === 0 
        ? `${Cim.Cim}/csoportjaimBejegyzesei/${belepUserid}` 
        : `${Cim.Cim}/bejegyEsFelhKategoria`;
      
      const options = kivalasztott === 0 ? {} : {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "kategoria_id": kivalasztott }),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) { setAdatok(data); setTolt(false); }
    } catch (error) { setHiba(true); setTolt(false); }
  };

  useEffect(() => { betoltes(); }, [kivalasztott, userid]);

  const kommentBetoltes = async (index, bejegyId) => {
    setExpanded2(prev => ({ ...prev, [index]: !prev[index] }));
    if (!expanded2[index]) {
      setLoadingKomment(prev => ({ ...prev, [bejegyId]: true }));
      const res = await fetch(`${Cim.Cim}/kommentKeresBejegyId`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bejegyzesek_id: bejegyId }),
      });
      const data = await res.json();
      setKommentek(prev => ({ ...prev, [bejegyId]: data }));
      setLoadingKomment(prev => ({ ...prev, [bejegyId]: false }));
    }
  };

  const submitComment = async (bejegyId) => {
    const szoveg = (commentInputs[bejegyId] || "").trim();
    if (!szoveg) return;
    const res = await fetch(`${Cim.Cim}/hozzaszolasFelv`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bejegyzes_id: bejegyId,
        felhasznalo_id: belepUserid,
        hozzaszolas_szoveg: szoveg,
        letrehozva: new Date().toISOString().slice(0, 19),
      }),
    });
    if (res.ok) {
      setCommentInputs(prev => ({ ...prev, [bejegyId]: "" }));
      kommentBetoltes(null, bejegyId); // Frissítés
    }
  };

  if (tolt) return <div className="text-center p-5">Betöltés...</div>;

  return (
    <div className="user-feed-wrapper">
      {/* 1. Posztoló rész felül */}
      <UserBejegyFelv onSuccess={betoltes} />

      <div className="feed-divider-title">
        <h3>Csoportjaim bejegyzései</h3>
        <UserLenyiloKategoria kivalasztott={setKivalasztott} />
      </div>

      {/* 2. Bejegyzések listája */}
      {adatok.map((elem, index) => (
        <div key={elem.bejegyzesek_id} className="post-card">
          <div className="post-layout">
            <div className="post-avatar-col">
              <img 
                src={elem.profil_kep ? `${Cim.Cim}/kepek/${elem.profil_kep}` : `${Cim.Cim}/kepekFelhasznalo/${elem.neme === 1 ? 'M.jpg' : 'F.jpg'}`} 
                className="post-avatar" alt="avatar" 
              />
            </div>
            <div className="post-main-col">
              <div className="post-header-info">
                <span className="user-name">{elem.felhasznalonev}</span>
                <span className="post-meta"> · {formatRelativeTime(elem.letrehozva)}</span>
                <div className="post-badges">
                   <span className="badge-item"><Tag size={12}/> {elem.kategoria_nev}</span>
                   <span className="badge-item"><Users size={12}/> {elem.csoport_nev}</span>
                </div>
              </div>

              <h4 className="post-title">{elem.cim}</h4>
              <p className="post-text">
                {expanded1[index] ? elem.tartalom : `${elem.tartalom.slice(0, 150)}${elem.tartalom.length > 150 ? '...' : ''}`}
                {elem.tartalom.length > 150 && (
                  <button className="text-btn" onClick={() => setExpanded1(p => ({...p, [index]: !p[index]}))}>
                    {expanded1[index] ? " Kevesebb" : " Mutass többet"}
                  </button>
                )}
              </p>

              {elem.kep_url && (
                <div className="post-media">
                  <img src={`${Cim.Cim}/kepek/${elem.kep_url}`} alt="poszt kép" />
                </div>
              )}

              <div className="post-footer">
                <div className="post-location"><MapPin size={14}/> {elem.telepules_nev}</div>
                <button className="action-btn" onClick={() => kommentBetoltes(index, elem.bejegyzesek_id)}>
                  <MessageCircle size={18} /> <span>Kommentek</span>
                </button>
              </div>

              {/* Kommentek rész */}
              {expanded2[index] && (
                <div className="comment-section">
                   {loadingKomment[elem.bejegyzesek_id] ? "Betöltés..." : (
                     kommentek[elem.bejegyzesek_id]?.map((k, i) => (
                       <div key={i} className="comment-item">
                         <img src={k.profil_kep ? `${Cim.Cim}/kepekFelhasznalo/${k.profil_kep}` : `${Cim.Cim}/kepekFelhasznalo/${k.neme === 1 ? 'M.jpg' : 'F.jpg'}`} className="c-avatar" alt="" />
                         <div className="c-body">
                            <strong>{k.felhasznalonev}</strong>
                            <p>{k.hozzaszolas_szoveg}</p>
                         </div>
                       </div>
                     ))
                   )}
                   <div className="c-input-wrapper">
                      <input 
                        placeholder="Írj egy kommentet..." 
                        value={commentInputs[elem.bejegyzesek_id] || ""}
                        onChange={(e) => setCommentInputs(p => ({...p, [elem.bejegyzesek_id]: e.target.value}))}
                      />
                      <button onClick={() => submitComment(elem.bejegyzesek_id)}>Küldés</button>
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

export default UserBejegyzesekOsszesen;
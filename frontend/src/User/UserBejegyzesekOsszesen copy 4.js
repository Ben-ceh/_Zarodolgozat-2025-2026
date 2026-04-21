import { useState, useEffect } from "react";
import Cim from "../Cim";
import "./Userfeed.css"; 
import Swal from "sweetalert2";
import UserBejegyFelv from "./UserBejegyFelv"; 
import { MessageCircle, MapPin, Tag, Users, Send, Heart } from "lucide-react";

const UserBejegyzesekOsszesen = ({ userid, belepUserid }) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [expanded1, setExpanded1] = useState({});
  const [expanded2, setExpanded2] = useState({});
  const [kommentek, setKommentek] = useState({});
  const [loadingKomment, setLoadingKomment] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [kivalasztott, setKivalasztott] = useState(0); // Megtartva, ha később mégis kellene szűrésre
  const [userLikes, setUserLikes] = useState({}); // Formátum: { bejegy_id: true/false }

  // --- IDŐ FORMÁZÁSOK ---
  const formatRelativeTime = (iso) => {
    if (!iso) return "";
    const now = new Date();
    const date = new Date(iso);
    const diff = (now - date) / 1000;
    if (diff < 60) return "most";
    if (diff < 3600) return `${Math.floor(diff / 60)}p`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}ó`;
    return `${Math.floor(diff / 86400)}n`;
  };

  const formatExactDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleString("hu-HU");
  };

  const onCommentInputChange = (bejegyId, value) => {
    setCommentInputs(prev => ({ ...prev, [bejegyId]: value }));
  };

  // --- ADATOK ÉS LÁJKOK BETÖLTÉSE (KÜLÖN) ---
  const betoltes = async () => {
    try {
      setTolt(true);
      
      // 1. Posztok lekérése
      const posztUrl = `${Cim.Cim}/csoportjaimBejegyzesei/${belepUserid}`;
      const posztRes = await fetch(posztUrl);
      const posztData = await posztRes.json();

      // 2. Saját lájkok lekérése (külön végpontról)
      const likeRes = await fetch(`${Cim.Cim}/sajatLikeok/${belepUserid}`);
      const likedIds = await likeRes.json(); // Elvárás: [12, 45, 67] típusú tömb

      if (posztRes.ok) {
        setAdatok(posztData);

        // Lájk állapotok beállítása a kapott ID-k alapján
        const likeMap = {};
        if (Array.isArray(likedIds)) {
          likedIds.forEach(id => {
            likeMap[id] = true;
          });
        }
        setUserLikes(likeMap);
        
        setTolt(false);
      }
    } catch (error) {
      console.error("Hiba a betöltés során:", error);
      setHiba(true);
      setTolt(false);
    }
  };

  useEffect(() => { 
    betoltes(); 
  }, [belepUserid]); // Frissítés, ha a user változik

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
      kommentBetoltes(null, bejegyId);
    }
  };

  // --- LÁJK KEZELÉSE ---
  const handleLike = async (bejegyId) => {
    const isCurrentlyLiked = !!userLikes[bejegyId];

    // Azonnali UI frissítés (Optimistic update)
    setUserLikes(prev => ({
      ...prev,
      [bejegyId]: !isCurrentlyLiked
    }));

    try {
      const res = await fetch(`${Cim.Cim}/reakcioKezeles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bejegyzes_id: bejegyId,
          felhasznalo_id: belepUserid,
          reakcio: 1 // A te rendszeredben ez a lájk
        }),
      });

      if (!res.ok) {
        // Ha hiba történt a szerveren, visszacsináljuk a szívecskét
        setUserLikes(prev => ({
          ...prev,
          [bejegyId]: isCurrentlyLiked
        }));
        Swal.fire("Hiba", "Nem sikerült a művelet", "error");
      }
    } catch (error) {
      console.error("Lájk hiba:", error);
      setUserLikes(prev => ({ ...prev, [bejegyId]: isCurrentlyLiked }));
    }
  };

  if (tolt) return <div className="text-center p-5">Betöltés...</div>;
  if (hiba) return <div className="text-center p-5 text-danger">Hiba történt az adatok betöltésekor.</div>;

  return (
    <div className="user-feed-wrapper">
      <UserBejegyFelv onSuccess={betoltes} />

      <div className="feed-divider-title">
        <h3>Bejegyzések:</h3>
      </div>

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
                <div className="post-location">
                  <MapPin size={14}/> {elem.telepules_nev}
                </div>
              
                <div className="post-actions-wrapper">
                  <button 
                      className={`action-btn like-btn ${userLikes[elem.bejegyzesek_id] ? 'active' : ''}`} 
                      onClick={() => handleLike(elem.bejegyzesek_id)}
                  >
                      <Heart 
                          size={18} 
                          fill={userLikes[elem.bejegyzesek_id] ? "#f91880" : "none"} 
                          color={userLikes[elem.bejegyzesek_id] ? "#f91880" : "currentColor"}
                      />
                      <span>{userLikes[elem.bejegyzesek_id] ? "Tetszik" : "Tetszik"}</span>
                  </button>

                  <button className="action-btn comment-trigger" onClick={() => kommentBetoltes(index, elem.bejegyzesek_id)}>
                      <MessageCircle size={18} /> 
                      <span>Kommentek</span>
                  </button>
                </div>
              </div>

              {expanded2[index] && (
                <div className="comment-section-wrapper">
                  <div className="comment-list">
                    {loadingKomment[elem.bejegyzesek_id] ? (
                      <div className="comment-loading">
                        <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                        <span> Kommentek betöltése...</span>
                      </div>
                    ) : (
                      Array.isArray(kommentek[elem.bejegyzesek_id]) && kommentek[elem.bejegyzesek_id].length > 0 ? (
                        kommentek[elem.bejegyzesek_id].map((k, i) => (
                          <div key={i} className="comment-item">
                            <img
                              className="c-avatar-small"
                              src={k.profil_kep 
                                ? `${Cim.Cim}/kepek/${k.profil_kep}` 
                                : `${Cim.Cim}/kepekFelhasznalo/${k.neme === 1 ? 'M.jpg' : 'F.jpg'}`}
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
                          Még nincs hozzászólás.
                        </div>
                      )
                    )}
                  </div>

                  <div className="comment-input-container">
                    <div className="input-with-button">
                      <input
                        type="text"
                        placeholder="Írj egy hozzászólást..."
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

export default UserBejegyzesekOsszesen;
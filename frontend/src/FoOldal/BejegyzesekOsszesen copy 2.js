// BejegyzesekOsszesen.jsx
import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const BejegyzesekOsszesen = () => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [expanded1, setExpanded1] = useState({});
  const [expanded2, setExpanded2] = useState({});
  const [kommentek, setKommentek] = useState({});
  const [loadingKomment, setLoadingKomment] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  // 🔧 Relatív idő formázó
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

  // 🕒 Pontos idő formázó (tooltip)
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
    };
    leToltes();
  }, []);

  const formatDate = (mysqlDate) => (mysqlDate ? mysqlDate.split("T")[0] : "");

  const toggleExpand1 = (index) => {
    setExpanded1((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // ⭐ Külön függvény kommentek újratöltésére
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
    if (!szoveg) return;

    const now = new Date();
    const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    const letrehozva = offsetDate.toISOString().slice(0, 19);

    const bemenet = {
      bejegyzes_id: bejegyzesek_id,
      felhasznalo_id: 2,
      hozzaszolas_szoveg: szoveg,
      letrehozva: letrehozva,
    };

    try {
      const res = await fetch(`${Cim.Cim}/hozzaszolasFelv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bemenet),
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
  <div className="layout">
    <main className="feed">
      {adatok.map((elem, index) => (
        <div className="post-card" key={elem.bejegyzesek_id}>

          {/* ===== FEJLÉC ===== */}
          <div className="post-header">
            {/* Avatar */}
            {elem.profil_kep == null && elem.neme === 1 && (
              <img className="avatar" src={`${Cim.Cim}/kepekFelhasznalo/M.jpg`} alt="" />
            )}
            {elem.profil_kep == null && elem.neme === 2 && (
              <img className="avatar" src={`${Cim.Cim}/kepekFelhasznalo/F.jpg`} alt="" />
            )}
            {elem.profil_kep != null && (
              <img className="avatar" src={`${Cim.Cim}/kepekFelhasznalo/${elem.profil_kep}`} alt="" />
            )}

            {/* Név + hely + idő */}
            <div className="post-user">
              <strong>{elem.felhasznalonev}</strong>
              <div className="post-meta">
                📍 {elem.telepules_nev ?? elem.helyszin} ·{" "}
                {formatRelativeTime(elem.letrehozva)}
              </div>
            </div>

            {/* Kategória badge */}
            {elem.kategoria_nev && (
              <span className={`badge ${elem.kategoria_nev.toLowerCase()}`}>
                {elem.kategoria_nev}
              </span>
            )}
          </div>

          {/* ===== TARTALOM ===== */}
          <div className="post-content">
            <p>
              {expanded1[index]
                ? elem.tartalom
                : elem.tartalom.slice(0, 150)}
              {!expanded1[index] && elem.tartalom.length > 150 && "…"}
            </p>

            {elem.tartalom.length > 150 && (
              <button
                className="btn btn-link btn-sm"
                onClick={() => toggleExpand1(index)}
              >
                {expanded1[index] ? "Kevesebb" : "Tovább"}
              </button>
            )}
          </div>

          {/* ===== KÉP ===== */}
          {elem.kep_url && (
            <img
              className="post-image"
              src={`${Cim.Cim}/bejegyzesKepek/${elem.kep_url}`}
              alt=""
            />
          )}

          {/* ===== STATISZTIKA ===== */}
          <div className="post-stats">
            <span>{elem.like_db ?? 0} kedvelés</span>
            <span>{elem.komment_db ?? 0} hozzászólás</span>
          </div>

          {/* ===== AKCIÓK ===== */}
          <div className="post-actions">
            <button >❤️ Tetszik</button>
            <button onClick={() => komment(index, elem.bejegyzesek_id)}>
              💬 Hozzászólás
            </button>
            <button>🔁 Megosztás</button>
          </div>

          {/* ===== KOMMENTEK ===== */}
          {expanded2[index] && (
            <div className="comments-box">
              {loadingKomment[elem.bejegyzesek_id] ? (
                <div>Kommentek betöltése…</div>
              ) : kommentek[elem.bejegyzesek_id]?.length > 0 ? (
                kommentek[elem.bejegyzesek_id].map((k, i2) => (
                  <div key={i2} className="comment">
                    <strong>{k.felhasznalonev}</strong>
                    <div>{k.hozzaszolas_szoveg}</div>
                    <small title={formatExactDate(k.letrehozva)}>
                      {formatRelativeTime(k.letrehozva)}
                    </small>
                  </div>
                ))
              ) : (
                <div>Nincs még komment.</div>
              )}

              {/* Komment írás */}
              <textarea
                className="form-control mt-2"
                rows={2}
                placeholder="Írj egy hozzászólást..."
                value={commentInputs[elem.bejegyzesek_id] || ""}
                onChange={(e) =>
                  onCommentInputChange(elem.bejegyzesek_id, e.target.value)
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
      ))}
    </main>
  </div>
);

};

export default BejegyzesekOsszesen;

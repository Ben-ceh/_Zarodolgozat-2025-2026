// BejegyzesekOsszesen.jsx
import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CsoportBejegyzes = ({kivalasztott,userid,belepUserid}) => {
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
    // alert(userid)
    
    const leToltes = async () => {
      try {
        // alert(userid)
        let bemenet={
                "kivalasztott":kivalasztott
            }
        const response = await fetch(Cim.Cim + "/bejegyKeresCs/"+userid,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bemenet)});
        const data = await response.json();
        if (response.ok) {
          // alert(JSON.stringify(data))
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
  }, [kivalasztott,userid]);

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
      felhasznalo_id: belepUserid,
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
    <div>
      {adatok.map((elem, index) => (
        <div key={elem.bejegyzesek_id}>
          <div className="bejegyzesKartya">
            <div>
              <h4>
                {elem.profil_kep == null && elem.neme === 1 && (
                  <img className="profilKep" src={`${Cim.Cim}/kepekFelhasznalo/M.jpg`} alt="" />
                )}
                {elem.profil_kep == null && elem.neme === 2 && (
                  <img className="profilKep" src={`${Cim.Cim}/kepekFelhasznalo/F.jpg`} alt="" />
                )}
                {elem.profil_kep != null && (
                  <img className="profilKep" src={`${Cim.Cim}/kepekFelhasznalo/${elem.profil_kep}`} alt="" />
                )}
                {elem.felhasznalonev}
              </h4>

              <h1 className="bejegyzesCim">{elem.cim}</h1>

              <div className="kozep">
                {elem.kep_url != null ? (
                  <img className="card-img-top bejegyzesKepek" src={`${Cim.Cim}/bejegyzesKepek/${elem.kep_url}`} alt="" />
                ) : (
                  <img className="card-img-top bejegyzesKepek" src={`${Cim.Cim}/bejegyzesKepek/X.png`} alt="" />
                )}
              </div>

              <p className="text-secondary" style={{ textAlign: "center" }}>
                {formatDate(elem.letrehozva)} 🗺 {elem.helyszin}
              </p>

              <p className="bejegyzesTartalom">
                {expanded1[index] ? elem.tartalom : elem.tartalom.slice(0, 100)}
                {!expanded1[index] && elem.tartalom.length > 100 && "..."}
              </p>

              {elem.tartalom.length > 100 && (
                <button
                  className="btn btn-primary btn-sm bejegyzesGomb"
                  onClick={() => toggleExpand1(index)}
                >
                  {expanded1[index] ? "Kevesebb" : "Tovább"}
                </button>
              )}

              <div style={{ marginTop: "10px" }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => komment(index, elem.bejegyzesek_id)}
                >
                  {expanded2[index] ? "Bezár" : "Lenyit"}
                </button>

                {expanded2[index] && (
                  <div className="mt-2 card card-body">
                    {loadingKomment[elem.bejegyzesek_id] ? (
                      <div>Kommentek betöltése...</div>
                    ) : kommentek[elem.bejegyzesek_id] &&
                      kommentek[elem.bejegyzesek_id].length > 0 ? (
                      kommentek[elem.bejegyzesek_id].map((k, i2) => (
                        <div
                          key={k.hozzaszolasok_id ?? i2}
                          className="d-flex align-items-start mb-2"
                        >
                          {k.profil_kep == null && k.neme === 1 && (
                            <img
                              className="profilKepKomment"
                              src={`${Cim.Cim}/kepekFelhasznalo/M.jpg`}
                              alt=""
                            />
                          )}
                          {k.profil_kep == null && k.neme === 2 && (
                            <img
                              className="profilKepKomment"
                              src={`${Cim.Cim}/kepekFelhasznalo/F.jpg`}
                              alt=""
                            />
                          )}
                          {k.profil_kep != null && (
                            <img
                              className="profilKepKomment"
                              src={`${Cim.Cim}/kepekFelhasznalo/${k.profil_kep}`}
                              alt=""
                            />
                          )}

                          <div className="ms-2">
                            <strong>{k.felhasznalonev}</strong>
                            <div>{k.hozzaszolas_szoveg}</div>

                            {/* 📅 Relatív + Tooltip + ÚJ jelzés */}
                            <div
                              style={{ fontSize: "12px", color: "#888" }}
                              title={formatExactDate(k.letrehozva)}
                            >
                              {formatRelativeTime(k.letrehozva)}

                              {(new Date() - new Date(k.letrehozva)) <
                                3600 * 1000 && (
                                <span
                                  style={{
                                    color: "red",
                                    marginLeft: "6px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  ÚJ
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>Nincs még komment.</div>
                    )}

                    <div className="mt-3">
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="Írj egy hozzászólást..."
                        value={commentInputs[elem.bejegyzesek_id] || ""}
                        onChange={(e) =>
                          onCommentInputChange(elem.bejegyzesek_id, e.target.value)
                        }
                      />
                      <div className="mt-2 d-flex gap-2">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => submitComment(elem.bejegyzesek_id)}
                        >
                          Küldés
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => onCommentInputChange(elem.bejegyzesek_id, "")}
                        >
                          Töröl
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <br />
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default CsoportBejegyzes;

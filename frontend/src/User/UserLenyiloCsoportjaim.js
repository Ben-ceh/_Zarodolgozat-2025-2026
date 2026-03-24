import { useState, useEffect } from "react";
import Cim from "../Cim";
import "./UserLenyiloCsoportjaim.css";
import { Users, Check } from "lucide-react"; // Ikonok a profibb kinézethez

const UserLenyiloCsoportjaim = ({ userid, kivalasztott }) => {
    const [adatok, setAdatok] = useState([]);
    const [tolt, setTolt] = useState(true);
    const [hiba, setHiba] = useState(false);
    const [aktivId, setAktivId] = useState(null);

    useEffect(() => {
        const leToltes = async () => {
            try {
                const response = await fetch(Cim.Cim + "/csoportjaim/" + userid);
                const data = await response.json();
                
                if (response.ok) {
                    setAdatok(data);
                    // Az első csoportot alapértelmezettnek beállítjuk, ha van
                    if (data.length > 0) {
                        setAktivId(data[0].csoport_id);
                        kivalasztott(data[0].csoport_id);
                    }
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
    }, [userid]);

    const valasztas = (id) => {
        setAktivId(id);
        kivalasztott(id);
    };

    if (tolt) return <div className="small-loader">Csoportok betöltése...</div>;
    if (hiba) return <div className="text-danger small">Hiba a csoportoknál</div>;

    return (
        <div className="group-selector-container">
            <label className="selector-label">
                <Users size={14} /> Melyik csoportodban posztolsz?
            </label>
            <div className="group-chips-wrapper">
                {adatok.map((elem) => (
                    <button
                        key={elem.csoport_id}
                        type="button"
                        className={`group-chip ${aktivId === elem.csoport_id ? 'active' : ''}`}
                        onClick={() => valasztas(elem.csoport_id)}
                    >
                        {aktivId === elem.csoport_id && <Check size={14} className="me-1" />}
                        {elem.csoport_nev}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserLenyiloCsoportjaim;
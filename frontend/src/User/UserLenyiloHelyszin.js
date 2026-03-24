import { useState, useEffect } from "react";
import Cim from "../Cim";
import { MapPin, Check } from "lucide-react";

const UserLenyiloHelyszin = ({ kivalasztott }) => {
    const [adatok, setAdatok] = useState([]);
    const [tolt, setTolt] = useState(true);
    const [hiba, setHiba] = useState(false);
    const [aktivId, setAktivId] = useState(null);

    useEffect(() => {
        const leToltes = async () => {
            try {
                const response = await fetch(Cim.Cim + "/helyszin/");
                const data = await response.json();
                
                if (response.ok) {
                    setAdatok(data);
                    if (data.length > 0) {
                        setAktivId(data[0].telepules_id);
                        kivalasztott(data[0].telepules_id);
                    }
                    setTolt(false);
                } else {
                    setHiba(true);
                    setTolt(false);
                }
            } catch (error) {
                setHiba(true);
            }
        };
        leToltes();
    }, []);

    const valasztas = (id) => {
        setAktivId(id);
        kivalasztott(id);
    };

    if (tolt) return <div className="small-loader">Helyszínek betöltése...</div>;

    return (
        <div className="group-selector-container">
            <label className="selector-label">
                <MapPin size={14} /> Hol történt?
            </label>
            <div className="group-chips-wrapper">
                {adatok.map((elem) => (
                    <button
                        key={elem.telepules_id}
                        type="button"
                        className={`group-chip location-chip ${aktivId === elem.telepules_id ? 'active' : ''}`}
                        onClick={() => valasztas(elem.telepules_id)}
                    >
                        {aktivId === elem.telepules_id && <Check size={14} className="me-1" />}
                        {elem.telepules_nev}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserLenyiloHelyszin;
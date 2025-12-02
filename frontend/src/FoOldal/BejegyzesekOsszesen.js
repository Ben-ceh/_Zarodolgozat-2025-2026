import { useState, useEffect } from "react"
import Cim from "../Cim"
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const BejegyzesekOsszesen = () => {
    const [adatok, setAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [expanded1, setExpanded1] = useState({})  // React state a lenyitáshoz
    const [expanded2, setExpanded2] = useState({})  // React state a lenyitáshoz
    const [kommentek, setKommentek] = useState({}); // Kulcs: bejegyzes_id, érték: komment tömb

    const toggleExpand1 = (index) => {
        setExpanded1(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }
   const komment = async (index, bejegyzesek_id,hozzaszolas_szoveg) => {
    // Toggle expanded state
    setExpanded2(prev => ({
        ...prev,
        [index]: !prev[index]
    }));

    // Ha már lekértük korábban, nem fetch-eljük újra
    if (!kommentek[bejegyzesek_id]) {
        try {
            const response = await fetch(`${Cim.Cim}/kommentKeresBejegyId`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bejegyzesek_id })
            });

            const data = await response.json();
            alert(hozzaszolas_szoveg)
            alert(JSON.stringify(data))
            if (response.ok) {
                setKommentek(prev => ({
                    ...prev,
                    [bejegyzesek_id]: data
                }));
            } else {
                console.error("Hiba a kommentek lekérésében");
            }
        } catch (error) {
            console.error("Hálózati hiba:", error);
        }
    }
};
    useEffect(() => {
        const leToltes = async () => {
            try {
                const response = await fetch(Cim.Cim + "/bejegyEsFelh")
                const data = await response.json()
                if (response.ok) {
                    setAdatok(data)
                    setTolt(false)
                } else {
                    setHiba(true)
                    setTolt(false)
                }
            } catch (error) {
                console.log(error)
                setHiba(true)
            }
        }
        leToltes()
    }, [])

    const formatDate = (mysqlDate) => mysqlDate.split("T")[0]

    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div>Hiba</div>

    return (
        <div>
            {adatok.map((elem, index) => (
                <div key={elem.bejegyzesek_id}>
                    <div className="card bejegyzesKartya">
                        <div className="card-body">
                            <h4 className="card-title">
                                {elem.profil_kep == null && elem.neme === 1 &&
                                    <img className="profilKep" src={`${Cim.Cim}/kepekFelhasznalo/M.jpg`} alt="" />
                                }
                                {elem.profil_kep == null && elem.neme === 2 &&
                                    <img className="profilKep" src={`${Cim.Cim}/kepekFelhasznalo/F.jpg`} alt="" />
                                }
                                {elem.profil_kep != null &&
                                    <img className="profilKep" src={`${Cim.Cim}/kepekFelhasznalo/${elem.profil_kep}`} alt="" />
                                }
                                {elem.felhasznalonev}
                            </h4>

                            <h1 className="card-text bejegyzesCim">{elem.cim}</h1>

                            {elem.kep_url != null ?
                                <img className="card-img-top bejegyzesKepek" src={`${Cim.Cim}/bejegyzesKepek/${elem.kep_url}`} alt="" />
                                :
                                <img className="card-img-top bejegyzesKepek" src={`${Cim.Cim}/bejegyzesKepek/X.png`} alt="" />
                            }

                            <p className="text-secondary" style={{ textAlign: "center", fontWeight: "normal", fontSize: "15px" }}>
                                {formatDate(elem.letrehozva)}
                            </p>

                            <p className="card-text bejegyzesTartalom">
                                {expanded1[index]
                                    ? elem.tartalom
                                    : elem.tartalom.slice(0, 100)}
                                {!expanded1[index] && elem.tartalom.length > 100 && "..."}
                            </p>
                            {/* -------------------------Kevesebb Tovább Gomb */}
                            {elem.tartalom.length > 100 && (
                                <button
                                    className="btn btn-primary btn-sm bejegyzesGomb"
                                    onClick={() => toggleExpand1(index)}
                                >
                                    {expanded1[index] ? "Kevesebb" : "Tovább"}
                                </button>
                            )}

                            {/* Ide rakd a collapsos gombot – React state alapú */}
                            <div style={{ marginTop: "10px" }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => komment(`collapse-${index}`,index,elem.bejegyzesek_id,elem.hozzaszolas_szoveg)}
                                >
                                    {expanded2[`collapse-${index}`] ? "Bezár" : "Lenyit"}
                                </button>

                                {expanded2[`collapse-${index}`] && (
                                    <div className="mt-2 card card-body">
                                        {elem.hozzaszolas_szoveg }
                                         {/* Itt lehet bármilyen tartalom */}
                                    </div>
                                )}
                            </div>

                        </div>
                        <br />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BejegyzesekOsszesen
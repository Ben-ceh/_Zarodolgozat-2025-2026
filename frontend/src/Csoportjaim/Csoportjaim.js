import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CsoportjaimOssz from './CsoportjaimOssz';
import CsoportjaimJelenkOssz from './CsoportjaimJelenkOssz';
import CsoportjaimOsszKat from './CsoportjaimOsszKat';
import CsoportjaimOsszNem from './CsoportjaimOsszNem';
const Csoportjaim=()=>{
    const navigate = useNavigate();

    const [userid] = useState(localStorage.getItem("userid"));
    const [belepUserid] = useState(localStorage.getItem("belepUserid"));
    const [kivalasztott,setKivalasztott]=useState(1)
    const [kivalasztottCs,setKivalasztottCs]=useState(1)

   // Csoportjaim.js - módosítsd a visszatérést így:
return (
    <div style={{ padding: "20px" }}>
        <div className="create-card" onClick={() => navigate("/CsoportjaimLetrehoz")} style={{ marginBottom: "40px" }}>
            <div className="create-icon">+</div>
            <div>Új csoport létrehozása</div>
        </div>

        <div style={{ marginBottom: "40px" }}>
            <h1>Elért csoportok</h1>
            <CsoportjaimOssz kivalasztott={setKivalasztott} userid={userid} belepUserid={belepUserid}/>  
        </div>

        <div>
            <h1>Elérhető csoportok</h1>
            <CsoportjaimOsszNem kivalasztott={setKivalasztott} userid={userid} belepUserid={belepUserid}/>
        </div>
    </div>
)
}
export default Csoportjaim
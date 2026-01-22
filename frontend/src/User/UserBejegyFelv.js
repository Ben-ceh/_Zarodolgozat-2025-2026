import { useState, useEffect } from "react";
import Cim from "../Cim";
import UserLenyiloKategoria from "./UserLenyiloKategoria";
import UserLenyiloHelyszin from "./UserLenyiloHelyszin";
import UserLenyiloCsoportjaim from "./UserLenyiloCsoportjaim";

const UserBejegyFelv = ({ onSuccess }) => {
  const [cim, setCim] = useState("");
  const [tartalom, setTartalom] = useState("");
  const [kategoria, setKategoria] = useState("");
  const [helyszin, setHelyszin] = useState("");
  const [csoportjaim, setcsoportjaim] = useState("");

  const [belepUserid] = useState(localStorage.getItem("belepUserid"));
  const [userid] = useState(localStorage.getItem("userid"));
  //Kép const
    const [kategoriak, setKategoriak] = useState([]);
    const [kivalasztottKat,setKivalasztottKat]=useState(1)
    const [kivalasztottHely,setKivalasztottHely]=useState(1)
    const [kivalasztottCsop,setKivalasztottCsop]=useState(1)
  useEffect(() => {
    
    fetch(`${Cim.Cim}/kategoria`)
      .then(res => res.json())
      .then(data => setKategoriak(data));
  }, []);

  const submit = async () => {
    alert(kivalasztottKat)
  if (!cim || !tartalom || kivalasztottKat === 0) {
    alert("Please fill all required fields");
    return;
  }

  const res = await fetch(`${Cim.Cim}/bejegyzesFelv`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      felhasznalo_id:belepUserid,
      cim:cim,
      tartalom:tartalom,
      kategoria: kivalasztottKat,
      helyszin: kivalasztottHely,
      csoport_id:kivalasztottCsop
    })
  });

  if (!res.ok) {
    alert("Post failed");
    return;
  }

  setCim("");
  setTartalom("");



  onSuccess && onSuccess();
};


  return (
  
    <div className="card p-3 mb-3">
      <h5>Új bejegyzés</h5>

      <input
        className="form-control mb-2"
        placeholder="Cím"
        value={cim}
        onChange={(e) => setCim(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        rows={4}
        placeholder="Mi jár a fejedben..."
        value={tartalom}
        onChange={(e) => setTartalom(e.target.value)}
      />
        {/*Kategória */}
        <UserLenyiloKategoria value={kategoria} kivalasztott={setKivalasztottKat} />
       
        {/*Település*/}
        <UserLenyiloHelyszin value={helyszin} kivalasztott={setKivalasztottHely} />

        {/*Csoportjaim*/}
        <UserLenyiloCsoportjaim value={csoportjaim} userid={userid} kivalasztott={setKivalasztottCsop} />
      

      <button className="btn btn-primary" onClick={submit}>
        Poszt
      </button>
    </div>
  );
};

export default UserBejegyFelv;

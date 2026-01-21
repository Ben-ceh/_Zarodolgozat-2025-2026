import { useState, useEffect } from "react";
import Cim from "../Cim";
import UserLenyiloKategoria from "./UserLenyiloKategoria";
import UserLenyiloHelyszin from "./UserLenyiloHelyszin";

const UserBejegyFelv = ({ onSuccess }) => {
  const [cim, setCim] = useState("");
  const [tartalom, setTartalom] = useState("");
  const [kategoria, setKategoria] = useState("");
  const [helyszin, setHelyszin] = useState("");
  //Kép const
  const [kategoriak, setKategoriak] = useState([]);
    const [kivalasztottKat,setKivalasztottKat]=useState(0)
    const [kivalasztottHely,setKivalasztottHely]=useState(0)
  useEffect(() => {
    fetch(`${Cim.Cim}/kategoria`)
      .then(res => res.json())
      .then(data => setKategoriak(data));
  }, []);

  const submit = async () => {
  if (!cim || !tartalom || kivalasztottKat === 0) {
    alert("Please fill all required fields");
    return;
  }

  const res = await fetch(`${Cim.Cim}/bejegyzesFelv`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cim,
      tartalom,
      kategoria: kivalasztottKat,
      helyszin: kivalasztottHely
    })
  });

  if (!res.ok) {
    alert("Post failed");
    return;
  }

  setCim("");
  setTartalom("");
  setKivalasztottKat(0);
  setKivalasztottHely(0);

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
        <UserLenyiloKategoria value={kategoria} kivalasztott={setKivalasztottKat} onChange={(e) => setKategoria(e.target.value)}/>
       
        {/*Település*/}
        <UserLenyiloHelyszin value={helyszin} kivalasztott={setKivalasztottHely} onChange={(e) => setHelyszin(e.target.value)}/>

      
      

      <button className="btn btn-primary" onClick={submit}>
        Post
      </button>
    </div>
  );
};

export default UserBejegyFelv;

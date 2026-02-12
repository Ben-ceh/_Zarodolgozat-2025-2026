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
    const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };
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

  // const res = await fetch(`${Cim.Cim}/bejegyzesFelv`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     felhasznalo_id:belepUserid,
  //     cim:cim,
  //     tartalom:tartalom,
  //     kategoria: kivalasztottKat,
  //     helyszin: kivalasztottHely,
  //     csoport_id:kivalasztottCsop
  //   })
  // });

  const formData = new FormData();
                        formData.append("felhasznalo_id", belepUserid);
                        formData.append("cim", cim);
                        formData.append("tartalom", tartalom);
                        formData.append("kategoria", kivalasztottKat);
                        formData.append("helyszin", kivalasztottHely);
                        formData.append("csoport_id", kivalasztottCsop);

                        formData.append("kep", file); 

                        const res = await fetch(Cim.Cim + "/fajlFelvitel", {
                            method: "POST",
                            body: formData 
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
      
      {/* ---------------------tallozas-------------------------- */}

<label
        htmlFor="kepInput"
        style={{
          display: 'inline-block',
          padding: '10px 16px',
          backgroundColor: '#1976d2',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '6px'
        }}
      >
        Kép tallózása
      </label>

      <input
        id="kepInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {file && (
        <div>
          <p>Kiválasztott fájl: {file.name}</p>
          {/* <img
            src={URL.createObjectURL(file)}
            alt="előnézet"
            style={{ width: '200px', marginTop: '10px' }}
          /> */}
        </div>
      )}


      <button className="btn btn-primary" onClick={submit}>
        Poszt
      </button>
    </div>
  );
};

export default UserBejegyFelv;

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
    <div className="create-post-container">
      <div className="create-post-layout">
        <div className="post-avatar-col">
          {/* Itt érdemes lenne a bejelentkezett user képét megjeleníteni */}
          <div className="user-placeholder-avatar">U</div>
        </div>
        <div className="create-post-main">
          <input
            className="input-title-flat"
            placeholder="Adj egy címet a bejegyzésnek..."
            value={cim}
            onChange={(e) => setCim(e.target.value)}
          />
          <textarea
            className="input-text-flat"
            rows={3}
            placeholder="Mi jár a fejedben?"
            value={tartalom}
            onChange={(e) => setTartalom(e.target.value)}
          />

          <div className="create-post-selectors">
            <UserLenyiloKategoria kivalasztott={setKivalasztottKat} />
            <UserLenyiloHelyszin kivalasztott={setKivalasztottHely} />
            <UserLenyiloCsoportjaim userid={userid} kivalasztott={setKivalasztottCsop} />
          </div>

          <div className="create-post-footer">
            <label htmlFor="kepInput" className="upload-label">
               📷 Kép hozzáadása
               {file && <span className="file-ready"> ({file.name})</span>}
            </label>
            <input id="kepInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
            
            <button className="post-submit-btn" onClick={submit}>Közzététel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBejegyFelv;

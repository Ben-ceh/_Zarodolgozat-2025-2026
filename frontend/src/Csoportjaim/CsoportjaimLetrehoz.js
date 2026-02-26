import { useState, useEffect } from "react";
import Cim from "../Cim";
import "./CsoportjaimLetrehozD.css";
// import UserLenyiloKategoria from "../User/UserLenyiloKategoria";
import UserLenyiloHelyszin from "../User/UserLenyiloHelyszin";
// import UserLenyiloCsoportjaim from "../User/UserLenyiloCsoportjaim";

const CsoportjaimLetrehoz = ({ onSuccess }) => {
  const [csoportNev, setCsoportNev] = useState("");
  const [csoportLeiras, setCsoportLeiras] = useState("");
  const [csoportTelepules, setCsoportTelepules] = useState(1);
  const [csoportTulajdonos, setCsoportTulajdonos] = useState("");
  const [csoportjaim, setCsoportjaim] = useState("");

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
    alert(userid+belepUserid)
    fetch(`${Cim.Cim}/kategoria`)
      .then(res => res.json())
      .then(data => setKategoriak(data));
  }, []);

  const submit = async () => {
    alert(kivalasztottKat)
  if (!csoportNev || !csoportLeiras || kivalasztottKat === 0) {
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
alert(csoportTelepules)
  const formData = new FormData();
                        
                        formData.append("csoport_nev", csoportNev);
                        formData.append("csoport_leiras", csoportLeiras);     
                        formData.append("csoport_telepules", csoportTelepules);
                        formData.append("csoport_tulajdonos", belepUserid);

                        formData.append("kep", file); 
                        const res = await fetch(Cim.Cim + "/ujCsoportFelvitel", {
                            method: "POST",
                            body: formData 
                        });

  if (!res.ok) {
    alert("Post failed");
    return;
  }

  setCsoportNev("");
  setCsoportLeiras("");



  onSuccess && onSuccess();
};


  return (
  
    <div className="card p-3 mb-3">
      <h5>Új csoport létrehozás</h5>

      <input
        className="form-control mb-2"
        placeholder="Név"
        value={csoportNev}
        onChange={(e) => setCsoportNev(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        rows={4}
        placeholder="Leírás"
        value={csoportLeiras}
        onChange={(e) => setCsoportLeiras(e.target.value)}
      />
        {/*Kategória */}
        
       
        {/*Település*/}
        
        <UserLenyiloHelyszin value={csoportTelepules} kivalasztott={setCsoportTelepules} />

        {/*Csoportjaim*/}
        {/* <UserLenyiloCsoportjaim value={csoportjaim} userid={userid} kivalasztott={setKivalasztottCsop} /> */}
      
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
        Létrehozás
      </button>
    </div>
  );
};

export default CsoportjaimLetrehoz;

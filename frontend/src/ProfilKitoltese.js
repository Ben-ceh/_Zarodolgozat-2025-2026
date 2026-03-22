import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cim from "./Cim";
// import UserLenyiloKategoria from "./UserLenyiloKategoria";
// import UserLenyiloHelyszin from "./UserLenyiloHelyszin";
// import UserLenyiloCsoportjaim from "./UserLenyiloCsoportjaim";

const ProfilKitoltese = ({ onSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userid = location.state?.userid;
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [neme, setNeme] = useState("");
  const [felhasznalonev, setFelhasznalonev] = useState("");
 

  const [belepUserid] = useState(localStorage.getItem("belepUserid"));
  // const [userid] = useState(localStorage.getItem("userid"));
  // //Kép const
  //   const [kategoriak, setKategoriak] = useState([]);
  //   const [kivalasztottKat,setKivalasztottKat]=useState(1)
  //   const [kivalasztottHely,setKivalasztottHely]=useState(1)
  //   const [kivalasztottCsop,setKivalasztottCsop]=useState(1)
    const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };
  // useEffect(() => {
    
  //   fetch(`${Cim.Cim}/kategoria`)
  //     .then(res => res.json())
  //     .then(data => setKategoriak(data));
  // }, []);

  const submit = async () => {
    console.log(`Belépid|userid ${belepUserid}|${userid} Email|Bio|Neme|Felhasznalonev\n${email}|${bio}|${neme}|${felhasznalonev}`)
  if (!email || !bio || neme === 0 || !felhasznalonev.length) {
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
                        formData.append("email", email);
                        formData.append("bio", bio);
                        formData.append("neme", neme);
                        formData.append("felhasznalonev", felhasznalonev);
                        formData.append("idegen_felhasznalo_id", userid);
                        
                        formData.append("kep", file); 

                        const res = await fetch(Cim.Cim + "/profilReszletesKitoltese", {
                            method: "POST",
                            body: formData 
                        });

  if (!res.ok) {
    alert("Post failed");
    return;
  }
  

  // setCim("");
  // setTartalom("");



  onSuccess && onSuccess();
  if (res.ok) {
      alert("Profil kész!");
      navigate("/login");
    }
};


  return (
  
    <div className="card p-3 mb-3">
      <h5>Részleges regisztráció</h5>

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        rows={4}
        placeholder="Írj magadról egy pár mondatban...."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
        
         <select name="neme" onChange={(e) => setNeme(e.target.value)} required>
            <option value="0">Neme</option>
            <option value="1">Férfi</option>
            <option value="2">Nő</option>
            
          </select>

      <input
        className="form-control mb-2"
        placeholder="Felhasználó név"
        value={felhasznalonev}
        onChange={(e) => setFelhasznalonev(e.target.value)}
      />

      
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
        Mentés
      </button>
    </div>
  );
};

export default ProfilKitoltese;

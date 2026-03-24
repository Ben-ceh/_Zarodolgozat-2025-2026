import { useState, useEffect } from "react";
import Cim from "../Cim";
import UserLenyiloKategoria from "./UserLenyiloKategoria";
import UserLenyiloHelyszin from "./UserLenyiloHelyszin";
import UserLenyiloCsoportjaim from "./UserLenyiloCsoportjaim";
import { Image, X, Send } from "lucide-react"; // Ikonok
import "./UserBejegyFelv.css"; 

const UserBejegyFelv = ({ onSuccess }) => {
  const [cim, setCim] = useState("");
  const [tartalom, setTartalom] = useState("");
  const [belepUserid] = useState(localStorage.getItem("belepUserid"));
  const [userid] = useState(localStorage.getItem("userid"));
  
  const [kivalasztottKat, setKivalasztottKat] = useState(1);
  const [kivalasztottHely, setKivalasztottHely] = useState(1);
  const [kivalasztottCsop, setKivalasztottCsop] = useState(1);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // Új state az előnézethez

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Előnézet generálása
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const submit = async () => {
    if (!cim || !tartalom) {
      alert("Kérlek töltsd ki a címet és a tartalmat!");
      return;
    }

    const formData = new FormData();
    formData.append("felhasznalo_id", belepUserid);
    formData.append("cim", cim);
    formData.append("tartalom", tartalom);
    formData.append("kategoria", kivalasztottKat);
    formData.append("helyszin", kivalasztottHely);
    formData.append("csoport_id", kivalasztottCsop);
    if (file) formData.append("kep", file);

    const res = await fetch(Cim.Cim + "/fajlFelvitel", {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      setCim("");
      setTartalom("");
      removeFile(); // Kép törlése sikeres poszt után
      onSuccess && onSuccess();
    } else {
      alert("Hiba a feltöltés során.");
    }
  };

  return (
    <div className="create-post-card">
      <div className="cp-body">
        <input
          className="cp-title-input"
          placeholder="Bejegyzés címe..."
          value={cim}
          onChange={(e) => setCim(e.target.value)}
        />
        <textarea
          className="cp-text-input"
          placeholder="Mi jár a fejedben?"
          value={tartalom}
          onChange={(e) => setTartalom(e.target.value)}
        />

        {/* KÉP ELŐNÉZET SZAKASZ */}
        {preview && (
          <div className="cp-preview-container">
            <button className="cp-remove-preview" onClick={removeFile}>
              <X size={18} />
            </button>
            <img src={preview} alt="Előnézet" className="cp-preview-img" />
          </div>
        )}

        <div className="cp-selectors">
          <UserLenyiloKategoria kivalasztott={setKivalasztottKat} />
          <UserLenyiloHelyszin kivalasztott={setKivalasztottHely} />
          <UserLenyiloCsoportjaim userid={userid} kivalasztott={setKivalasztottCsop} />
        </div>
      </div>

      <div className="cp-footer">
        <label htmlFor="kepInput" className="cp-upload-btn">
          <Image size={20} />
          <span>Kép hozzáadása</span>
        </label>
        <input
          id="kepInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <button className="cp-submit-btn" onClick={submit}>
          <Send size={18} />
          <span>Posztolás</span>
        </button>
      </div>
    </div>
  );
};

export default UserBejegyFelv;
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProfilKitoltese.css";
import Cim from "./Cim";

export default function ProfilKitoltese() {

  const navigate = useNavigate();
  const location = useLocation();
  const user_id = localStorage.getItem("user_id");
  const idegen_felhasznalo_id =location.state?.idegen_felhasznalo_id;
    

  const [form, setForm] = useState({
    email: "",
    bio: "",
    neme: "",
    felhasznalonev: "",
    profil_kep: ""
  });

  const handleChange = (e) => {

  console.log("FORM:", form);
  console.log("USER_ID:", user_id);
  console.log("belep_id:", idegen_felhasznalo_id);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      Cim.Cim + "/profilKitoltes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          user_id
        })
      }
    );
    if(form.neme=0){
      alert("Kérlek tölsd ki a neme mezőt!")
    }
    if (response.ok) {
      alert("Profil kész!");
      navigate("/FoOldal");
    }
  };

  return (
    <div className="profil-wrapper">

      <div className="profil-card">

        <h2>Profil kitöltése</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="felhasznalonev"
            placeholder="Felhasználónév"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            name="profil_kep"
            placeholder="Profilkép URL"
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Bio"
            onChange={handleChange}
          />

          <select name="neme" onChange={handleChange} required>
            <option value="">Neme</option>
            <option value="1">Férfi</option>
            <option value="2">Nő</option>
            
          </select>

          <button type="submit">
            Mentés
          </button>

        </form>

      </div>

    </div>
  );
}
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProfilKitoltese.css";
import Cim from "./Cim";

export default function ProfilKitoltese() {

  const navigate = useNavigate();
  const location = useLocation();

  const idegen_felhasznalo_id =
    location.state?.idegen_felhasznalo_id;

  const [form, setForm] = useState({
    email: "",
    bio: "",
    neme: "",
    felhasznalonev: "",
    profil_kep: ""
  });

  const handleChange = (e) => {
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
          idegen_felhasznalo_id
        })
      }
    );

    if (response.ok) {
      alert("Profil kész!");
      navigate("/home");
    }
  };

  return (
    <div>
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
          <option value="3">Egyéb</option>
        </select>

        <button type="submit">
          Mentés
        </button>

      </form>
    </div>
  );
}
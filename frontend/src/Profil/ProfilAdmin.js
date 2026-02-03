
import { useState,useEffect } from "react"
import Cim from "../Cim"
import "./Profil.css";

const ProfilAdmin=()=>{
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)
    const [siker,setSiker]=useState(" ")
    const [helyes,setHelyes]=useState(true)
    const [mentesFolyamatban, setMentesFolyamatban] = useState(false)

    const [userid] = useState(localStorage.getItem("userid"));

    const [egyFelh, setEgyFelh] = useState(null)

    //adatok módosítása - jatekModosit backend végpont hívása
    const adatModosit = async(e) => {
        setMentesFolyamatban(true)

        


        e.preventDefault()
        alert(userid)
        const bemenet={
            "email": egyFelh.email,
            "bio": egyFelh.bio,
            "felhasznalonev": egyFelh.felhasznalonev
        }
        try{
        const response=await fetch(Cim.Cim+"/profilModosit/"+userid,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bemenet)
            })
        const data=await response.json()
        //alert(JSON.stringify(data))
        if (response.ok){
            setSiker(data["message"])
            setHelyes(true)
            }
            
        else
            setSiker(data["error"])
        }
        catch (error){
            console.log(error)
        }

                <button
        type="submit"
        className="profile-save-btn"
        disabled={mentesFolyamatban}
        >
        {mentesFolyamatban ? "Mentés..." : "Mentés"}
        </button>


        setMentesFolyamatban(false)
    }







    useEffect(()=>{
 //alert("Hello")
    const leToltes=async ()=>{
       
        try{
            const response=await fetch(Cim.Cim+"/idegenKeres/",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"idegen_felhasznalo_id":userid})
            })
            const data=await response.json()
            //alert(JSON.stringify(data))
            //console.log(data)
            if (response.ok)
                {
                    setEgyFelh(data[0])
                    setTolt(false)}
            else 
                {
                    setHiba(true)
                    setTolt(false)
                }
            }
        catch (error){
            console.log(error)
            setHiba(true)
        }
        
    }


        leToltes()
    },[userid])

    if (tolt)
  return (
    <div className="profile-page">
      <div className="profile-card skeleton">
        <div className="sk-avatar" />
        <div className="sk-line" />
        <div className="sk-line short" />
      </div>
    </div>
  )

    else if (hiba)
        return (
            <div>Hiba</div>
                )       
    
    else return (
  <div className="profile-page">

    <div className="profile-card">

      <div className="profile-header">
        <div className="profile-avatar">
          {egyFelh.felhasznalonev?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-stats">
  {/* <div className="stat">
    <span className="stat-value">12</span>
    <span className="stat-label">Bejegyzés</span>
  </div>

  <div className="stat">
    <span className="stat-value">3</span>
    <span className="stat-label">Jelentés</span>
  </div>

  <div className="stat">
    <span className="stat-value">245</span>
    <span className="stat-label">Pont</span>
  </div> */}
</div>


        <h2 className="profile-name">
          {egyFelh.felhasznalonev}
        </h2>

        <p className="profile-bio">
          {egyFelh.bio || "Nincs megadott bemutatkozás"}
        </p>
      </div>

      <div className="profile-content">
        {<form onSubmit={adatModosit} className="profile-form">

  <label>
    Felhasználónév
    <input
      type="text"
      value={egyFelh.felhasznalonev}
      onChange={(e) =>
        setEgyFelh({ ...egyFelh, felhasznalonev: e.target.value })
      }
    />
  </label>

  <label>
    Email
    <input type="email" value={egyFelh.email} disabled />

    <input
      type="email"
      value={egyFelh.email}
      onChange={(e) =>
        setEgyFelh({ ...egyFelh, email: e.target.value })
      }
    />
  </label>

  <label>
    Bemutatkozás

    <p className="profile-bio">
  {egyFelh.bio?.trim() || "Még nincs bemutatkozás"}
</p>

    <textarea
      rows="3"
      value={egyFelh.bio}
      onChange={(e) =>
        setEgyFelh({ ...egyFelh, bio: e.target.value })
        
      }
      
    />
  </label>

  <button type="submit" className="profile-save-btn">
    Mentés
  </button>

  {siker.trim() !== "" && (
    <div className={helyes ? "msg-success" : "msg-error"}>
      {siker}
    </div>
  )}
</form>
}
      </div>

    </div>
  </div>
)

}
export default ProfilAdmin


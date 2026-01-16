
import { useState,useEffect } from "react"
import Cim from "../Cim"
import "./Profil.css";

const Profil=()=>{
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)
    const [siker,setSiker]=useState(" ")
    const [helyes,setHelyes]=useState(true)

    const [userid] = useState(localStorage.getItem("userid"));

    const [egyFelh, setEgyFelh] = useState(null)

    //adatok módosítása - jatekModosit backend végpont hívása
    const adatModosit = async(e) => {


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
            <div style={{textAlign:"center"}}>Adatok betöltése folyamatban...</div>
                )
    else if (hiba)
        return (
            <div>Hiba</div>
                )       
    
    else return (
    <div className="profil-container">
        <div className="profil-card">
            
            <div className="profil-header">
                <div className="profil-avatar">
                    {egyFelh.felhasznalonev?.charAt(0).toUpperCase()}
                </div>
                <h2>{egyFelh.felhasznalonev}</h2>
                <p className="profil-email">{egyFelh.email}</p>
            </div>

            <form onSubmit={adatModosit} className="profil-form">

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
                    <textarea
                        rows="3"
                        value={egyFelh.bio}
                        onChange={(e) =>
                            setEgyFelh({ ...egyFelh, bio: e.target.value })
                        }
                    />
                </label>

                <button type="submit" className="profil-btn">
                    Profil mentése
                </button>

                {siker.trim() !== "" && (
                    <div className={helyes ? "uzenet-siker" : "uzenet-hiba"}>
                        {siker}
                    </div>
                )}
            </form>
        </div>
    </div>
)

}
export default Profil


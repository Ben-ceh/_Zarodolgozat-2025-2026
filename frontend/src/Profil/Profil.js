
import { useState,useEffect } from "react"
import Cim from "../Cim"

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
            alert(JSON.stringify(data))
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
        <div className="modositDoboz">

            <form onSubmit={adatModosit}>

                <div>
                    Felhasználó név:
                    <input
                    style={{marginLeft:"30px"}}
                    className="inputD"
                    type="text"
                    value={egyFelh.felhasznalonev} 
                    onChange={(e) => setEgyFelh({...egyFelh, felhasznalonev:e.target.value})}
                />

                

                </div>


                <div>
                    Email:
                    <input
                    style={{marginLeft:"30px"}}
                    className="inputD"
                    type="text"
                    value={egyFelh.email} 
                    onChange={(e) => setEgyFelh({...egyFelh, email:e.target.value})}
                />

                

                </div>

                <div>
                    Biosz:
                    <input
                    style={{marginLeft:"30px"}}
                    className="inputD"
                    type="text"
                    value={egyFelh.bio} 
                    onChange={(e) => setEgyFelh({...egyFelh, bio:e.target.value})}
                />

                

                </div>

                
                

                <div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        >
                        Módosítás
                    </button>
                    {helyes ? 
                        <div style={{color:"green"}}>{siker} &nbsp;</div> 
                        :  
                        <div style={{color:"red"}}>{siker} &nbsp;</div> }

                </div>
            </form>

        </div>
    )
}
export default Profil


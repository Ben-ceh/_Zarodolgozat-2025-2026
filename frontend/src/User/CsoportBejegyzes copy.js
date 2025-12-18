

import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CsoportBejegyzes=({kivalasztott})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)



    useEffect(()=>{

    const leToltes=async ()=>{
        try{
            let bemenet={
                "csoport_id":kivalasztott
            }
            const response=await fetch(Cim.Cim+"/bejegyKeresCs_id",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bemenet)
            })
            const data=await response.json()
            //alert(JSON.stringify(data))
            //console.log(data)
            if (response.ok)
                {
                    setAdatok(data)
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
    },[kivalasztott])

    if (tolt)
        return (
            <div style={{textAlign:"center"}}>Adatok betöltése folyamatban...</div>
                )
    else if (hiba)
        return (
            <div>Hiba</div>
                )       
    
    else return (
        <div>
                {/*kivalasztott*/}
                {adatok.map((elem,index)=>(
                    <div key={index} className="doboz"> 
                        <div className="jatekCim">{elem.cim} </div>
                        <div style={{textAlign:"center",marginTop:"20px"}}>
                            <img style={{width:"200px"}} src={`${Cim.Cim}/kepek/${elem.kep_url}.jpg`} alt={elem.cim} />
                        </div>
                        <div>Létrehozva: {elem.letrehozva} </div>
                        <div>Felhasználónév: {elem.felhasznalo_id} </div>
                        <div>Tartalom: {elem.tartalom} </div>
                        <div className="jatekTipus">Helyszin {elem.helyszin} </div>

                    </div>
                ))}
           
        </div>
    )
}
export default CsoportBejegyzes


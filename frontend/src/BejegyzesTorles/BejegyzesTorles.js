

import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css"
import Swal from 'sweetalert2';

const BejegyzesekTorlese=({kivalasztott})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)
    const [siker,setSiker]=useState(false)

    const leToltes=async ()=>{
        try{
            const response=await fetch(Cim.Cim+"/bejegyzesek")
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

    useEffect(()=>{
        leToltes()
    },[siker])
    const ido = (evHoNap) => {
        return evHoNap.split("T")[0]; // "2025-11-17"
    };
    //-----------------------------
    const nevKeres=async(felhaszanlok_id,felhasznalonev,email,bio)=>{
        //alert(`${felhasznalonev}\n${email}\n${bio}`)
        Swal.fire(`${felhasznalonev}`, `${email} <br></br> ${bio}`,`info`);
    }
    const torlesFuggveny=async (bejegyzesek_id,tartalom)=>{
        //alert(jatek_id)
        const biztos=window.confirm(`Biztosan törölni szeretnéd ${tartalom} bejegyzését?`)
        if (biztos){
            //alert("Jó")
            const response=await fetch(Cim.Cim+"/bejegyzesekTorlese/"+bejegyzesek_id,{
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json"
                            }
                   })
            const data=await response.json()
            if (response.ok){
                alert(data["message"])
                setSiker(!siker)
            }
            else{
                alert(data["error"])
            }
        }
    }
    if (tolt)
        return (
            <div style={{textAlign:"center"}}>Adatok betöltése folyamatban...</div>
                )
    else if (hiba)
        return (
            <div>Hiba</div>
                )
    
    else return (
        <div className="bejegyzesekSzerkesztes">
            <div class="row">
                    <div class="col p-3 ">Felhasználók neve:</div>
                    <div class="col p-3 ">tartalom:</div>
                    <div class="col p-3 ">dátum:</div>
            </div>
                <table >
                    
                      {/* <tr>
                        <th>Felhasználók neve:</th>
                        <th>tartalom:</th>
                        <br /><th>dátum:</th>
                      </tr> */}
                    
                {adatok.map((elem,index)=>(
                    <tr key={index}>
                        <button onClick={()=>nevKeres(elem.felhaszanlok_id,elem.felhasznalonev,elem.email,elem.bio)}>
                            <td>{elem.felhasznalonev}:</td>
                        </button >
                        <td>{elem.tartalom}</td><br />
                        <td><b>{ido(elem.letrehozva)}</b></td>
                            <td>
                                <br />
                            <button
                            className="btn btn-danger"
                            onClick={()=>torlesFuggveny(elem.bejegyzesek_id,elem.tartalom,ido(elem.letrehozva))}
                            >x</button></td>
                    </tr>
                ))}
                </table>
                
        </div>
    )

    
}
export default BejegyzesekTorlese


import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css"
import Swal from 'sweetalert2';

const FelhasznaloTorlese=({kivalasztott})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)
    const [siker,setSiker]=useState(false)

    

    useEffect(()=>{

const leToltes=async ()=>{
        try{
              const response=await fetch(Cim.Cim+"/Felhasznalok")
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
    },[siker])
    // const ido = (evHoNap) => {
    //     return evHoNap.split("T")[0]; // "2025-11-17"
    // };
    //-----------------------------
    const nevKeres=async(felhasznalok_id,felhasznalonev,email,bio)=>{
        //alert(`${felhasznalonev}\n${email}\n${bio}`)
        Swal.fire(`${felhasznalonev}`, `${email} <br></br> ${bio}`,`info`);
    }
    const torlesFuggveny=async (felhasznalok_id,email,felhasznalonev)=>{
        //alert(jatek_id)
        const biztos=window.confirm(`Biztosan törölni szeretnéd ${email} ${felhasznalonev} ${felhasznalok_id} felhasználót?`)
        if (biztos){
            //alert("Jó")
            const response=await fetch(Cim.Cim+"/FelhasznalokTorlese/" + felhasznalok_id,{
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
            {/* <div class="row">
                    <div class="col p-3 ">Felhasználók neve:</div>
                    <div class="col p-3 ">tartalom:</div>
                    <div class="col p-3 ">dátum:</div>
            </div> */}
               <table className="styled-table">
  <thead>
    <tr>
      <th>Felhasználó neve</th>
      <th>Tartalom</th>
      
      <th>Művelet</th>
    </tr>
  </thead>

  <tbody>
    {adatok.map((elem, index) => (
      <tr key={index}>
        <td>
          <button 
            className="name-btn"
            onClick={() =>
              nevKeres(
                elem.felhasznalok_id,
                elem.felhasznalonev,
                elem.email,
                elem.bio
              )
            }
          >
            {elem.felhasznalonev}
          </button>
        </td>

        {/* <td>{elem.hozzaszolas_szoveg}</td> */}

        <td><b>{elem.email}</b></td>

        <td>
          <button
            className="delete-btn"
            onClick={() =>
              torlesFuggveny(
                elem.felhasznalok_id,
                elem.felhasznalonev,
                elem.email,
              )
            }
          >
            ✕
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

                
        </div>
    )
}
export default FelhasznaloTorlese
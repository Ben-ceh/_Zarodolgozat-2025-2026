
import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css";
import { useNavigate } from 'react-router-dom';

const CsoportjaimOsszKat=({kivalasztottCs,userid,belepUserid})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)
    const [siker,setSiker]=useState(false)
    

    const navigate = useNavigate();

 
    const leToltes=async ()=>{
        try{
          
            const response=await fetch(Cim.Cim+"/csoportKeres",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "csoport_id":kivalasztottCs }),
      });
            const data=await response.json()
            // alert(JSON.stringify(data))
            
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
    const megtekintesFuggveny = async (id, szoveg) => {
      const biztos = window.confirm(
      `Biztosan meg szeretnéd tekinteni a csoportot?\n\n"${szoveg}"`
    );
    if (biztos) {
    navigate("/CsoportUserFoOldal", {
      state: {
        csoportId: id,
        csoportSzoveg: szoveg
      }
    });
    }
    }
const csatlakozásGomb = async (felhasznalo_id,csoport_id, csatlakozva) => {
    const biztos = window.confirm(
      // `Biztosan szertnél csatlakozni a csoport-hoz?\n\n"${szoveg}"`
    );
  


    if (biztos) {
      const response = await fetch(
        Cim.Cim + "/csoportKilepes/" + felhasznalo_id,
        { method: "delete" }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setSiker(!siker);
      } else {
        alert(data.error);
      }
    }
  };
  
    if (tolt)
     
        return (
            <div style={{textAlign:"center"}}>Adatok betöltése folyamatban...</div>
                )
    else if (hiba)
        return (
            <div>Hiba</div>
                )       
    
    else return (


        
<div className="row">
  <table className="styled-table">
    <thead>
      <tr>
        <th>Csoport neve</th>
        <th>Dátum</th>
        <th>Megtekintés</th>
        <th>Kilépés</th>
      </tr>
    </thead>

    <tbody>
      {adatok.map((elem, index) => (
        <tr key={index}>
          <td>{elem.csoport_nev}</td>
          <td>{elem.csatlakozva}</td>
          <td>
            
            <button
              className="view-btn"
              onClick={() =>
                megtekintesFuggveny(userid,elem.csoport_id)
              }
            >
              👀
            </button>
         
          </td>
          <td>
            <button
              className="delete-btn"
              onClick={() =>
                csatlakozásGomb(userid,elem.csoport_id)
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




        // <div>
        //     <select onChange={(e)=>  kivalasztott(e.target.value)      }>
        //         {adatok.map((elem,index)=>(
        //             <option key={index} value={elem.csoport_id}> {elem.csoport_nev} </option>
        //         ))}
        //     </select>
        // </div>
    )
}
export default CsoportjaimOsszKat

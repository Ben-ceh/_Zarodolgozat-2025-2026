
import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css";

const CsoportjaimOssz=({kivalasztott})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)
    const [siker,setSiker]=useState(false)
    const [userid] = useState(localStorage.getItem("userid"));

    const leToltes=async ()=>{
        try{
            const response=await fetch(Cim.Cim+"/csoportjaim/"+userid)
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
const torlesFuggveny = async (id, szoveg) => {
    const biztos = window.confirm(
      `Biztosan ki szeretnél lépni a csoportból?\n\n"${szoveg}"`
    );

    if (biztos) {
      const response = await fetch(
        Cim.Cim + "/csoportKilepes/" + id,
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


        
<div class="row">
    
                  {adatok.map((elem,index)=>(  
<table className="styled-table">
    <thead>
<tr>
    <th>Csoport neve</th>
    <th>Dátum</th>
    <th>Kilépés</th>
</tr>
    </thead>
    

    <tbody>
    
  <tr>
    <th key={index} value={elem.csoport_id}>{elem.csoport_nev}</th>
    <th>{elem.csatlakozva}</th>
    <th><button
                  className="delete-btn"
                  onClick={() =>
                  torlesFuggveny(
                      elem.id,
                      elem.csoport_nev)
                    }>✕</button></th>
                    </tr>  
                  
   </tbody>                 
</table>
 ))} 
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
export default CsoportjaimOssz

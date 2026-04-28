
import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css";
import { useNavigate } from 'react-router-dom';

const CsoportjaimJelenkOssz=({kivalasztottCs,userid,belepUserid})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)
    const [siker,setSiker]=useState(false)
    // const [userid] = useState(localStorage.getItem("userid"));
    

    const navigate = useNavigate();

 
    const leToltes=async ()=>{
        try{
          
            const response=await fetch(Cim.Cim+"/csoportjaimNem/"+userid)
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


     <div>
            <select className="form-select" style={{ maxWidth: "200px" }} onChange={(e)=>  kivalasztottCs(e.target.value)      }>
                {adatok.map((elem,index)=>(
                    <option defaultValue={0} key={index} value={elem.csoport_id}> {elem.csoport_nev}</option>
                ))}
            </select>
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
export default CsoportjaimJelenkOssz

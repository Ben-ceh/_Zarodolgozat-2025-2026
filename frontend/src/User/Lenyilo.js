
import { useState,useEffect } from "react"
import Cim from "../Cim"

const Lenyilo=({kivalasztott})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)
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
    },[])

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
            <select onChange={(e)=>  kivalasztott(e.target.value)      }>
                {adatok.map((elem,index)=>(
                    <option key={index} value={elem.csoport_id}> {elem.csoport_nev} </option>
                ))}
            </select>
        </div>
    )
}
export default Lenyilo

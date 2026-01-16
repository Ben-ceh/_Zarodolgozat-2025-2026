
import { useState,useEffect } from "react"
import Cim from "../Cim"

const LenyiloKategoria=({kivalasztott})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)
    

    

    useEffect(()=>{
        const leToltes=async ()=>{
        try{
            const response=await fetch(Cim.Cim+"/kategoria/")
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
            <select className="form-select" style={{ maxWidth: "200px" }} onChange={(e)=>  kivalasztott(e.target.value)      }>
                {adatok.map((elem,index)=>(
                    <option defaultValue={0} key={index} value={elem.kategoria_id}> {elem.kategoria_nev} </option>
                ))}
            </select>
        </div>
    )
}
export default LenyiloKategoria

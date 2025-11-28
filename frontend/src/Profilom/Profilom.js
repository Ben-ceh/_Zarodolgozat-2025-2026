
import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css"

const Profilom=()=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)



    useEffect(()=>{
        
    const leToltes=async ()=>{
        try{
           
            const response=await fetch(Cim.Cim+"/felhasznaloim")
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
    },[])
const formatDate = (mysqlDate) => {
  return mysqlDate.split("T")[0]; // "2025-11-17"
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
                {/*kivalasztott*/}
                {/* {adatok.map((elem,index)=>( */}
                    
                {adatok.map((elem,index)=>(
                     
                    <div >
                      {elem.felhasznalonev}
                      <br />
                      {elem.email}
                      <br />    
                    <img src={`${Cim.Cim}/kepekFelhasznalo/${elem.profil_kep}`} alt={elem.felhasznalo_id}/>
                    <br />
                      {elem.bio}
                      <p>Neme:{elem.neme===1?"Férfi":"Nő"}</p>
                      <br />
                      {formatDate(elem.regisztalt)}
                    </div>
                ))}
           
        </div>
    )
}
export default Profilom


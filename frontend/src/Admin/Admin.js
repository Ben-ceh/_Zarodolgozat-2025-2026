import { useEffect } from "react"
import Cim from "../Cim"

const Admin=()=>{
    const token = localStorage.getItem("token");

    useEffect(()=>{
        const leToltes=async ()=>{
        try{
            const response=await fetch(Cim.Cim+"/felhasznalo",{
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                }
        })
            const data=await response.json()
            alert(JSON.stringify(data))
            
            }
        catch (error){
            console.log(error)
        
        }
        
    }

    leToltes()
    },[token])


    return (
        <div>Admin</div>
    )
}
export default Admin
import {useState,useEffect} from 'react';
import {Alert, Button, StyleSheet, View,Text, Image, FlatList,TouchableOpacity,ActivityIndicator} from 'react-native';
import Cim from './Cim';

const BejegyzesFelvitele = () => {
  const [adatok,setAdatok]=useState([])
  const [betoltes,setBetoltes]=useState(true)

  const leTolt=async()=>{
    //alert("Hello")
    try{
      const response=await fetch(Cim.Cim+"film")
      const data=await response.json()
      //alert(JSON.stringify(data))
      setAdatok(data)
    }
    catch (error){
      alert("Hiba")
    }
    finally{
      setBetoltes(false)
    }

  }

  useEffect(()=>{
      leTolt()
  },[])

  const posztolas=async (id)=>{
    try{
        //alert("kattintva")
        let bemenet={
          "cim":cim,
          "tartalom":tartalom,
          "kep_url_":kep_url_,
          "helyszin":helyszin,
          "letrehozva":letrehozva,
        }
        const response=await fetch(Cim.Cim+"posztFelvitel",{
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(bemenet)
                  })
        const data=await response.json()
        if (response.ok)
            alert(data["message"])
        else 
          alert(data["error"])
      }
      catch (error){
          alert("Hiba")
      }
  }

  return (
    <div className='tailwind'>



<textarea placeholder="Oszd meg a híreket a közösséggel..." rows="4" class="w-full px-4 py-2 bg-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"></textarea>




                                {/* onPress={()=>posztolas(item.film_id)} */}
              </div>               
  );
};
export default BejegyzesFelvitele;
import { useState } from 'react';
import CsoportjaimOssz from './CsoportjaimOssz';
import CsoportjaimJelenkOssz from './CsoportjaimJelenkOssz';
import CsoportjaimOsszKat from './CsoportjaimOsszKat';
import CsoportjaimOsszNem from './CsoportjaimOsszNem';
const Csoportjaim=()=>{
    
    const [userid] = useState(localStorage.getItem("userid"));
    const [belepUserid] = useState(localStorage.getItem("belepUserid"));
    const [kivalasztott,setKivalasztott]=useState(1)
    const [kivalasztottCs,setKivalasztottCs]=useState(1)

    return (

        
        <div>
            {/* <div>{userid}</div> */}
            

            <div style={{textAlign:"center",marginBottom:20}}></div>
            
                
                <div className="">
                    <h1>Elért csoportok</h1>
                    <CsoportjaimOssz kivalasztott={setKivalasztott} userid={userid} belepUserid={belepUserid}/>  
                </div>
                <div>
                    <h1>Elérhető csoportok</h1>
                        <CsoportjaimOsszNem kivalasztott={setKivalasztott} userid={userid} belepUserid={belepUserid}/>
                </div>
                
            
              
               
        </div>

    )
}
export default Csoportjaim
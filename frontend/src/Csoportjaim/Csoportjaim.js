import { useState } from 'react';
import CsoportjaimOssz from './CsoportjaimOssz';
const Csoportjaim=()=>{
    
    const [userid] = useState(localStorage.getItem("userid"));
    const [belepUserid] = useState(localStorage.getItem("belepUserid"));
    const [kivalasztott,setKivalasztott]=useState(1)

    return (

        
        <div>
            <div>{userid}</div>
            <div style={{textAlign:"center",marginBottom:20}}></div>
            
                
                <div className="">
                    <CsoportjaimOssz kivalasztott={kivalasztott} userid={userid} belepUserid={belepUserid}/>
                </div>
                
            
        </div>

    )
}
export default Csoportjaim
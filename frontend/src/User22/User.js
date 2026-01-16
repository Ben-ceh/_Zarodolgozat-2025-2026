import { useState } from 'react';
import Lenyilo from './Lenyilo';
import CsoportBejegyzes from './CsoportBejegyzes';
const User=()=>{
    
    const [userid] = useState(localStorage.getItem("userid"));
    const [belepUserid] = useState(localStorage.getItem("belepUserid"));
    const [kivalasztott,setKivalasztott]=useState(1)

    return (

        
        <div>
            
            <div>{userid}</div>
            <div style={{textAlign:"center",marginBottom:20}}></div>
            <div className="row">
                <div className="col-sm-4">
                    <Lenyilo kivalasztott={setKivalasztott}/>
                    </div>
                <div className="col-sm-8">
                    <CsoportBejegyzes kivalasztott={kivalasztott} userid={userid} belepUserid={belepUserid}/>
                </div>
            </div>
        </div>

    )
}
export default User
import { useState } from 'react';
const User=()=>{
    
    const [userid] = useState(localStorage.getItem("userid"));
    
    return (
        <div>
            <div>Ussser</div>
            <div>{userid}</div>
            
        </div>
    )
}
export default User
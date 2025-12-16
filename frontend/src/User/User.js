import { useState } from 'react';
const User=()=>{
    
    const [userid] = useState(localStorage.getItem("userid"));
    
    return (
        <div>
            <div>User</div>
            <div>{userid}</div>
        </div>
    )
}
export default User
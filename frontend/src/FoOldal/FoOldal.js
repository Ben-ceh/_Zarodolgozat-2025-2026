// import { useState } from 'react';

import BejegyzesekOsszesen from './BejegyzesekOsszesen';

const FoOldal=()=>{
   

    return (
        <div>
            <div style={{marginBottom:20}}><h1>Bejegyzések</h1></div>
            <div>
                
                    {/* <BejegyzekesLenyilo kivalasztott={setKivalasztott}/> */}
                    
                
                    <BejegyzesekOsszesen />
                
            </div>

        </div>
    )
}
export default FoOldal


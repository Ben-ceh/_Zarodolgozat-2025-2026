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
            <div class="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                <h3 class="text-gray-900 mb-4">Kategóriák</h3>
                <nav class="space-y-1">
                    <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors bg-blue-50 text-blue-600">
                        <span>Összes bejegyzés</span>
                        </button>
                        <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                            <span>Közlekedés</span>
                            </button>
                            <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                                <span>Események</span>
                                </button>
                                <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                                    <span>Veszélyhelyzetek</span>
                                    </button>
                                    <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                                        <span>Elveszett tárgyak</span>
                                        </button>
                                        <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                                            <span>Helyi hírek</span>
                                            </button>
                                            </nav>
                                            <div class="mt-6 pt-6 border-t border-gray-200">
                                                <h4 class="text-gray-900 text-sm mb-3">Követett területek</h4>
                                                <div class="space-y-2">
                                                    <div class="flex items-center gap-2 text-sm text-gray-600">
                                                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span>Andrássy út</span>
                                                        </div>
                                                        <div class="flex items-center gap-2 text-sm text-gray-600">
                                                            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                                            <span>VI. kerület</span></div></div></div></div>
                
                <div className="">
                    <CsoportjaimOssz kivalasztott={kivalasztott} userid={userid} belepUserid={belepUserid}/>
                </div>
                
            
        </div>

    )
}
export default Csoportjaim
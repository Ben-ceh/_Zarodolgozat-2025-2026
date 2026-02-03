import CsoportUserBejegyzesekOsszesen from "./CsoportUserBejegyzesekOsszesen";
import "./CsoportUserFoOldal.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const CsoportUserFoOldal = () => {

      const location = useLocation();
      const { csoportId, csoportSzoveg } = location.state || {};
      const [userid] = useState(localStorage.getItem("userid"));
      const [belepUserid] = useState(localStorage.getItem("belepUserid"));
      const [kivalasztott,setKivalasztott]=useState(1)


  return (
    <main className="home">
      <section className="feed-container">
        <h1 className="feed-title"></h1>
        <CsoportUserBejegyzesekOsszesen userid={userid} belepUserid={belepUserid} csoportId={csoportId} csoportSzoveg={csoportSzoveg}/>
      </section>
    </main>
  );
};

export default CsoportUserFoOldal;
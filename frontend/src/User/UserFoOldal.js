import { Brush } from "lucide-react";
import UserBejegyzesekOsszesen from "./UserBejegyzesekOsszesen";
import "./UserFoOldal.css";
import { useState } from "react";

const UserFoOldal = () => {
  // Itt csak a user azonosítókat kezeljük
  const [userid] = useState(localStorage.getItem("userid"));
  const [belepUserid] = useState(localStorage.getItem("belepUserid"));

  return (
    <main className="user-home-bg">
      <div className="user-feed-container">
        {/* A címet egy kicsit feldobjuk */}
        <header className="user-feed-header">
           <h2  >Csoportjaim bejegyzései</h2>
        </header>
        
        {/* Ebben a komponensben van a Posztoló és a Feed is egymás alatt */}
        <UserBejegyzesekOsszesen userid={userid} belepUserid={belepUserid}/>
      </div>
    </main>
  );
};

export default UserFoOldal;
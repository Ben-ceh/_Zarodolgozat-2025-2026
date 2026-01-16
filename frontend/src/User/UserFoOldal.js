import UserBejegyzesekOsszesen from "./UserBejegyzesekOsszesen";
import "./UserFoOldal.css";
import { useState, useEffect } from "react";

const UserFoOldal = () => {

      const [userid] = useState(localStorage.getItem("userid"));
      const [belepUserid] = useState(localStorage.getItem("belepUserid"));
      const [kivalasztott,setKivalasztott]=useState(1)

  return (
    <main className="home">
      <section className="feed-container">
        <h1 className="feed-title"></h1>
        <UserBejegyzesekOsszesen userid={userid} belepUserid={belepUserid}/>
      </section>
    </main>
  );
};

export default UserFoOldal;
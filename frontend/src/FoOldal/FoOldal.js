import BejegyzesekOsszesen from "./BejegyzesekOsszesen";
import "./FoOldal.css";


const FoOldal = () => {
  return (
    <main className="home">
      <section className="feed-container">
        <h1 className="feed-title"></h1>
        <BejegyzesekOsszesen />
      </section>
    </main>
  );
};

export default FoOldal;
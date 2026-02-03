import Sidebar1 from "../Sidebar1/Sidebar1";
import "../App.css";
const MainLayout1 = ({ children }) => {
  return (
    <div className="app-container">
      <div className="d-flex flex-column flex-md-row gap-3 align-items-start">
        <Sidebar1 />
        <div style={{ flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout1;
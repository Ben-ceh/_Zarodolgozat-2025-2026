import Sidebar from "../Sidebar/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="d-flex gap-4 align-items-start">
        <Sidebar />
        <div style={{ flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
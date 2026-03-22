import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import RightSidebar from "../Sidebar/RightSidebar"; // Győződj meg róla, hogy az út jó
import "./MainLayout.css";


const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">
      {/* 1. oszlop: Bal oldali navigáció */}
      <Sidebar />

      {/* 2. oszlop: A tényleges tartalom (posztok, profil, stb.) */}
      <main className="main-content">
        {children}
      </main>

      {/* 3. oszlop: Jobb oldali sáv (Trending & Ajánlók) */}
      <div className="right-sidebar-wrapper">
        <RightSidebar />
      </div>
    </div>
  );
};

export default MainLayout;
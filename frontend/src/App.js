// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './Navbar';

import Login from './Login';
import Register from './Register';
//Bejelentkezés nélküli menük
import Menu1 from './Menu1/Menu1';
//Admin menük
import Admin from './Admin/Admin';


//FőOldal menü
import FoOldal from './FoOldal/FoOldal';
//Sidebar
import Sidebar from "./Sidebar/Sidebar";
//MainLayout menü
import MainLayout from './MainLayout/MainLayout';
// BejegyzésTörlése
import BejegyzesTorles from './BejegyzesTorles/BejegyzesTorles';
//Trágárszavak Törlése
import TragarSzoKereso from './TragarSzoKereso/TragarSzoKereso';
//Hozzászólások Törlése
import HozzaszolasTorlese from './BejegyzesTorles/HozzaszolasTorlese';
//Felhasznalók törlése
import FelhasznaloTorlese from './BejegyzesTorles/FelhasznaloTorlese';
//Csoportjaim lista
import Csoportjaim from './Csoportjaim/Csoportjaim';
//User Főoldal
import UserFoOldal from './User/UserFoOldal';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  if (role && userRole !== role) return <Navigate to="/menu1" />;

  return children;
};


// App komponens
function App() {
  return (
    <Router>
      <Navbar />

      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <MainLayout>
            <FoOldal />
            </MainLayout>} />


          <Route
  path="/FoOldal"
  element={
    <MainLayout>
      <FoOldal />
    </MainLayout>
  }
/>
<Route
  path="/User"
  element={
    <MainLayout>
      <UserFoOldal />
    </MainLayout>
  }
/>
          <Route path="/Csoportjaim" element={<Csoportjaim />} />
          <Route path="/UserFoOldal" element={<UserFoOldal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Login, Register
import Login from './Login';
import Register from './Register';

// Admin menük
import Admin from './Admin/Admin';

// FőOldal menük
import FoOldal from './FoOldal/FoOldal';
import UserFoOldal from './User/UserFoOldal';

// Profil
import ProfilKitoltese from './ProfilKitoltese';
import Profil from './Profil/Profil';
import ProfilAdmin from './Profil/ProfilAdmin';

// Layoutok
import MainLayout from './MainLayout/MainLayout';
import MainLayout1 from './MainLayout1/MainLayout1';

// Törlések (Admin)
import BejegyzesTorles from './BejegyzesTorles/BejegyzesTorles';
import HozzaszolasTorlese from './BejegyzesTorles/HozzaszolasTorlese';
import FelhasznaloTorlese from './BejegyzesTorles/FelhasznaloTorlese';

// Csoportok
import Csoportjaim from './Csoportjaim/Csoportjaim';
import CsoportjaimLetrehoz from './Csoportjaim/CsoportjaimLetrehoz';
import CsoportUserMegtekintes from './UserCsoport/CsoportUserMegtekintes';
import CsoportjaimJelenkOssz from './Csoportjaim/CsoportjaimJelenkOssz';
import CsoportjaimOsszKat from './Csoportjaim/CsoportjaimOsszKat';
import CsoportUserFoOldal from './UserCsoport/CsoportUserFoOldal';

// Bejegyzés
import UserBejegyFelv from './User/UserBejegyFelv';

// Üzenetek
import UzenetKuldes from './Uzenet/UzenetKuldes';
import UserUzenet from './Uzenet/UserUzenet';

// === 1. VÉDETT ÚTVONALAK (Csak bejelentkezve) ===
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Ha nincs token, irány a login
  if (!token) return <Navigate to="/login" replace />;

  // Ha be van jelentkezve, de nincs role (hiba történt a mentésnél)
  if (token && !userRole) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
  // // Ha rossz a jogosultság (pl. user akar admin oldalra menni)
  // if (role && userRole !== role) {
  //   return userRole === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/user" replace />;
  // }

  // JAVÍTÁS: 
  // Ha az útvonalhoz 'user' jog kell, de a bejelentkezett 'admin', ENGEDD BE.
  // Ha az útvonalhoz 'admin' jog kell, de a bejelentkezett 'user', DOBD KI.
  if (role) {
    if (role === "admin" && userRole !== "admin") {
      // User akar admin oldalra menni -> nem engedjük
      return <Navigate to="/user" replace />;
    }
    
    if (role === "user" && userRole !== "user" && userRole !== "admin") {
      // Csak akkor dobjuk ki, ha se nem user, se nem admin (bár ilyen nincs)
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

// === 2. VENDÉG ÚTVONALAK (Csak kijelentkezve) ===
const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Ha már be van jelentkezve, ne lássa a vendég oldalakat (Login, Register, FoOldal)
  if (token) {
    return userRole === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/user" replace />;
  }

  return children;
};


// === FŐ APP KOMPONENS ===
function App() {
  return (
    <Router>
      {/* A Navbar ki van kommentelve, ahogy kérted, így teljesen eltűnik */}
      {/* <Navbar /> */}

      <div className="app-container">
        <Routes>
          
          {/* === VENDÉG OLDALAK (Automatikus átirányítás, ha be van jelentkezve) === */}
          <Route path="/" element={<GuestRoute><MainLayout1><FoOldal /></MainLayout1></GuestRoute>} />
          <Route path="/FoOldal" element={<GuestRoute><MainLayout1><FoOldal /></MainLayout1></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />


          {/* === KÖZÖS VÉDETT OLDALAK (User és Admin is láthatja) === */}
          <Route path="/ProfilKitoltese" element={<ProtectedRoute><ProfilKitoltese /></ProtectedRoute>} />
          

          {/* === USER OLDALAK === */}
          {/* Összevontam a /User és /user útvonalakat, hogy ne legyen duplikáció */}
          <Route path="/user" element={<ProtectedRoute role="user"><MainLayout><UserFoOldal /></MainLayout></ProtectedRoute>} />
          <Route path="/User" element={<Navigate to="/user" replace />} /> 

          <Route path="/CsoportUserFoOldal" element={<ProtectedRoute role="user"><MainLayout><CsoportUserFoOldal /></MainLayout></ProtectedRoute>} />
          <Route path="/Csoportjaim" element={<ProtectedRoute role="user"><MainLayout><Csoportjaim /></MainLayout></ProtectedRoute>} />
          <Route path="/CsoportjaimLetrehoz" element={<ProtectedRoute role="user"><MainLayout><CsoportjaimLetrehoz /></MainLayout></ProtectedRoute>} />
          <Route path="/CsoportjaimJelenkOssz" element={<ProtectedRoute role="user"><CsoportjaimJelenkOssz /></ProtectedRoute>} />
          <Route path="/CsoportjaimOsszKat" element={<ProtectedRoute role="user"><CsoportjaimOsszKat /></ProtectedRoute>} />
          <Route path="/CsoportUserMegtekintes" element={<ProtectedRoute role="user"><CsoportUserMegtekintes /></ProtectedRoute>} />
          
          <Route path="/Profil" element={<ProtectedRoute role="user"><MainLayout><Profil /></MainLayout></ProtectedRoute>} />
          <Route path="/UserUzenet" element={<ProtectedRoute role="user"><UserUzenet /></ProtectedRoute>} />
          <Route path="/UserBejegyFelv" element={<ProtectedRoute role="user"><MainLayout><UserBejegyFelv /></MainLayout></ProtectedRoute>} />


          {/* === ADMIN OLDALAK === */}
          {/* <Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
          <Route path="/BejegyzesTorles" element={<ProtectedRoute role="admin"><BejegyzesTorles /></ProtectedRoute>} />
          <Route path="/FelhasznaloTorlese" element={<ProtectedRoute role="admin"><FelhasznaloTorlese /></ProtectedRoute>} />
          <Route path="/HozzaszolasTorlese" element={<ProtectedRoute role="admin"><HozzaszolasTorlese /></ProtectedRoute>} />
          <Route path="/ProfilAdmin" element={<ProtectedRoute role="admin"><ProfilAdmin /></ProtectedRoute>} />
          <Route path="/UzenetKuldes" element={<ProtectedRoute role="admin"><MainLayout><UzenetKuldes /></MainLayout></ProtectedRoute>} /> */}
<Route path="/admin" element={<ProtectedRoute role="admin"><MainLayout><Admin /></MainLayout></ProtectedRoute>} />
          
          <Route path="/BejegyzesTorles" element={
            <ProtectedRoute role="admin"><MainLayout><BejegyzesTorles /></MainLayout></ProtectedRoute>
          } />
          
          <Route path="/FelhasznaloTorlese" element={
            <ProtectedRoute role="admin"><MainLayout><FelhasznaloTorlese /></MainLayout></ProtectedRoute>
          } />
          
          <Route path="/HozzaszolasTorlese" element={
            <ProtectedRoute role="admin"><MainLayout><HozzaszolasTorlese /></MainLayout></ProtectedRoute>
          } />
          
          {/* <Route path="/UzenetKuldes" element={
            <ProtectedRoute role="admin"><MainLayout><UzenetKuldes /></ProtectedRoute>
          } /> */}

 <Route path="/UzenetKuldes" element={<ProtectedRoute role="admin"><MainLayout><UzenetKuldes /></MainLayout></ProtectedRoute>} />

          <Route path="/ProfilAdmin" element={
            <ProtectedRoute role="admin"><MainLayout><ProfilAdmin /></MainLayout></ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
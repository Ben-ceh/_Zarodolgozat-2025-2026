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
//User menük
import User from './User/User';
//FőOldal menü
import FoOldal from './FoOldal/FoOldal';
// BejegyzésTörlése
import BejegyzesTorles from './BejegyzesTorles/BejegyzesTorles';
//Trágárszavak Törlése
//import TragarSzoKereso from './TragarSzoKereso/TragarSzoKereso';
//Hozzászólások Törlése
import HozzaszolasTorlese from './BejegyzesTorles/HozzaszolasTorlese';
//Felhasznalók törlése
import FelhasznaloTorlese from './BejegyzesTorles/FelhasznaloTorlese';
//Csoportjaim lista
import Csoportjaim from './Csoportjaim/Csoportjaim';

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
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Menu1 />} />
         
          <Route path="/menu1" element={<Menu1 />} />

          <Route path="/FoOldal" element={<FoOldal />} />

          <Route path="/Csoportjaim" element={<Csoportjaim />} />

{/* Bejelentkezés*/}
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
          <Route 
            path="/BejegyzesTorles"
            element={
              <ProtectedRoute role="admin">
                <BejegyzesTorles/>
              </ProtectedRoute>
              
            }
          /> 
          <Route 
            path="/FelhasznaloTorlese"
            element={
              <ProtectedRoute role="admin">
                <FelhasznaloTorlese/>
              </ProtectedRoute>
              
            }
          />



          <Route 
            path="/HozzaszolasTorlese"
            element={
              <ProtectedRoute role="admin">
                <HozzaszolasTorlese />
              </ProtectedRoute>
              
            }
          /> 

          <Route 
            path="/user"
            element={
              <ProtectedRoute role="user">
                <User />
              </ProtectedRoute>
            }
          />
{/* Bejelentkezés vége*/}

        </Routes>
      </div>
    </Router>
  );
}

export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './Navbar';
import FoOldal from './FoOldal/FoOldal';
import Profilom from './Profilom/Profilom';


// App komponens
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<FoOldal />} />
         
          <Route path="/FoOldal" element={<FoOldal />} />
          <Route path="/Profilom" element={<Profilom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

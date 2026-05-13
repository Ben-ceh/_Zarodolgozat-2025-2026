import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Admin.css"; // Majd készítünk hozzá stílust

const Admin = () => {
    const navigate = useNavigate();

    const adminFunkciok = [
        { id: 1, nev: "Bejegyzések törlése", utvonal: "/BejegyzesTorles", ikon: "🗑️", szin: "#ef4444" },
        { id: 2, nev: "Hozzászólások kezelése", utvonal: "/HozzaszolasTorlese", ikon: "💬", szin: "#f59e0b" },
        { id: 3, nev: "Felhasználók törlése", utvonal: "/FelhasznaloTorlese", ikon: "👥", szin: "#3b82f6" },
        { id: 4, nev: "Üzenet küldése", utvonal: "/UzenetKuldes", ikon: "✉️", szin: "#10b981" },
    ];

    return (
        <div className="admin-dashboard">
            <h1 className="admin-title">Adminisztrációs Vezérlőpult</h1>
            <p className="admin-subtitle">Válassz egy műveletet a rendszer kezeléséhez.</p>
            
            <div className="admin-grid">
                {adminFunkciok.map((item) => (
                    <div 
                        key={item.id} 
                        className="admin-card" 
                        onClick={() => navigate(item.utvonal)}
                        style={{ borderLeft: `6px solid ${item.szin}` }}
                    >
                        <div className="admin-card-icon">{item.ikon}</div>
                        <h3>{item.nev}</h3>
                        <button className="admin-card-btn">Megnyitás</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;
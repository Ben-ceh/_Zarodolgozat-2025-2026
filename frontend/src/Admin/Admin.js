import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, MessageSquare, Users, Send } from 'lucide-react';

const Admin = () => {
    const navigate = useNavigate();

    const adminFunkciok = [
        { id: 1, nev: "Bejegyzések törlése", utvonal: "/BejegyzesTorles", ikon: <Trash2 />, szin: "#ef4444" },
        { id: 2, nev: "Hozzászólások kezelése", utvonal: "/HozzaszolasTorlese", ikon: <MessageSquare />, szin: "#f59e0b" },
        { id: 3, nev: "Felhasználók kezelése", utvonal: "/FelhasznaloTorlese", ikon: <Users />, szin: "#3b82f6" },
        { id: 4, nev: "Üzenet küldése", utvonal: "/UzenetKuldes", ikon: <Send />, szin: "#10b981" },
    ];

    return (
        <div style={{ padding: "30px" }}>
            <h1 style={{ marginBottom: "10px" }}>Adminisztrációs Vezérlőpult</h1>
            <p style={{ color: "#666", marginBottom: "30px" }}>Válassz egyet az alábbi funkciók közül a platform moderálásához.</p>
            
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", 
                gap: "20px" 
            }}>
                {adminFunkciok.map((f) => (
                    <div 
                        key={f.id}
                        onClick={() => navigate(f.utvonal)}
                        style={{
                            background: "white",
                            padding: "25px",
                            borderRadius: "15px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            cursor: "pointer",
                            transition: "transform 0.2s",
                            borderLeft: `6px solid ${f.szin}`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <div style={{ fontSize: "30px", marginBottom: "15px", color: f.szin }}>{f.ikon}</div>
                        <h3 style={{ fontSize: "16px", textAlign: "center" }}>{f.nev}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
import React from "react";
import { TrendingUp, Users, Hash } from "lucide-react";
import "./RightSidebar.css";

const RightSidebar = () => {
  // Példa adatok - Később ide jön a MySQL-ből az adat (axios.get...)
  const trendingTopics = [
    { id: 1, category: "Technológia", topic: "#MesterségesIntelligencia", posts: "12.5K" },
    { id: 2, category: "Politika", topic: "Választások 2026", posts: "8.2K" },
    { id: 3, category: "Sport", topic: "Magyar Válogatott", posts: "5.1K" },
  ];

  const suggestedGroups = [
    { id: 1, name: "Recept Cserebere", members: "1.2K", initial: "R" },
    { id: 2, name: "Programozók Köre", members: "850", initial: "P" },
    { id: 3, name: "Világhírek Kibeszélő", members: "2.4K", initial: "V" },
  ];

  return (
    <div className="right-sidebar-container">
      
      {/* Trending Szekció */}
      <div className="sidebar-widget">
        <h3 className="widget-title">
          <TrendingUp size={20} color="#2563eb" />
          Mi történik?
        </h3>
        {trendingTopics.map((item) => (
          <div key={item.id} className="trending-item">
            <span className="trending-category">{item.category} · Felkapott</span>
            <span className="trending-topic">{item.topic}</span>
            <span className="trending-count">{item.posts} bejegyzés</span>
          </div>
        ))}
      </div>

      {/* Csoport Javaslatok */}
      <div className="sidebar-widget">
        <h3 className="widget-title">
          <Users size={20} color="#2563eb" />
          Ajánlott csoportok
        </h3>
        {suggestedGroups.map((group) => (
          <div key={group.id} className="group-suggestion">
            <div className="group-avatar">{group.initial}</div>
            <div className="group-info">
              <p className="group-name">{group.name}</p>
              <p className="group-members">{group.members} tag</p>
            </div>
            <button className="join-button">Belépés</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer-text">
        <p>© 2026 Okos Közösség · Minden jog fenntartva</p>
        <p>Adatvédelem · Feltételek · Sütik</p>
      </div>
    </div>
  );
};

export default RightSidebar;
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen bg-background-main text-text-primary font-rajdhani">
      {/* === Sidebar persistante === */}
      <aside className="w-56 bg-background-sidebar flex flex-col justify-between p-5">
        <div>
          <h1 className="text-text-accent font-bold text-xl mb-1">EXO-ONE</h1>
          <p className="text-xs text-text-secondary">Système Phaos - Sol 45</p>

          <nav className="flex flex-col gap-2 mt-5">
            {[
              { name: "Base", path: "/" },
              { name: "Recherche", path: "/research" },
              { name: "Colons", path: "/colons" },
              { name: "Missions", path: "/missions" },
              { name: "Carte", path: "/map" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-left text-[15px] py-2 px-3 rounded-md transition ${
                  location.pathname === item.path
                    ? "bg-sidebar-active text-white"
                    : "text-text-secondary hover:bg-text-accent hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-sm text-text-secondary cursor-pointer">
          Paramètres
        </div>
      </aside>

      {/* === Contenu variable selon la page === */}
      <main className="flex-1 bg-background-main">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

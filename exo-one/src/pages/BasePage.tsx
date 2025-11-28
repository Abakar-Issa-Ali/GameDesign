import React from "react";
// @ts-ignore: Missing type declarations for Colors.js
import colors from "../style/Colors";

const BasePage: React.FC = () => {
  return (
    <div className="flex h-screen w-screen bg-background-main text-text-primary font-rajdhani">
      {/* === Sidebar === */}
      <aside className="w-56 bg-background-sidebar flex flex-col justify-between p-5">
        <div>
          <h1 className="text-text-accent font-bold text-xl mb-1">EXO-ONE</h1>
          <p className="text-xs text-text-secondary">Système Phaos - Sol 45</p>

          <nav className="flex flex-col gap-2 mt-5">
            {["Base", "Recherche", "Colons", "Missions", "Carte"].map(
              (item, i) => (
                <button
                  key={i}
                  className={`text-left text-[15px] py-2 px-3 rounded-md transition ${
                    item === "Base"
                      ? "bg-sidebar-active text-white"
                      : "text-text-secondary hover:bg-text-accent hover:text-white"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </nav>
        </div>

        <div className="text-sm text-text-secondary cursor-pointer">
          Paramètres
        </div>
      </aside>

      {/* === Main Content === */}
      <main className="flex-1 flex flex-col p-4 bg-background-main">
        {/* Resource bar */}
        <div className="flex justify-between gap-2 mb-4">
          {[
            ["⚡ Énergie", colors.resources.energy],
            ["⛏ Minéraux", colors.resources.minerals],
            ["💧 Eau", colors.resources.water],
            ["🌬 Oxygène", colors.resources.oxygen],
            ["🌿 Nourriture", colors.resources.food],
          ].map(([label, color], i) => (
            <div
              key={i}
              className="flex-1 text-center py-2 rounded-md border border-background-grid font-semibold"
              style={{ backgroundColor: colors.background.panel, color }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid zone */}
        <div
          className="flex-1 rounded-lg border border-background-grid"
          style={{
            backgroundColor: colors.background.panel,
            backgroundImage: `
              linear-gradient(${colors.background.grid} 1px, transparent 1px),
              linear-gradient(90deg, ${colors.background.grid} 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </main>

      {/* === Right panel === */}
      <aside className="w-64 bg-background-panel p-5 flex flex-col gap-3">
        <h2 className="text-text-accent font-semibold text-lg">
          + Construction
        </h2>
        {[
          "Panneau solaire",
          "Foreuse minière",
          "Extracteur d’eau",
          "Serre",
          "Habitat",
          "Laboratoire",
        ].map((item, i) => (
          <div
            key={i}
            className="bg-background-sidebar border border-background-grid rounded-lg px-4 py-3 cursor-pointer hover:bg-text-accent hover:text-white transition"
          >
            {item}
          </div>
        ))}
      </aside>
    </div>
  );
};

export default BasePage;

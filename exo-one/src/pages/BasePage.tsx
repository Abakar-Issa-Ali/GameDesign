import React from "react";
import colors from "../style/Colors";

const BasePage: React.FC = () => {
  return (
    <div className="flex h-full">
      {/* === Contenu principal (centre) === */}
      <div className="flex flex-col flex-1 p-4">
        {/* === Resource bar === */}
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
              style={{
                backgroundColor: colors.background.panel,
                color,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* === Grille centrale === */}
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
      </div>

      {/* === Sidebar de droite : Construction === */}
      <aside className="w-64 bg-background-panel p-5 flex flex-col gap-3 border-l border-background-grid">
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

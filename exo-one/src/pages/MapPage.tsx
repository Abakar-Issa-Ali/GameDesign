import React from "react";
import { Link } from "react-router-dom";

const MapPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full relative text-text-primary font-rajdhani">

      {/* ✅ FLÈCHE DE RETOUR EN HAUT À GAUCHE */}
      <Link
        to="/"
        className="absolute top-5 left-5 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-background-panel text-text-accent hover:bg-text-accent hover:text-white transition cursor-pointer"
      >
        ←
      </Link>

      <h1 className="text-2xl font-bold mb-8 text-text-accent">
        Système Phaos
      </h1>

      {/* === CONTENEUR DU SYSTÈME SOLAIRE === */}
      <div className="relative w-[600px] h-[600px] bg-background-main rounded-full border border-background-grid overflow-hidden">

        {/* ORBITES */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute border border-background-grid rounded-full w-[150px] h-[150px]" />
          <div className="absolute border border-background-grid rounded-full w-[250px] h-[250px]" />
          <div className="absolute border border-background-grid rounded-full w-[400px] h-[400px]" />
          <div className="absolute border border-background-grid rounded-full w-[550px] h-[550px]" />
        </div>

        {/* SOLEIL (PHAOS) */}
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px]">
          <span className="text-black font-semibold">Phaos</span>
        </div>

        {/* LAZARUS */}
        <div className="absolute top-[47%] left-[57%] w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="absolute top-5 text-[10px]">Lazarus</span>
        </div>

        {/* ✅ EXO-ONE (RETOUR BASE CLIQUABLE) */}
        <Link
          to="/"
          className="absolute z-10 top-[30%] left-[25%] w-6 h-6 bg-green-400 rounded-full flex items-center justify-center hover:scale-110 transition cursor-pointer"
        >
          <span className="absolute -top-5 -left-3 text-[10px] font-semibold">
            EXO-ONE
          </span>
        </Link>

        {/* LEVIATHAN */}
        <div className="absolute bottom-[5%] right-[25%] w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
          <span className="absolute top-10 text-[10px]">Leviathan</span>
        </div>

        {/* ✅ L'INCONNU (SVG NE BLOQUE PLUS LES CLICS) */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox="0 0 600 600"
        >
          <path
            d="M300,300 m-250,0 a250,120 0 1,0 500,0 a250,120 0 1,0 -500,0"
            stroke="#334155"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        <div className="absolute top-[20%] right-[5%] w-6 h-6 bg-sky-400 rounded-full flex items-center justify-center">
          <span className="absolute top-7 text-[10px]">L'Inconnu</span>
        </div>

      </div>
    </div>
  );
};

export default MapPage;

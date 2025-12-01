import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; 

const MapPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full min-h-screen bg-black text-text-primary font-rajdhani overflow-hidden">

      {/*  SIDEBAR */}
      <Sidebar
        gameTime={452000}
        morale={78}
        isPaused={false}
        onTogglePause={() => console.log("Pause")}
        onReset={() => console.log("Reset")}
      />

      {/*  ZONE MAP */}
      <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">

        {/*  FOND ÉTOILÉ CONTINU */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,_transparent_1px)] [background-size:18px_18px] opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(#60a5fa_1px,_transparent_1px)] [background-size:60px_60px] opacity-20" />
        </div>

        <h1 className="text-2xl font-bold mb-8 text-cyan-300 z-20">
          Système Phaos
        </h1>

        {/*  CONTENEUR SYSTÈME SOLAIRE */}
        <div className="relative w-[620px] h-[620px] rounded-full border border-cyan-800 shadow-[0_0_40px_#0ea5e9] bg-[#020617] z-10">

          {/*  ORBITES */}
          {[160, 270, 420, 580].map((size) => (
            <div
              key={size}
              className="absolute border border-cyan-900/40 rounded-full"
              style={{
                width: size,
                height: size,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/*  SOLEIL */}
          <div className="absolute z-30 top-1/2 left-1/2 w-20 h-20 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-[0_0_45px_#fde047]">
            <span className="text-black font-bold text-sm">Phaos</span>
          </div>

          {/* LAZARUS */}
          <div className="absolute z-30 top-[48%] left-[58%] w-10 h-10 bg-red-500 rounded-full shadow-[0_0_25px_#ef4444] flex items-center justify-center">
            <span className="absolute top-12 text-xs whitespace-nowrap">
              Lazarus
            </span>
          </div>

          {/* EXO-ONE (CLIQUABLE → RETOUR BASE) */}
          <div
            onClick={() => navigate("/")}
            className="absolute z-40 top-[30%] left-[25%] w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-[0_0_30px_#4ade80] hover:scale-110 transition cursor-pointer"
          >
            <span className="absolute top-14 text-xs font-bold whitespace-nowrap">
              EXO-ONE (Base)
            </span>
          </div>

          {/* LEVIATHAN */}
          <div className="absolute z-30 bottom-[8%] right-[25%] w-16 h-16 bg-blue-700 rounded-full shadow-[0_0_35px_#2563eb] flex items-center justify-center">
            <span className="absolute top-20 text-xs whitespace-nowrap">
              Leviathan
            </span>
          </div>

          {/*  ORBITE DE L’INCONNU (NE BLOQUE PAS LES CLICS) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 600 600"
          >
            <path
              d="M300,300 m-260,0 a260,130 0 1,0 520,0 a260,130 0 1,0 -520,0"
              stroke="#38bdf8"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
          </svg>

          {/* L’INCONNU */}
          <div className="absolute z-30 top-[18%] right-[6%] w-12 h-12 bg-sky-400 rounded-full shadow-[0_0_30px_#38bdf8] flex items-center justify-center">
            <span className="absolute top-14 text-xs whitespace-nowrap">
              L’Inconnu
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MapPage;



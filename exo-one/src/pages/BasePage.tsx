import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import Sidebar from '../components/Sidebar';
import ResourcePanel from '../components/ResourcePanel';
import GameGrid from '../components/GameGrid';
import BuildMenu from '../components/BuildMenu';
import BuildingInfoPanel from '../components/BuildingInfoPanel';

const BasePage: React.FC = () => {
  const {
    gameState,
    isPaused,
    setIsPaused,
    buildBuilding,
    removeBuilding,
    upgradeBuilding,
    toggleBuilding,
    resetGame,
    resourceDelta,
  } = useGameState();

  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [selectedBuildingType, setSelectedBuildingType] = useState<string | null>(null);

  const handlePlaceBuilding = (position: { x: number; y: number }) => {
    if (!selectedBuildingType) return;

    const success = buildBuilding(selectedBuildingType, position);
    if (success) {
      // Déselectionner après placement
      setSelectedBuildingType(null);
    }
  };

  const handleSelectBuildingFromMenu = (type: string) => {
    setSelectedBuildingType(selectedBuildingType === type ? null : type);
    setSelectedBuildingId(null); // Déselectionner le bâtiment existant
  };

  const handleSelectBuildingOnGrid = (buildingId: string | null) => {
    setSelectedBuildingId(buildingId);
    setSelectedBuildingType(null); // Déselectionner le type de construction
  };

  const handleUpgrade = () => {
    if (selectedBuildingId) {
      upgradeBuilding(selectedBuildingId);
    }
  };

  const handleToggle = () => {
    if (selectedBuildingId) {
      toggleBuilding(selectedBuildingId);
    }
  };

  const handleRemove = () => {
    if (selectedBuildingId) {
      removeBuilding(selectedBuildingId);
      setSelectedBuildingId(null);
    }
  };

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir recommencer ? Toute progression sera perdue.')) {
      resetGame();
      setSelectedBuildingId(null);
      setSelectedBuildingType(null);
    }
  };

  const selectedBuilding = gameState.buildings.find((b) => b.id === selectedBuildingId) || null;

  return (
    <div className="flex h-screen w-screen bg-background-main text-text-primary font-rajdhani overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        gameTime={gameState.gameTime}
        morale={gameState.morale}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
        onReset={handleReset}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 bg-background-main relative">
        <ResourcePanel resources={gameState.resources} resourceDelta={resourceDelta} />

        <GameGrid
          buildings={gameState.buildings}
          onPlaceBuilding={handlePlaceBuilding}
          onSelectBuilding={handleSelectBuildingOnGrid}
          selectedBuildingId={selectedBuildingId}
          selectedBuildingType={selectedBuildingType}
        />

        {/* Building Info Panel */}
        <BuildingInfoPanel
          building={selectedBuilding}
          onUpgrade={handleUpgrade}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />

        {/* Pause overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-background-panel p-8 rounded-lg border border-text-accent">
              <h2 className="text-3xl text-text-accent font-bold mb-4">⏸️ PAUSE</h2>
              <p className="text-text-secondary">Le jeu est en pause</p>
            </div>
          </div>
        )}
      </main>

      {/* Build Menu */}
      <BuildMenu
        resources={gameState.resources}
        onSelectBuilding={handleSelectBuildingFromMenu}
        selectedBuildingType={selectedBuildingType}
      />
    </div>
  );
};

export default BasePage;
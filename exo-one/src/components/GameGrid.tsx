import React, { useState, useRef } from 'react';
import type { Building } from '../types/game';
import { buildingsData } from '../data/buildings';
// @ts-ignore
import colors from '../style/Colors';

interface GameGridProps {
  buildings: Building[];
  onPlaceBuilding: (position: { x: number; y: number }) => void;
  onSelectBuilding: (buildingId: string | null) => void;
  selectedBuildingId: string | null;
  selectedBuildingType: string | null;
}

const GRID_SIZE = 40;

const GameGrid: React.FC<GameGridProps> = ({
  buildings,
  onPlaceBuilding,
  onSelectBuilding,
  selectedBuildingId,
  selectedBuildingType,
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / GRID_SIZE);
    const y = Math.floor((e.clientY - rect.top) / GRID_SIZE);

    // Vérifier si une position est déjà occupée
    const isOccupied = buildings.some(
      (b) => b.position.x === x && b.position.y === y
    );

    if (selectedBuildingType && !isOccupied) {
      onPlaceBuilding({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current || !selectedBuildingType) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / GRID_SIZE);
    const y = Math.floor((e.clientY - rect.top) / GRID_SIZE);

    setHoveredCell({ x, y });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const isPositionOccupied = (x: number, y: number): boolean => {
    return buildings.some((b) => b.position.x === x && b.position.y === y);
  };

  return (
    <div
      ref={gridRef}
      className="flex-1 rounded-lg border border-background-grid relative overflow-hidden cursor-crosshair"
      style={{
        backgroundColor: colors.background.panel,
        backgroundImage: `
          linear-gradient(${colors.background.grid} 1px, transparent 1px),
          linear-gradient(90deg, ${colors.background.grid} 1px, transparent 1px)
        `,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
      }}
      onClick={handleGridClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Afficher les bâtiments existants */}
      {buildings.map((building) => {
        const data = buildingsData[building.type];
        const isSelected = selectedBuildingId === building.id;

        return (
          <div
            key={building.id}
            className={`absolute flex items-center justify-center text-3xl cursor-pointer transition-transform hover:scale-110 ${
              isSelected ? 'ring-4 ring-text-accent' : ''
            } ${!building.isActive ? 'opacity-50' : ''}`}
            style={{
              left: building.position.x * GRID_SIZE,
              top: building.position.y * GRID_SIZE,
              width: GRID_SIZE,
              height: GRID_SIZE,
              backgroundColor: isSelected
                ? 'rgba(0, 191, 255, 0.2)'
                : 'rgba(17, 28, 46, 0.8)',
              border: `2px solid ${isSelected ? colors.text.accent : colors.background.grid}`,
              borderRadius: '4px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectBuilding(building.id);
            }}
          >
            <div className="text-center">
              <div>{data.icon}</div>
              {building.level > 1 && (
                <div className="text-xs text-text-accent">Lv{building.level}</div>
              )}
            </div>
          </div>
        );
      })}

      {/* Preview du bâtiment à placer */}
      {selectedBuildingType && hoveredCell && (
        <div
          className="absolute flex items-center justify-center text-3xl pointer-events-none"
          style={{
            left: hoveredCell.x * GRID_SIZE,
            top: hoveredCell.y * GRID_SIZE,
            width: GRID_SIZE,
            height: GRID_SIZE,
            backgroundColor: isPositionOccupied(hoveredCell.x, hoveredCell.y)
              ? 'rgba(255, 0, 0, 0.3)'
              : 'rgba(0, 191, 255, 0.3)',
            border: `2px dashed ${
              isPositionOccupied(hoveredCell.x, hoveredCell.y) ? '#FF0000' : colors.text.accent
            }`,
            borderRadius: '4px',
          }}
        >
          {buildingsData[selectedBuildingType]?.icon}
        </div>
      )}
    </div>
  );
};

export default GameGrid;
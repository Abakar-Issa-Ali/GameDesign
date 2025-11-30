import React from 'react';
import { buildingsData } from '../data/buildings';
// @ts-ignore
import colors from '../style/Colors';

type Resource = 'energy' | 'minerals' | 'water' | 'oxygen' | 'food';

export interface Building {
  id: string;
  type: string;
  level: number;
  isActive: boolean;
  position: { x: number; y: number };
  production?: Partial<Record<Resource, number>>;
  consumption?: Partial<Record<Resource, number>>;
}

interface BuildingInfoPanelProps {
  building: Building | null;
  onUpgrade: () => void;
  onToggle: () => void;
  onRemove: () => void;
}

const BuildingInfoPanel: React.FC<BuildingInfoPanelProps> = ({
  building,
  onUpgrade,
  onToggle,
  onRemove,
}) => {
  if (!building) return null;

  const data = buildingsData[building.type];
  if (!data) return null;

  return (
    <div className="absolute bottom-4 right-80 w-80 bg-background-panel border border-background-grid rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{data.icon}</span>
          <div>
            <h3 className="text-white font-semibold">{data.name}</h3>
            <span className="text-xs text-text-secondary">Niveau {building.level}</span>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="text-red-400 hover:text-red-300 text-xl"
          title="Détruire"
        >
          🗑️
        </button>
      </div>

      {/* Production */}
      {data.production && (
        <div className="mb-2">
          <div className="text-xs text-text-secondary mb-1">Production:</div>
          <div className="text-sm text-green-400">
            {Object.entries(data.production).map(([resource, amount]) => {
              const icons: Record<string, string> = {
                energy: '⚡',
                minerals: '⛏',
                water: '💧',
                oxygen: '🌬',
                food: '🌿',
              };
              return (
                <div key={resource}>
                  {icons[resource]} +{amount * building.level}/s
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Consommation */}
      {data.consumption && (
        <div className="mb-3">
          <div className="text-xs text-text-secondary mb-1">Consommation:</div>
          <div className="text-sm text-red-400">
            {Object.entries(data.consumption).map(([resource, amount]) => {
              const icons: Record<string, string> = {
                energy: '⚡',
                minerals: '⛏',
                water: '💧',
                oxygen: '🌬',
                food: '🌿',
              };
              return (
                <div key={resource}>
                  {icons[resource]} -{amount * building.level}/s
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onToggle}
          className={`flex-1 py-2 rounded-md font-semibold transition ${
            building.isActive
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {building.isActive ? '⏸️ Désactiver' : '▶️ Activer'}
        </button>

        <button
          onClick={onUpgrade}
          className="flex-1 py-2 rounded-md font-semibold bg-text-accent hover:bg-blue-600 text-white transition"
        >
          ⬆️ Améliorer
        </button>
      </div>

      <div className="mt-3 text-xs text-text-secondary">
        Position: ({building.position.x}, {building.position.y})
      </div>
    </div>
  );
};

export default BuildingInfoPanel;
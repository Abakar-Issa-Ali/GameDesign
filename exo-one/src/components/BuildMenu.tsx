import React from 'react';
import { buildingsData } from '../data/buildings';
import type { Resources } from '../types/game';
// @ts-ignore
import colors from '../style/Colors';

interface BuildMenuProps {
  resources: Resources;
  onSelectBuilding: (type: string) => void;
  selectedBuildingType: string | null;
}

const BuildMenu: React.FC<BuildMenuProps> = ({
  resources,
  onSelectBuilding,
  selectedBuildingType,
}) => {
  const canAfford = (cost: Partial<Resources>): boolean => {
    return Object.entries(cost).every(
      ([resource, amount]) => resources[resource as keyof Resources] >= amount
    );
  };

  const formatCost = (cost: Partial<Resources>): string => {
    return Object.entries(cost)
      .map(([resource, amount]) => {
        const icons: Record<string, string> = {
          energy: '⚡',
          minerals: '⛏',
          water: '💧',
          oxygen: '🌬',
          food: '🌿',
        };
        return `${icons[resource]} ${amount}`;
      })
      .join(' • ');
  };

  return (
    <aside className="w-64 bg-background-panel p-5 flex flex-col gap-3 overflow-y-auto">
      <h2 className="text-text-accent font-semibold text-lg sticky top-0 bg-background-panel pb-2">
        🏗️ Construction
      </h2>

      {Object.entries(buildingsData).map(([type, data]) => {
        if (!data.unlocked) return null;

        const affordable = canAfford(data.cost);
        const isSelected = selectedBuildingType === type;

        return (
          <div
            key={type}
            onClick={() => onSelectBuilding(type)}
            className={`bg-background-sidebar border rounded-lg px-4 py-3 cursor-pointer transition ${
              isSelected
                ? 'border-text-accent ring-2 ring-text-accent'
                : 'border-background-grid hover:border-text-accent'
            } ${!affordable ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-white">
                {data.icon} {data.name}
              </span>
            </div>

            <div className="text-xs text-text-secondary mb-2">
              {formatCost(data.cost)}
            </div>

            {data.production && (
              <div className="text-xs text-green-400">
                Production: {formatCost(data.production)}
              </div>
            )}

            {data.consumption && (
              <div className="text-xs text-red-400">
                Consommation: {formatCost(data.consumption)}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-4 p-3 bg-background-sidebar rounded-lg text-xs text-text-secondary border border-background-grid">
        💡 <strong>Astuce:</strong> Sélectionnez un bâtiment puis cliquez sur la grille
        pour le placer
      </div>
    </aside>
  );
};

export default BuildMenu;
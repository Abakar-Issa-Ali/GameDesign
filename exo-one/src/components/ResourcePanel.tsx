import React from 'react';
import type { Resources } from '../types/game';
// @ts-ignore
import colors from '../style/Colors';

interface ResourcePanelProps {
  resources: Resources;
  resourceDelta: Partial<Resources>;
}

const resourceConfig = [
  { key: 'energy', label: '⚡ Énergie', color: colors.resources.energy },
  { key: 'minerals', label: '⛏ Minéraux', color: colors.resources.minerals },
  { key: 'water', label: '💧 Eau', color: colors.resources.water },
  { key: 'oxygen', label: '🌬 Oxygène', color: colors.resources.oxygen },
  { key: 'food', label: '🌿 Nourriture', color: colors.resources.food },
];

const ResourcePanel: React.FC<ResourcePanelProps> = ({ resources, resourceDelta }) => {
  const formatDelta = (value: number) => {
    if (value === 0) return '';
    return value > 0 ? `+${value.toFixed(1)}/s` : `${value.toFixed(1)}/s`;
  };

  return (
    <div className="flex justify-between gap-2 mb-4">
      {resourceConfig.map(({ key, label, color }) => {
        const value = resources[key as keyof Resources];
        const delta = resourceDelta[key as keyof Resources] || 0;

        return (
          <div
            key={key}
            className="flex-1 text-center py-3 rounded-md border border-background-grid font-semibold relative"
            style={{ backgroundColor: colors.background.panel }}
          >
            <div style={{ color }} className="text-sm mb-1">
              {label}
            </div>
            <div className="text-xl text-white">{Math.floor(value)}</div>
            <div
              className="text-xs mt-1"
              style={{ color: delta >= 0 ? '#66CC66' : '#FF6666' }}
            >
              {formatDelta(delta)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResourcePanel;
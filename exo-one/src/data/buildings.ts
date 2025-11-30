import type { BuildingData } from '../types/game';

export const buildingsData: Record<string, BuildingData> = {
  solar_panel: {
    type: 'solar_panel',
    name: 'Panneau solaire',
    cost: { minerals: 50, energy: 10 },
    production: { energy: 10 },
    icon: '⚡',
    unlocked: true,
  },
  nuclear_reactor: {
    type: 'nuclear_reactor',
    name: 'Réacteur nucléaire',
    cost: { minerals: 200, water: 50 },
    production: { energy: 50 },
    icon: '⚛️',
    unlocked: false,
  },
  drill: {
    type: 'drill',
    name: 'Foreuse minière',
    cost: { minerals: 30, energy: 20 },
    production: { minerals: 8 },
    consumption: { energy: 5 },
    icon: '⛏️',
    unlocked: true,
  },
  water_extractor: {
    type: 'water_extractor',
    name: "Extracteur d'eau",
    cost: { minerals: 40, energy: 15 },
    production: { water: 6 },
    consumption: { energy: 4 },
    icon: '💧',
    unlocked: true,
  },
  greenhouse: {
    type: 'greenhouse',
    name: 'Serre hydroponique',
    cost: { minerals: 60, water: 30, energy: 25 },
    production: { food: 5, oxygen: 3 },
    consumption: { water: 2, energy: 3 },
    icon: '🌿',
    unlocked: true,
  },
  habitat: {
    type: 'habitat',
    name: 'Habitat',
    cost: { minerals: 100, water: 20, energy: 30 },
    consumption: { oxygen: 2, food: 1, energy: 2 },
    icon: '🏠',
    unlocked: true,
  },
  lab: {
    type: 'lab',
    name: 'Laboratoire',
    cost: { minerals: 150, energy: 50 },
    consumption: { energy: 5 },
    icon: '🔬',
    unlocked: true,
  },
  warehouse: {
    type: 'warehouse',
    name: 'Entrepôt',
    cost: { minerals: 80, energy: 20 },
    icon: '📦',
    unlocked: false,
  },
  command_hub: {
    type: 'command_hub',
    name: 'Hub de commandement',
    cost: { minerals: 0 },
    icon: '🎯',
    unlocked: true,
  },
};

export const getProductionRate = (_buildingType: string, level: number = 1): number => {
  return level * 1.0; // Multiplicateur basé sur le niveau
};
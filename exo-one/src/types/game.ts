export interface Resources {
  energy: number;
  minerals: number;
  water: number;
  oxygen: number;
  food: number;
}

export interface Building {
  id: string;
  type: BuildingType;
  position: { x: number; y: number };
  level: number;
  isActive: boolean;
}

export type BuildingType =
  | 'solar_panel'
  | 'nuclear_reactor'
  | 'drill'
  | 'water_extractor'
  | 'greenhouse'
  | 'habitat'
  | 'lab'
  | 'warehouse'
  | 'command_hub';

export interface BuildingData {
  type: BuildingType;
  name: string;
  cost: Partial<Resources>;
  production?: Partial<Resources>;
  consumption?: Partial<Resources>;
  icon: string;
  unlocked: boolean;
}

export interface Technology {
  id: string;
  name: string;
  tier: number;
  cost: Partial<Resources>;
  unlocked: boolean;
  researched: boolean;
  researchTime: number;
  currentProgress: number;
}

export interface Colonist {
  id: string;
  name: string;
  status: 'cryosleep' | 'active';
  specialization?: 'engineer' | 'scientist' | 'farmer';
  morale: number;
}

export interface GameState {
  resources: Resources;
  buildings: Building[];
  technologies: Technology[];
  colonists: Colonist[];
  gameTime: number;
  morale: number;
}

export interface GameEvent {
  id: string;
  type: 'positive' | 'negative';
  title: string;
  description: string;
  effects: Partial<Resources>;
  duration?: number;
}
import { useState, useEffect, useCallback } from 'react';
import type { GameState, Resources, Building, GameEvent } from '../types/game';
import { buildingsData } from '../data/buildings';

const TICK_RATE = 100; // 100ms
const SAVE_INTERVAL = 30000; // 30s

const initialResources: Resources = {
  energy: 100,
  minerals: 100,
  water: 50,
  oxygen: 50,
  food: 30,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('exo-one-save');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      resources: initialResources,
      buildings: [],
      technologies: [],
      colonists: [],
      gameTime: 0,
      morale: 100,
    };
  });

  const [isPaused, setIsPaused] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [activeEvent] = useState<GameEvent | null>(null);

  // Calculer la production/consommation totale
  const calculateResourceDelta = useCallback((): Partial<Resources> => {
    const delta: Resources = {
      energy: 0,
      minerals: 0,
      water: 0,
      oxygen: 0,
      food: 0,
    };

    gameState.buildings.forEach((building) => {
      if (!building.isActive) return;

      const data = buildingsData[building.type];
      if (!data) return;

      // Production
      if (data.production) {
        Object.entries(data.production).forEach(([resource, amount]) => {
          delta[resource as keyof Resources] += amount * building.level;
        });
      }

      // Consommation
      if (data.consumption) {
        Object.entries(data.consumption).forEach(([resource, amount]) => {
          delta[resource as keyof Resources] -= amount * building.level;
        });
      }
    });

    return delta;
  }, [gameState.buildings]);

  // Game loop principal
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        const delta = calculateResourceDelta();
        const newResources = { ...prev.resources };

        // Appliquer les deltas (par seconde, converti en tick)
        Object.entries(delta).forEach(([resource, amount]) => {
          newResources[resource as keyof Resources] = Math.max(
            0,
            prev.resources[resource as keyof Resources] + (amount * TICK_RATE) / 1000
          );
        });

        return {
          ...prev,
          resources: newResources,
          gameTime: prev.gameTime + TICK_RATE,
        };
      });
    }, TICK_RATE);

    return () => clearInterval(interval);
  }, [isPaused, calculateResourceDelta]);

  // Auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('exo-one-save', JSON.stringify(gameState));
    }, SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [gameState]);

  // Construire un bâtiment
  const buildBuilding = useCallback(
    (type: string, position: { x: number; y: number }): boolean => {
      const data = buildingsData[type];
      if (!data || !data.unlocked) return false;

      // Vérifier les ressources
      const canAfford = Object.entries(data.cost).every(
        ([resource, cost]) =>
          gameState.resources[resource as keyof Resources] >= cost
      );

      if (!canAfford) return false;

      setGameState((prev) => {
        const newResources = { ...prev.resources };

        // Déduire les coûts
        Object.entries(data.cost).forEach(([resource, cost]) => {
          newResources[resource as keyof Resources] -= cost;
        });

        const newBuilding: Building = {
          id: `${type}-${Date.now()}`,
          type: type as any,
          position,
          level: 1,
          isActive: true,
        };

        return {
          ...prev,
          resources: newResources,
          buildings: [...prev.buildings, newBuilding],
        };
      });

      return true;
    },
    [gameState.resources]
  );

  // Supprimer un bâtiment
  const removeBuilding = useCallback((buildingId: string) => {
    setGameState((prev) => ({
      ...prev,
      buildings: prev.buildings.filter((b) => b.id !== buildingId),
    }));
  }, []);

  // Améliorer un bâtiment
  const upgradeBuilding = useCallback((buildingId: string) => {
    setGameState((prev) => ({
      ...prev,
      buildings: prev.buildings.map((b) =>
        b.id === buildingId ? { ...b, level: b.level + 1 } : b
      ),
    }));
  }, []);

  // Toggle actif/inactif
  const toggleBuilding = useCallback((buildingId: string) => {
    setGameState((prev) => ({
      ...prev,
      buildings: prev.buildings.map((b) =>
        b.id === buildingId ? { ...b, isActive: !b.isActive } : b
      ),
    }));
  }, []);

  // Reset le jeu
  const resetGame = useCallback(() => {
    localStorage.removeItem('exo-one-save');
    setGameState({
      resources: initialResources,
      buildings: [],
      technologies: [],
      colonists: [],
      gameTime: 0,
      morale: 100,
    });
  }, []);

  return {
    gameState,
    isPaused,
    setIsPaused,
    selectedBuilding,
    setSelectedBuilding,
    activeEvent,
    buildBuilding,
    removeBuilding,
    upgradeBuilding,
    toggleBuilding,
    resetGame,
    resourceDelta: calculateResourceDelta(),
  };
};
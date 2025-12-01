import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import Sidebar from '../components/Sidebar';

interface Mission {
  id: string;
  name: string;
  description: string;
  category: 'main' | 'secondary' | 'achievement';
  progress: number; // 0-100
  goal: number;
  current: number;
  reward: {
    type: 'resources' | 'technology' | 'colonists' | 'building';
    description: string;
  };
  completed: boolean;
}

const missionsData: Mission[] = [
  // MISSIONS PRINCIPALES
  {
    id: 'first_breath',
    name: 'Premier souffle',
    description: 'Produire 1000 unités d\'oxygène au total',
    category: 'main',
    progress: 75,
    goal: 1000,
    current: 750,
    reward: {
      type: 'resources',
      description: '100 Minéraux',
    },
    completed: false,
  },
  {
    id: 'foundations',
    name: 'Fondations solides',
    description: 'Construire 10 bâtiments',
    category: 'main',
    progress: 40,
    goal: 10,
    current: 4,
    reward: {
      type: 'technology',
      description: 'Débloque: Habitats avancés',
    },
    completed: false,
  },
  {
    id: 'awakening',
    name: 'Renaissance',
    description: 'Réveiller 100 colons de la cryostase',
    category: 'main',
    progress: 45,
    goal: 100,
    current: 45,
    reward: {
      type: 'colonists',
      description: '50 Nourriture + 50 Oxygène',
    },
    completed: false,
  },

  // MISSIONS SECONDAIRES
  {
    id: 'energy_grid',
    name: 'Réseau énergétique',
    description: 'Atteindre 500 unités de production d\'énergie/min',
    category: 'secondary',
    progress: 60,
    goal: 500,
    current: 300,
    reward: {
      type: 'resources',
      description: '200 Énergie',
    },
    completed: false,
  },
  {
    id: 'green_colony',
    name: 'Colonie verte',
    description: 'Construire 5 serres hydroponiques',
    category: 'secondary',
    progress: 0,
    goal: 5,
    current: 0,
    reward: {
      type: 'building',
      description: 'Débloque: Serre automatisée',
    },
    completed: false,
  },
  {
    id: 'research_initiative',
    name: 'Initiative scientifique',
    description: 'Compléter 3 recherches technologiques',
    category: 'secondary',
    progress: 33,
    goal: 3,
    current: 1,
    reward: {
      type: 'resources',
      description: '300 Minéraux + 150 Énergie',
    },
    completed: false,
  },

  // SUCCÈS
  {
    id: 'achievement_builder',
    name: '🏆 Architecte spatial',
    description: 'Construire 50 bâtiments',
    category: 'achievement',
    progress: 16,
    goal: 50,
    current: 8,
    reward: {
      type: 'technology',
      description: 'Badge spécial + Bonus permanent',
    },
    completed: false,
  },
  {
    id: 'achievement_survivor',
    name: '🏆 Survivant',
    description: 'Maintenir le moral au-dessus de 80% pendant 1 heure',
    category: 'achievement',
    progress: 0,
    goal: 60,
    current: 0,
    reward: {
      type: 'colonists',
      description: '+25% Moral permanent',
    },
    completed: false,
  },
];

const MissionsPage: React.FC = () => {
  const { gameState, isPaused, setIsPaused, resetGame } = useGameState();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'main' | 'secondary' | 'achievement'>('all');

  const filteredMissions =
    selectedCategory === 'all'
      ? missionsData
      : missionsData.filter((m) => m.category === selectedCategory);

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'main':
        return 'bg-yellow-600';
      case 'secondary':
        return 'bg-blue-600';
      case 'achievement':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'main':
        return '⭐';
      case 'secondary':
        return '📋';
      case 'achievement':
        return '🏆';
      default:
        return '📌';
    }
  };

  const getRewardIcon = (type: string): string => {
    switch (type) {
      case 'resources':
        return '💎';
      case 'technology':
        return '🔬';
      case 'colonists':
        return '👥';
      case 'building':
        return '🏗️';
      default:
        return '🎁';
    }
  };

  return (
    <div className="flex h-screen w-screen bg-background-main text-text-primary font-rajdhani overflow-hidden">
      <Sidebar
        gameTime={gameState.gameTime}
        morale={gameState.morale}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
        onReset={resetGame}
      />

      <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-background-main via-background-sidebar to-background-main">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-text-accent mb-2">📋 Missions & Objectifs</h1>
          <p className="text-text-secondary mb-8">
            Accomplissez des missions pour obtenir des récompenses
          </p>

          {/* Filtres */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                selectedCategory === 'all'
                  ? 'bg-text-accent text-white'
                  : 'bg-background-panel text-text-secondary hover:bg-background-sidebar'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setSelectedCategory('main')}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                selectedCategory === 'main'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-background-panel text-text-secondary hover:bg-background-sidebar'
              }`}
            >
              ⭐ Principales
            </button>
            <button
              onClick={() => setSelectedCategory('secondary')}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                selectedCategory === 'secondary'
                  ? 'bg-blue-600 text-white'
                  : 'bg-background-panel text-text-secondary hover:bg-background-sidebar'
              }`}
            >
              📋 Secondaires
            </button>
            <button
              onClick={() => setSelectedCategory('achievement')}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                selectedCategory === 'achievement'
                  ? 'bg-purple-600 text-white'
                  : 'bg-background-panel text-text-secondary hover:bg-background-sidebar'
              }`}
            >
              🏆 Succès
            </button>
          </div>

          {/* Liste des missions */}
          <div className="space-y-4">
            {filteredMissions.map((mission) => (
              <div
                key={mission.id}
                className={`bg-background-panel border-2 rounded-lg p-6 transition ${
                  mission.completed
                    ? 'border-green-500 opacity-75'
                    : 'border-background-grid hover:border-text-accent'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`${getCategoryColor(
                          mission.category
                        )} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                      >
                        {getCategoryIcon(mission.category)} {mission.category.toUpperCase()}
                      </span>
                      {mission.completed && (
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ✓ COMPLÉTÉE
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{mission.name}</h3>
                    <p className="text-text-secondary mb-3">{mission.description}</p>
                    <div className="text-sm text-text-secondary">
                      Progression: {mission.current} / {mission.goal}
                    </div>
                  </div>

                  <div className="bg-background-sidebar border border-background-grid rounded-lg p-4 ml-4 min-w-[200px]">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{getRewardIcon(mission.reward.type)}</div>
                      <h4 className="text-xs text-text-secondary mb-1">RÉCOMPENSE</h4>
                      <p className="text-sm text-text-accent font-semibold">
                        {mission.reward.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Barre de progression */}
                <div className="relative">
                  <div className="bg-background-grid rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-4 transition-all ${
                        mission.completed
                          ? 'bg-green-500'
                          : 'bg-gradient-to-r from-text-accent to-blue-500'
                      }`}
                      style={{ width: `${mission.progress}%` }}
                    />
                  </div>
                  <span className="absolute right-2 top-0 text-xs text-white font-semibold leading-4">
                    {mission.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Statistiques */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-background-panel border border-background-grid rounded-lg p-4">
              <h4 className="text-text-secondary text-sm mb-2">Missions complétées</h4>
              <p className="text-3xl font-bold text-green-400">
                {missionsData.filter((m) => m.completed).length} /{' '}
                {missionsData.length}
              </p>
            </div>
            <div className="bg-background-panel border border-background-grid rounded-lg p-4">
              <h4 className="text-text-secondary text-sm mb-2">En cours</h4>
              <p className="text-3xl font-bold text-yellow-400">
                {missionsData.filter((m) => !m.completed && m.progress > 0).length}
              </p>
            </div>
            <div className="bg-background-panel border border-background-grid rounded-lg p-4">
              <h4 className="text-text-secondary text-sm mb-2">Succès débloqués</h4>
              <p className="text-3xl font-bold text-purple-400">
                {
                  missionsData.filter(
                    (m) => m.category === 'achievement' && m.completed
                  ).length
                }{' '}
                / {missionsData.filter((m) => m.category === 'achievement').length}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MissionsPage;
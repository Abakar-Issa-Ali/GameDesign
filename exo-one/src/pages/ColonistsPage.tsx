import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import Sidebar from '../components/Sidebar';

interface ColonistSpecialization {
  id: string;
  name: string;
  icon: string;
  description: string;
  bonus: string;
}

const specializations: ColonistSpecialization[] = [
  {
    id: 'engineer',
    name: 'Ingénieur',
    icon: '🔧',
    description: 'Spécialisé dans la construction et maintenance',
    bonus: '+15% vitesse de construction',
  },
  {
    id: 'scientist',
    name: 'Scientifique',
    icon: '🔬',
    description: 'Accélère la recherche technologique',
    bonus: '+20% vitesse de recherche',
  },
  {
    id: 'farmer',
    name: 'Agriculteur',
    icon: '🌾',
    description: 'Augmente la production alimentaire',
    bonus: '+25% production de nourriture',
  },
  {
    id: 'miner',
    name: 'Mineur',
    icon: '⛏️',
    description: 'Améliore l\'extraction de ressources',
    bonus: '+20% extraction de minéraux',
  },
];

const ColonistsPage: React.FC = () => {
  const { gameState, isPaused, setIsPaused, resetGame } = useGameState();
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);

  // Calculs simulés (à remplacer par les vraies données du gameState)
  const activeColonists = gameState.colonists.filter((c) => c.status === 'active').length || 45;
  const cryosleepColonists = 9955; // Valeur fixe pour le prototype
  const morale = gameState.morale;

  // Répartition des spécialisations (simulée)
  const specializationCounts = {
    engineer: 15,
    scientist: 12,
    farmer: 18,
    miner: 0,
  };

  const handleWakeColonists = (count: number) => {
    const oxygenCost = count * 2;
    const foodCost = count * 1;

    if (
      gameState.resources.oxygen >= oxygenCost &&
      gameState.resources.food >= foodCost
    ) {
      alert(
        `Réveil de ${count} colons...\nCoût: ${oxygenCost} O₂/min, ${foodCost} Nourriture/min`
      );
      // TODO: Implémenter le réveil dans useGameState
    } else {
      alert(
        `Ressources insuffisantes!\nNécessaire: ${oxygenCost} O₂, ${foodCost} Nourriture`
      );
    }
  };

  const getMoraleColor = (morale: number): string => {
    if (morale >= 70) return 'text-green-400';
    if (morale >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMoraleEmoji = (morale: number): string => {
    if (morale >= 70) return '😊';
    if (morale >= 40) return '😐';
    return '😟';
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
          <h1 className="text-4xl font-bold text-text-accent mb-2">👥 Gestion des Colons</h1>
          <p className="text-text-secondary mb-8">
            Gérez votre population et réveillez de nouveaux colons
          </p>

          {/* Statistiques principales */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-background-panel border-2 border-text-accent rounded-lg p-6 shadow-lg">
              <h3 className="text-text-accent font-semibold mb-2 text-sm">
                COLONS ACTIFS
              </h3>
              <p className="text-5xl font-bold text-white mb-1">{activeColonists}</p>
              <p className="text-xs text-text-secondary">Contribuent à la colonie</p>
            </div>

            <div className="bg-background-panel border-2 border-blue-500 rounded-lg p-6 shadow-lg">
              <h3 className="text-blue-400 font-semibold mb-2 text-sm">
                EN CRYOSTASE
              </h3>
              <p className="text-5xl font-bold text-white mb-1">
                {cryosleepColonists.toLocaleString()}
              </p>
              <p className="text-xs text-text-secondary">En attente de réveil</p>
            </div>

            <div className="bg-background-panel border-2 border-green-500 rounded-lg p-6 shadow-lg">
              <h3 className="text-green-400 font-semibold mb-2 text-sm">MORAL</h3>
              <div className="flex items-center gap-3">
                <p className={`text-5xl font-bold ${getMoraleColor(morale)}`}>
                  {Math.floor(morale)}%
                </p>
                <span className="text-4xl">{getMoraleEmoji(morale)}</span>
              </div>
              <div className="mt-2 bg-background-grid rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    morale >= 70
                      ? 'bg-green-500'
                      : morale >= 40
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${morale}%` }}
                />
              </div>
            </div>
          </div>

          {/* Spécialisations */}
          <div className="bg-background-panel border border-background-grid rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              📊 Répartition des Spécialisations
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {specializations.map((spec) => {
                const count = specializationCounts[spec.id as keyof typeof specializationCounts] || 0;
                const isSelected = selectedSpecialization === spec.id;

                return (
                  <div
                    key={spec.id}
                    onClick={() =>
                      setSelectedSpecialization(isSelected ? null : spec.id)
                    }
                    className={`bg-background-sidebar p-5 rounded-lg cursor-pointer transition border-2 ${
                      isSelected
                        ? 'border-text-accent ring-2 ring-text-accent'
                        : 'border-background-grid hover:border-text-accent'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{spec.icon}</div>
                      <p className="text-text-secondary text-sm mb-1">{spec.name}</p>
                      <p className="text-3xl font-bold text-white">{count}</p>
                      {isSelected && (
                        <div className="mt-3 text-xs text-text-secondary">
                          <p className="mb-1">{spec.description}</p>
                          <p className="text-text-accent font-semibold">{spec.bonus}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions de réveil */}
          <div className="bg-gradient-to-r from-text-accent/20 to-blue-600/20 border-2 border-text-accent rounded-lg p-6 mb-8">
            <h3 className="text-text-accent font-bold text-xl mb-3 flex items-center gap-2">
              ❄️ Réveiller des colons
            </h3>
            <p className="text-text-secondary mb-4">
              Chaque colon réveillé nécessite +2 O₂/min et +1 Nourriture/min de
              consommation permanente
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => handleWakeColonists(10)}
                className="flex-1 bg-text-accent hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Réveiller 10 colons
              </button>
              <button
                onClick={() => handleWakeColonists(50)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Réveiller 50 colons
              </button>
              <button
                onClick={() => handleWakeColonists(100)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Réveiller 100 colons
              </button>
            </div>

            <div className="mt-4 bg-background-panel rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2 text-sm">
                Ressources disponibles :
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">🌬 Oxygène :</span>
                  <span className="text-cyan-400 font-bold">
                    {Math.floor(gameState.resources.oxygen)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">🌿 Nourriture :</span>
                  <span className="text-green-400 font-bold">
                    {Math.floor(gameState.resources.food)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Facteurs affectant le moral */}
          <div className="bg-background-panel border border-background-grid rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              💭 Facteurs affectant le moral
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-sidebar p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                  ✅ Facteurs positifs
                </h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Nourriture abondante (+10%)</li>
                  <li>• Oxygène suffisant (+10%)</li>
                  <li>• Habitats confortables (+15%)</li>
                  <li>• Recherche active (+5%)</li>
                </ul>
              </div>

              <div className="bg-background-sidebar p-4 rounded-lg">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  ⚠️ Facteurs négatifs
                </h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Manque de nourriture (-20%)</li>
                  <li>• Manque d'oxygène (-25%)</li>
                  <li>• Surpopulation (-15%)</li>
                  <li>• Événements négatifs (variable)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ColonistsPage;
import React from 'react';
import { useGameState } from '../hooks/useGameState';
import Sidebar from '../components/Sidebar';

interface Technology {
  id: string;
  name: string;
  description: string;
  tier: number;
  cost: {
    minerals: number;
    energy: number;
  };
  researchTime: number; // en secondes
  unlocked: boolean;
  researched: boolean;
  requirements?: string[]; // IDs des technologies requises
}

const technologiesData: Technology[] = [
  // TIER 1
  {
    id: 'advanced_mining',
    name: 'Extraction améliorée',
    description: 'Augmente la production des foreuses de 50%',
    tier: 1,
    cost: { minerals: 100, energy: 50 },
    researchTime: 30,
    unlocked: true,
    researched: false,
  },
  {
    id: 'solar_efficiency',
    name: 'Panneaux solaires efficaces',
    description: 'Augmente la production énergétique des panneaux solaires de 30%',
    tier: 1,
    cost: { minerals: 80, energy: 40 },
    researchTime: 25,
    unlocked: true,
    researched: false,
  },
  {
    id: 'water_recycling',
    name: "Recyclage d'eau",
    description: "Réduit la consommation d'eau des bâtiments de 25%",
    tier: 1,
    cost: { minerals: 120, energy: 60 },
    researchTime: 35,
    unlocked: true,
    researched: false,
  },

  // TIER 2
  {
    id: 'nuclear_power',
    name: 'Énergie nucléaire',
    description: 'Débloque les réacteurs nucléaires',
    tier: 2,
    cost: { minerals: 300, energy: 150 },
    researchTime: 60,
    unlocked: false,
    researched: false,
    requirements: ['solar_efficiency'],
  },
  {
    id: 'advanced_habitats',
    name: 'Habitats avancés',
    description: 'Augmente la capacité des habitats de 50%',
    tier: 2,
    cost: { minerals: 250, energy: 100 },
    researchTime: 50,
    unlocked: false,
    researched: false,
    requirements: ['water_recycling'],
  },
  {
    id: 'greenhouse_tech',
    name: 'Serres automatisées',
    description: 'Augmente la production de nourriture et oxygène de 40%',
    tier: 2,
    cost: { minerals: 200, energy: 120 },
    researchTime: 45,
    unlocked: false,
    researched: false,
    requirements: ['advanced_mining'],
  },

  // TIER 3
  {
    id: 'fusion_reactor',
    name: 'Réacteur à fusion',
    description: 'Débloque les réacteurs à fusion (production énergétique massive)',
    tier: 3,
    cost: { minerals: 500, energy: 300 },
    researchTime: 120,
    unlocked: false,
    researched: false,
    requirements: ['nuclear_power'],
  },
  {
    id: 'terraforming',
    name: 'Terraformation basique',
    description: 'Permet de modifier progressivement l\'atmosphère',
    tier: 3,
    cost: { minerals: 600, energy: 400 },
    researchTime: 150,
    unlocked: false,
    researched: false,
    requirements: ['greenhouse_tech', 'advanced_habitats'],
  },
  {
    id: 'exploration_vehicles',
    name: "Véhicules d'exploration",
    description: 'Permet d\'explorer les zones éloignées de la planète',
    tier: 3,
    cost: { minerals: 400, energy: 250 },
    researchTime: 90,
    unlocked: false,
    researched: false,
    requirements: ['nuclear_power'],
  },
];

const ResearchPage: React.FC = () => {
  const { gameState, isPaused, setIsPaused, resetGame } = useGameState();

  const getTierTechnologies = (tier: number) => {
    return technologiesData.filter((tech) => tech.tier === tier);
  };

  const canResearch = (tech: Technology): boolean => {
    // Vérifier si on a les ressources
    const hasResources =
      gameState.resources.minerals >= tech.cost.minerals &&
      gameState.resources.energy >= tech.cost.energy;

    // Vérifier si les technologies requises sont recherchées
    const hasRequirements =
      !tech.requirements ||
      tech.requirements.every((reqId) => {
        const reqTech = technologiesData.find((t) => t.id === reqId);
        return reqTech?.researched;
      });

    return tech.unlocked && hasResources && hasRequirements && !tech.researched;
  };

  const handleResearch = (tech: Technology) => {
    if (canResearch(tech)) {
      alert(`Recherche lancée : ${tech.name}\nCela prendra ${tech.researchTime} secondes.`);
      // TODO: Implémenter le système de recherche dans useGameState
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
          <h1 className="text-4xl font-bold text-text-accent mb-2">🔬 Arbre Technologique</h1>
          <p className="text-text-secondary mb-8">
            Débloquez de nouvelles technologies pour améliorer votre colonie
          </p>

          {/* Tier 1 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                TIER 1
              </span>
              Technologies de base
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {getTierTechnologies(1).map((tech) => (
                <div
                  key={tech.id}
                  className={`p-5 rounded-lg border-2 transition ${
                    tech.researched
                      ? 'bg-green-900/30 border-green-500'
                      : canResearch(tech)
                      ? 'bg-background-panel border-text-accent cursor-pointer hover:bg-background-sidebar'
                      : 'bg-background-sidebar border-background-grid opacity-60'
                  }`}
                  onClick={() => canResearch(tech) && handleResearch(tech)}
                >
                  <h3 className="font-bold text-white text-lg mb-2">{tech.name}</h3>
                  <p className="text-sm text-text-secondary mb-3">{tech.description}</p>

                  <div className="flex items-center gap-3 text-xs mb-2">
                    <span className="text-gray-400">⛏ {tech.cost.minerals}</span>
                    <span className="text-yellow-400">⚡ {tech.cost.energy}</span>
                    <span className="text-cyan-400">⏱ {tech.researchTime}s</span>
                  </div>

                  {tech.researched ? (
                    <div className="text-sm text-green-400 font-semibold">✓ Recherchée</div>
                  ) : tech.unlocked ? (
                    <div className="text-sm text-text-accent">Cliquez pour rechercher</div>
                  ) : (
                    <div className="text-sm text-red-400">🔒 Verrouillée</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                TIER 2
              </span>
              Technologies avancées
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {getTierTechnologies(2).map((tech) => (
                <div
                  key={tech.id}
                  className={`p-5 rounded-lg border-2 transition ${
                    tech.researched
                      ? 'bg-green-900/30 border-green-500'
                      : canResearch(tech)
                      ? 'bg-background-panel border-text-accent cursor-pointer hover:bg-background-sidebar'
                      : 'bg-background-sidebar border-background-grid opacity-60'
                  }`}
                  onClick={() => canResearch(tech) && handleResearch(tech)}
                >
                  <h3 className="font-bold text-white text-lg mb-2">{tech.name}</h3>
                  <p className="text-sm text-text-secondary mb-3">{tech.description}</p>

                  <div className="flex items-center gap-3 text-xs mb-2">
                    <span className="text-gray-400">⛏ {tech.cost.minerals}</span>
                    <span className="text-yellow-400">⚡ {tech.cost.energy}</span>
                    <span className="text-cyan-400">⏱ {tech.researchTime}s</span>
                  </div>

                  {tech.requirements && (
                    <div className="text-xs text-text-secondary mb-2">
                      Requiert: {tech.requirements.join(', ')}
                    </div>
                  )}

                  {tech.researched ? (
                    <div className="text-sm text-green-400 font-semibold">✓ Recherchée</div>
                  ) : tech.unlocked ? (
                    <div className="text-sm text-text-accent">Cliquez pour rechercher</div>
                  ) : (
                    <div className="text-sm text-red-400">🔒 Verrouillée</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tier 3 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                TIER 3
              </span>
              Technologies expérimentales
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {getTierTechnologies(3).map((tech) => (
                <div
                  key={tech.id}
                  className={`p-5 rounded-lg border-2 transition ${
                    tech.researched
                      ? 'bg-green-900/30 border-green-500'
                      : canResearch(tech)
                      ? 'bg-background-panel border-text-accent cursor-pointer hover:bg-background-sidebar'
                      : 'bg-background-sidebar border-background-grid opacity-60'
                  }`}
                  onClick={() => canResearch(tech) && handleResearch(tech)}
                >
                  <h3 className="font-bold text-white text-lg mb-2">{tech.name}</h3>
                  <p className="text-sm text-text-secondary mb-3">{tech.description}</p>

                  <div className="flex items-center gap-3 text-xs mb-2">
                    <span className="text-gray-400">⛏ {tech.cost.minerals}</span>
                    <span className="text-yellow-400">⚡ {tech.cost.energy}</span>
                    <span className="text-cyan-400">⏱ {tech.researchTime}s</span>
                  </div>

                  {tech.requirements && (
                    <div className="text-xs text-text-secondary mb-2">
                      Requiert: {tech.requirements.join(', ')}
                    </div>
                  )}

                  {tech.researched ? (
                    <div className="text-sm text-green-400 font-semibold">✓ Recherchée</div>
                  ) : tech.unlocked ? (
                    <div className="text-sm text-text-accent">Cliquez pour rechercher</div>
                  ) : (
                    <div className="text-sm text-red-400">🔒 Verrouillée</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div className="bg-background-panel border border-text-accent rounded-lg p-4">
            <h3 className="text-text-accent font-semibold mb-2">💡 À propos de la recherche</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Les technologies débloquent de nouveaux bâtiments et améliorations</li>
              <li>• Certaines technologies nécessitent d'autres technologies comme prérequis</li>
              <li>• La recherche consomme des ressources instantanément</li>
              <li>• Les technologies Tier 2 et 3 offrent des bonus plus puissants</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchPage;
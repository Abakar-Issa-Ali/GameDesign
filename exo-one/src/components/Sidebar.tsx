import React from 'react';

interface SidebarProps {
  gameTime: number;
  morale: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  gameTime,
  morale,
  isPaused,
  onTogglePause,
  onReset,
}) => {
  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  };

  const menuItems = [
    { name: 'Base', icon: '🏗️', active: true },
    { name: 'Recherche', icon: '🔬', active: false },
    { name: 'Colons', icon: '👥', active: false },
    { name: 'Missions', icon: '📋', active: false },
    { name: 'Carte', icon: '🗺️', active: false },
  ];

  return (
    <aside className="w-56 bg-background-sidebar flex flex-col justify-between p-5">
      <div>
        <h1 className="text-text-accent font-bold text-xl mb-1">EXO-ONE</h1>
        <p className="text-xs text-text-secondary">Système Phaos - Sol 45</p>

        {/* Stats */}
        <div className="mt-4 p-3 bg-background-main rounded-lg">
          <div className="text-xs text-text-secondary mb-2">Temps de jeu:</div>
          <div className="text-sm text-white font-semibold">{formatTime(gameTime)}</div>

          <div className="text-xs text-text-secondary mt-3 mb-2">Moral des colons:</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-background-grid rounded-full overflow-hidden">
              <div
                className="h-full transition-all"
                style={{
                  width: `${morale}%`,
                  backgroundColor:
                    morale > 70 ? '#66CC66' : morale > 40 ? '#FFD700' : '#FF6666',
                }}
              />
            </div>
            <span className="text-sm text-white">{Math.floor(morale)}%</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-5">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`text-left text-[15px] py-2 px-3 rounded-md transition flex items-center gap-2 ${
                item.active
                  ? 'bg-sidebar-active text-white'
                  : 'text-text-secondary hover:bg-text-accent hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={onTogglePause}
            className={`py-2 px-3 rounded-md font-semibold transition ${
              isPaused
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            {isPaused ? '▶️ Reprendre' : '⏸️ Pause'}
          </button>

          <button
            onClick={onReset}
            className="py-2 px-3 rounded-md font-semibold bg-red-600 hover:bg-red-700 text-white transition"
          >
            🔄 Recommencer
          </button>
        </div>
      </div>

      <div className="text-sm text-text-secondary">
        <div className="mb-2">💾 Sauvegarde auto</div>
        <div className="text-xs">Version 1.0.0</div>
      </div>
    </aside>
  );
};

export default Sidebar;
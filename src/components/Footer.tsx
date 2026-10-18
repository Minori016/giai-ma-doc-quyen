import React from 'react';
import { TeamState } from '../types/game';
import { CharacterAvatar } from './GameIcons';

interface FooterProps {
  teams: TeamState[];
  currentTeamId: number;
  onSelectTeam: (teamId: number) => void;
  onOpenDiagram?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  teams,
  currentTeamId,
  onSelectTeam,
  onOpenDiagram,
}) => {
  return (
    <footer className="bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm select-none z-20">
      {/* 6 Team selection pills */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-0.5 no-scrollbar">
        {teams.map((team) => {
          const isActive = team.id === currentTeamId;
          const isEliminated = team.status === 'eliminated' || team.hearts <= 0;
          const isCompleted = team.status === 'completed';

          return (
            <button
              key={team.id}
              onClick={() => onSelectTeam(team.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer font-semibold shrink-0 ${
                isActive
                  ? 'bg-blue-50/90 border-blue-400 text-blue-900 shadow-xs ring-2 ring-blue-400/30'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {/* Character Avatar thumbnail & Dot */}
              <div
                className="w-4 h-4 rounded-full overflow-hidden border shrink-0 shadow-2xs"
                style={{ borderColor: team.color, backgroundColor: team.color }}
              >
                <CharacterAvatar id={team.characterId} className="w-full h-full" />
              </div>
              <span className="truncate">{team.name}</span>

              {/* Status indicators */}
              {isCompleted && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                  ✓ Xong
                </span>
              )}
              {isEliminated && (
                <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded-full">
                  Loại
                </span>
              )}
              {!isCompleted && !isEliminated && team.cards.length > 0 && (
                <span className="text-[11px] font-bold text-amber-700">
                  {team.cards.length}/8
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right Hint */}
      <div className="hidden lg:flex items-center gap-2 text-slate-600 font-medium shrink-0">
        <span className="text-amber-600 font-bold">✨</span>
        <button
          onClick={onOpenDiagram}
          className="hover:text-blue-600 hover:underline cursor-pointer transition-colors"
        >
          Thu đủ 8 thẻ để ghép sơ đồ.
        </button>
      </div>
    </footer>
  );
};

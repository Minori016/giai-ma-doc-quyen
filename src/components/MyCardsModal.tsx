import React from 'react';
import { KNOWLEDGE_CARDS } from '../data/gameData';
import { TeamState } from '../types/game';
import { TileIcon } from './GameIcons';
import { formatTime } from '../game/logic';
import { Check, Lock, X } from 'lucide-react';
import { sound } from '../utils/sound';

interface MyCardsModalProps {
  team: TeamState;
  timeRemaining: number;
  onClose: () => void;
  onOpenDiagram?: () => void;
}

export const MyCardsModal: React.FC<MyCardsModalProps> = ({
  team,
  timeRemaining,
  onClose,
  onOpenDiagram,
}) => {
  const isFull = team.cards.length >= 8;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-4 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          {/* Team Info */}
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full shadow-2xs"
              style={{ backgroundColor: team.color }}
            />
            <span className="font-extrabold text-slate-800 text-sm sm:text-base">{team.name}</span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3].map((h) => (
                <span
                  key={h}
                  className={`text-sm ${h <= team.hearts ? 'text-red-500' : 'text-slate-300 opacity-50'}`}
                >
                  ❤️
                </span>
              ))}
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700 font-bold text-xs sm:text-sm">
              📍 Ô {team.currentTile.toString().padStart(2, '0')}/32
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-bold text-amber-700 text-xs sm:text-sm">
              Thẻ {team.cards.length}/8
            </span>
          </div>

          {/* Timer & Close */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold text-xs sm:text-sm px-3 py-1 rounded-full">
              <span>⏱️</span>
              <span>{formatTime(timeRemaining)}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center my-3 sm:my-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            THẺ CỦA TÔI
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
            Đã thu thập <span className="text-teal-700 font-bold">{team.cards.length}/8</span> thẻ
          </p>
        </div>

        {/* 8 Cards Grid (2 rows of 4) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-2 sm:my-3">
          {KNOWLEDGE_CARDS.map((card) => {
            const isCollected = team.cards.includes(card.id);

            if (isCollected) {
              return (
                <div
                  key={card.id}
                  className="relative flex flex-col items-center justify-between p-3 sm:p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-300 text-slate-900 shadow-sm min-h-[120px] sm:min-h-[140px] text-center"
                >
                  {/* Top-right checkmark */}
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs z-10">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>

                  {/* 3D Embossed Icon */}
                  <div className="my-auto py-1 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-200/90 to-amber-50 border border-amber-300 flex items-center justify-center shadow-sm">
                      <TileIcon name={card.icon} className="w-7 h-7 text-amber-800 drop-shadow-xs" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-xs sm:text-sm font-extrabold leading-snug text-amber-950">
                    {card.title}
                  </div>
                </div>
              );
            }

            // Uncollected card
            return (
              <div
                key={card.id}
                className="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-100/80 border-2 border-slate-200 text-slate-400 shadow-2xs min-h-[120px] sm:min-h-[140px] text-center"
              >
                <div className="my-auto py-1 opacity-50">
                  <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="text-xs font-bold text-slate-400">
                  Chưa thu thập
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Banner & Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs sm:text-sm font-semibold text-slate-600 text-center sm:text-left">
            {isFull ? (
              <span className="text-emerald-700 font-bold">
                🎉 Bạn đã thu đủ 8 thẻ! Có thể ghép sơ đồ ngay để chiến thắng!
              </span>
            ) : (
              <span>Thu đủ 8 thẻ để mở ghép sơ đồ.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isFull && onOpenDiagram && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                  onOpenDiagram();
                }}
                className="px-6 py-2.5 rounded-xl font-black text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Ghép sơ đồ ngay
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-teal-700 hover:bg-teal-800 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Tiếp tục chơi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

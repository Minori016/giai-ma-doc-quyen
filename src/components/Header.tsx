import React from 'react';
import { LogoIcon, CharacterAvatar } from './GameIcons';
import { formatTime } from '../game/logic';
import { TeamState } from '../types/game';
import { BookOpen, Trophy, HelpCircle, Volume2, VolumeX, QrCode, BarChart3 } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  currentTeam: TeamState;
  teams: TeamState[];
  timeRemaining: number;
  onOpenMyCards: () => void;
  onOpenLeaderboard: () => void;
  onOpenRules: () => void;
  onOpenQR: () => void;
  onOpenDiagram?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTeam,
  teams,
  timeRemaining,
  onOpenMyCards,
  onOpenLeaderboard,
  onOpenRules,
  onOpenQR,
  onOpenDiagram,
}) => {
  const [isMuted, setIsMuted] = React.useState(sound.getMuted());

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Compute TOP 1, 2, 3
  const completedTeams = teams
    .filter((t) => t.status === 'completed' && t.completionTime !== null)
    .sort((a, b) => (a.completionTime ?? 9999) - (b.completionTime ?? 9999));

  const top1 = completedTeams[0] ? `${completedTeams[0].name}` : '—';
  const top2 = completedTeams[1] ? `${completedTeams[1].name}` : '—';
  const top3 = completedTeams[2] ? `${completedTeams[2].name}` : '—';

  // Format current location / status text
  const getLocationText = () => {
    if (currentTeam.status === 'completed') return 'Hoàn thành';
    if (currentTeam.status === 'diagram') return 'Ghép sơ đồ';
    if (currentTeam.status === 'eliminated') return 'Bị loại';
    if (currentTeam.status === 'timed_out') return 'Hết giờ';
    if (currentTeam.status === 'ready') return 'Chưa bắt đầu';
    return `Ô ${currentTeam.currentTile.toString().padStart(2, '0')}/32`;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm mx-2 sm:mx-4 my-2 px-3 sm:px-6 py-2 sm:py-2.5 flex flex-col gap-1.5 sm:gap-2 text-slate-800 z-30 select-none">
      {/* Top Row: Brand & Podium */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Left: 3D Logo & Title */}
        <div className="flex items-center gap-2.5">
          <LogoIcon className="w-8 h-8 sm:w-9 sm:h-9" />
          <h1 className="font-black text-lg sm:text-xl md:text-2xl tracking-tight text-[#0F1E36] uppercase">
            Giải Mã Độc Quyền
          </h1>
          <span className="hidden sm:inline text-slate-300 font-light text-xl">|</span>
        </div>

        {/* Right: TOP 3 summary */}
        <div className="flex items-center gap-2 sm:gap-2.5 text-xs font-semibold">
          <span className="text-base sm:text-lg">🥇</span>
          <span className="font-black text-[#1E3A8A] uppercase tracking-wide">TOP</span>
          
          <div className="flex items-center gap-3 sm:gap-4 bg-[#F8FAFC] border border-slate-200/90 px-3.5 py-1 rounded-full text-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center text-[10px] shadow-2xs">1</span>
              <span className="font-bold text-slate-700">{top1}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-300 text-slate-800 font-black flex items-center justify-center text-[10px] shadow-2xs">2</span>
              <span className="font-bold text-slate-700">{top2}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-amber-700 text-white font-black flex items-center justify-center text-[10px] shadow-2xs">3</span>
              <span className="font-bold text-slate-700">{top3}</span>
            </div>

            <span className="text-slate-300 font-light">|</span>
            <span className="text-slate-700 font-bold">{teams.length} nhóm</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Active Team Status & Action Buttons */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-t border-slate-100/90 pt-1.5">
        {/* Left: Active Team Quick Status */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-800 flex-wrap">
          {/* Active Team Name */}
          <div className="flex items-center gap-1.5 text-blue-900 font-extrabold">
            <span className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0" style={{ backgroundColor: currentTeam.color }} />
            <span>{currentTeam.name}</span>
          </div>

          <span className="text-slate-300">|</span>

          {/* Hearts */}
          <div className="flex items-center gap-1" title={`${currentTeam.hearts} tim còn lại`}>
            {[1, 2, 3].map((heartIndex) => (
              <span
                key={heartIndex}
                className={`text-sm ${heartIndex <= currentTeam.hearts ? 'text-red-500 scale-105' : 'text-slate-300 opacity-60'}`}
              >
                ❤️
              </span>
            ))}
          </div>

          <span className="text-slate-300">|</span>

          {/* Location */}
          <button
            onClick={() => {
              if (currentTeam.cards.length >= 8 && onOpenDiagram) {
                onOpenDiagram();
              }
            }}
            className={`flex items-center gap-1 font-bold ${
              currentTeam.status === 'diagram' || currentTeam.cards.length >= 8
                ? 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full hover:bg-emerald-100 cursor-pointer transition-colors'
                : 'text-teal-700'
            }`}
          >
            <span className="text-xs">📍</span>
            <span>{getLocationText()}</span>
          </button>

          <span className="text-slate-300">|</span>

          {/* Cards Count */}
          <button
            onClick={onOpenMyCards}
            className="flex items-center gap-1 text-amber-700 hover:text-amber-800 cursor-pointer font-extrabold"
            title="Xem kho thẻ kiến thức"
          >
            <span>🎴</span>
            <span>Thẻ {currentTeam.cards.length}/8</span>
          </button>
        </div>

        {/* Right: Timer & Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Countdown Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-blue-200 text-blue-900 font-mono font-black text-xs sm:text-sm shadow-2xs">
            <span className="text-blue-700">⏱</span>
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* My Cards Button */}
          <button
            onClick={onOpenMyCards}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-blue-50/60 border border-blue-200/90 text-blue-900 font-bold text-xs shadow-2xs cursor-pointer transition-all active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
            <span>Thẻ của tôi</span>
          </button>

          {/* Leaderboard Button */}
          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-blue-50/60 border border-blue-200/90 text-blue-900 font-bold text-xs shadow-2xs cursor-pointer transition-all active:scale-95"
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-700" />
            <span>Xếp hạng</span>
          </button>

          {/* Rules Button */}
          <button
            onClick={onOpenRules}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-blue-50/60 border border-blue-200/90 text-blue-900 font-bold text-xs shadow-2xs cursor-pointer transition-all active:scale-95"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>Luật chơi</span>
          </button>

          {/* QR Code */}
          <button
            onClick={onOpenQR}
            className="p-1 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs cursor-pointer"
            title="Mã QR tham gia"
          >
            <QrCode className="w-4 h-4 text-slate-700" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-1 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs cursor-pointer"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

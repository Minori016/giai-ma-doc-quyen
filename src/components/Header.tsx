import React from 'react';
import { LogoIcon, CharacterAvatar } from './GameIcons';
import { formatTime } from '../game/logic';
import { TeamState } from '../types/game';
import { BookOpen, Trophy, HelpCircle, Volume2, VolumeX, QrCode } from 'lucide-react';
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

  const top1 = completedTeams[0] ? `${completedTeams[0].name} • ${formatTime(completedTeams[0].completionTime!)}` : '—';
  const top2 = completedTeams[1] ? `${completedTeams[1].name} • ${formatTime(completedTeams[1].completionTime!)}` : '—';
  const top3 = completedTeams[2] ? `${completedTeams[2].name} • ${formatTime(completedTeams[2].completionTime!)}` : '—';

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
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-slate-800 z-30 select-none">
      {/* Left: Brand & Active Team Status */}
      <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
        <div className="flex items-center gap-2">
          <LogoIcon className="w-8 h-8 drop-shadow-xs" />
          <h1 className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 uppercase">
            Giải Mã Độc Quyền
          </h1>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-6 w-px bg-slate-300" />

        {/* Team Status Pill */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 shadow-2xs text-xs sm:text-sm font-semibold">
          <div
            className="w-5 h-5 rounded-full overflow-hidden border shrink-0 shadow-2xs"
            style={{ borderColor: currentTeam.color, backgroundColor: currentTeam.color }}
          >
            <CharacterAvatar id={currentTeam.characterId} className="w-full h-full" />
          </div>
          <span className="font-bold text-slate-800">{currentTeam.name}</span>

          <span className="text-slate-300">|</span>

          {/* Hearts */}
          <div className="flex items-center gap-0.5" title={`${currentTeam.hearts} tim còn lại`}>
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

          {/* Location / Status */}
          <button
            onClick={() => {
              if (currentTeam.cards.length >= 8 && onOpenDiagram) {
                onOpenDiagram();
              }
            }}
            className={`flex items-center gap-1 font-semibold ${
              currentTeam.status === 'diagram' || currentTeam.cards.length >= 8
                ? 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full hover:bg-emerald-100 cursor-pointer transition-colors'
                : 'text-slate-700'
            }`}
          >
            <span className="text-xs">📍</span>
            <span>{getLocationText()}</span>
          </button>

          <span className="text-slate-300">|</span>

          {/* Cards collected */}
          <button
            onClick={onOpenMyCards}
            className="flex items-center gap-1 text-amber-700 hover:text-amber-800 cursor-pointer font-bold"
            title="Xem kho thẻ kiến thức"
          >
            <span>🎴</span>
            <span>Thẻ {currentTeam.cards.length}/8</span>
          </button>
        </div>
      </div>

      {/* Right Controls: Timer, Top, Action buttons */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Top 3 summary */}
        <div className="hidden xl:flex items-center gap-2 bg-amber-50/80 border border-amber-200/80 rounded-full px-3 py-1 text-xs font-semibold text-amber-900">
          <span className="text-sm">🏆</span>
          <span className="font-extrabold uppercase tracking-wide text-amber-800">TOP</span>
          <span className="inline-flex items-center gap-1 bg-amber-400/30 text-amber-900 px-2 py-0.5 rounded-full font-bold">
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">1</span>
            {top1}
          </span>
          <span className="inline-flex items-center gap-1 bg-slate-200/60 text-slate-700 px-2 py-0.5 rounded-full">
            <span className="w-4 h-4 rounded-full bg-slate-400 text-white flex items-center justify-center text-[10px]">2</span>
            {top2}
          </span>
          <span className="inline-flex items-center gap-1 bg-amber-700/20 text-amber-800 px-2 py-0.5 rounded-full">
            <span className="w-4 h-4 rounded-full bg-amber-700 text-white flex items-center justify-center text-[10px]">3</span>
            {top3}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-medium">6 nhóm</span>
        </div>

        {/* Countdown Timer */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono font-bold text-sm sm:text-base border ${
            timeRemaining <= 120
              ? 'bg-red-50 border-red-300 text-red-600 animate-pulse'
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}
          title="Thời gian làm bài còn lại"
        >
          <span>⏱️</span>
          <span>{formatTime(timeRemaining)}</span>
        </div>

        {/* Buttons */}
        <button
          onClick={onOpenMyCards}
          className="flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs px-2.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer transition-all active:scale-95"
          title="Kho thẻ của tôi"
        >
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">Thẻ của tôi</span>
        </button>

        <button
          onClick={onOpenLeaderboard}
          className="flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs px-2.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer transition-all active:scale-95"
          title="Xem bảng xếp hạng"
        >
          <Trophy className="w-4 h-4 text-amber-600" />
          <span className="hidden sm:inline">Xếp hạng</span>
        </button>

        <button
          onClick={onOpenRules}
          className="flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs px-2.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer transition-all active:scale-95"
          title="Xem luật chơi"
        >
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">Luật chơi</span>
        </button>

        <button
          onClick={onOpenQR}
          className="p-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs rounded-xl cursor-pointer transition-all"
          title="Mã QR tham gia"
        >
          <QrCode className="w-4 h-4 text-slate-700" />
        </button>

        <button
          onClick={handleToggleMute}
          className="p-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs rounded-xl cursor-pointer transition-all"
          title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
        </button>
      </div>
    </header>
  );
};

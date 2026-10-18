import React, { useState } from 'react';
import { TeamState } from '../types/game';
import { Check, Copy, CheckCheck, QrCode, Play, UserCheck } from 'lucide-react';
import { LobbyIllustration3D, CharacterAvatar } from './GameIcons';
import { sound } from '../utils/sound';

interface LobbyModalProps {
  teams: TeamState[];
  currentTeam: TeamState;
  roomCode: string;
  onStartGame: () => void;
  onOpenCharacterSelect: () => void;
  onOpenQR: () => void;
}

export const LobbyModal: React.FC<LobbyModalProps> = ({
  teams,
  currentTeam,
  roomCode,
  onStartGame,
  onOpenCharacterSelect,
  onOpenQR,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    sound.playClick();
    navigator.clipboard?.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col items-center p-5 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        {/* City trophy 3D transparent illustration */}
        <div className="my-2 flex justify-center">
          <LobbyIllustration3D className="w-36 h-24 sm:w-48 sm:h-28 drop-shadow-md" />
        </div>

        {/* Title */}
        <div className="my-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            PHÒNG CHỜ
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
            Chờ người tổ chức bắt đầu trò chơi.
          </p>
        </div>

        {/* Room Code Pill */}
        <div className="my-2.5 flex items-center gap-2 bg-slate-100/90 border border-slate-200 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-700 shadow-2xs">
          <span>Mã phòng: <strong className="text-slate-900 tracking-wider font-mono text-sm sm:text-base">{roomCode}</strong></span>
          <button
            onClick={handleCopyCode}
            className="p-1 hover:bg-slate-200 rounded-md transition-colors cursor-pointer text-slate-600"
            title="Sao chép mã phòng"
          >
            {copied ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={onOpenQR}
            className="p-1 hover:bg-slate-200 rounded-md transition-colors cursor-pointer text-slate-600"
            title="Xem mã QR"
          >
            <QrCode className="w-4 h-4 text-blue-600" />
          </button>
        </div>

        {/* 6 Teams Readiness Grid (2 columns x 3 rows) */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3">
          {teams.map((t) => {
            const isUserTeam = t.id === currentTeam.id;

            return (
              <div
                key={t.id}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all ${
                  isUserTeam
                    ? 'border-blue-400 bg-blue-50/70 shadow-xs ring-2 ring-blue-400/20'
                    : 'border-slate-200 bg-slate-50/80 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div
                    className="w-6 h-6 rounded-full overflow-hidden border-2 shrink-0 shadow-2xs"
                    style={{ borderColor: t.color, backgroundColor: t.color }}
                  >
                    <CharacterAvatar id={t.characterId} className="w-full h-full" />
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                    {t.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Sẵn sàng</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Participants & Game Summary Stats */}
        <div className="my-2">
          <div className="font-extrabold text-xs sm:text-sm text-slate-800">
            Số nhóm tham gia: <span className="text-teal-700">6/6</span>
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600 mt-1">
            <span>⏱️ 15 phút</span>
            <span>•</span>
            <span>❤️ 3 tim</span>
            <span>•</span>
            <span>🎴 Thu đủ 8 thẻ</span>
          </div>
        </div>

        {/* Action Buttons: Đã sẵn sàng / Bắt đầu & Đổi nhân vật */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onStartGame();
            }}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm sm:text-base shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Bắt đầu trò chơi</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenCharacterSelect();
            }}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-extrabold text-sm sm:text-base shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-slate-600" />
            <span>Đổi nhân vật</span>
          </button>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-3">
          Trò chơi bắt đầu khi người tổ chức xác nhận. Các nhóm chơi đồng thời, không cần chờ lượt!
        </p>
      </div>
    </div>
  );
};

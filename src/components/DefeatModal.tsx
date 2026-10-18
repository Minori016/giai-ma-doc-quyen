import React from 'react';
import { TeamState } from '../types/game';
import { AlertCircle, BarChart3, Home } from 'lucide-react';
import { sound } from '../utils/sound';

interface DefeatModalProps {
  team: TeamState;
  reason: 'timeout' | 'eliminated_hearts' | 'eliminated_challenge';
  onOpenLeaderboard: () => void;
  onReturnLobby: () => void;
}

export const DefeatModal: React.FC<DefeatModalProps> = ({
  team,
  reason,
  onOpenLeaderboard,
  onReturnLobby,
}) => {
  const getTitleAndSub = () => {
    switch (reason) {
      case 'timeout':
        return {
          title: 'HẾT GIỜ',
          status: 'THUA CUỘC',
          reasonText: 'Chưa thu đủ 8 thẻ kiến thức trong 15 phút.',
          banner: 'Chưa đủ thẻ nên chưa thể ghép sơ đồ.',
        };
      case 'eliminated_hearts':
        return {
          title: 'HẾT TIM',
          status: 'BỊ LOẠI',
          reasonText: 'Nhóm đã mất toàn bộ 3 tim do trả lời sai nhiều câu hỏi.',
          banner: 'Nhóm đã dừng cuộc chơi sớm.',
        };
      case 'eliminated_challenge':
        return {
          title: 'THẤT BẠI',
          status: 'BỊ LOẠI',
          reasonText: 'Trả lời sai tại ô Thử thách rủi ro cao.',
          banner: 'Luật chơi: Trả lời sai tại ô Thử thách bị loại ngay.',
        };
    }
  };

  const info = getTitleAndSub();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col items-center p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        {/* Top Team Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-4 h-4 rounded-full shadow-2xs"
            style={{ backgroundColor: team.color }}
          />
          <span className="font-extrabold text-slate-800 text-sm">{team.name}</span>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3].map((h) => (
              <span
                key={h}
                className={`text-sm ${h <= team.hearts ? 'text-red-500' : 'text-slate-300 opacity-40'}`}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>

        {/* Digital Time / Broken Clock Visual */}
        <div className="my-2 flex flex-col items-center">
          <div className="bg-slate-900 border-2 border-red-500/60 text-red-500 font-mono font-black text-3xl sm:text-4xl px-6 py-2 rounded-2xl shadow-inner tracking-widest animate-pulse">
            00:00
          </div>
        </div>

        {/* Title & Status */}
        <div className="my-2">
          <h2 className="text-3xl sm:text-4xl font-black text-rose-600 uppercase tracking-tight">
            {info.title}
          </h2>
          <div className="inline-block bg-rose-600 text-white font-black text-sm sm:text-base px-6 py-1 rounded-full shadow-md my-1.5 uppercase tracking-wide">
            {info.status}
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1 px-4">
            {info.reasonText}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="w-full grid grid-cols-2 gap-3 my-3">
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-2xl p-3 shadow-2xs text-left">
            <span className="text-2xl">🎴</span>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Thẻ đã nhận
              </div>
              <div className="text-base sm:text-lg font-black text-slate-800">
                {team.cards.length}/8
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-2xl p-3 shadow-2xs text-left">
            <span className="text-2xl">⏱️</span>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Thời gian
              </div>
              <div className="text-base sm:text-lg font-black text-slate-800">
                15:00
              </div>
            </div>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="w-full bg-rose-50 border border-rose-200 text-rose-800 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 mb-4">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{info.banner}</span>
        </div>

        {/* Actions */}
        <div className="w-full flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Xem xếp hạng</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onReturnLobby();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-extrabold text-xs sm:text-sm shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-600" />
            <span>Về phòng chờ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

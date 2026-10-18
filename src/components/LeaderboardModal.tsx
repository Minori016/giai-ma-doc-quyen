import React from 'react';
import { TeamState } from '../types/game';
import { computeLeaderboard } from '../game/logic';
import { Trophy, Info, X } from 'lucide-react';
import { sound } from '../utils/sound';

interface LeaderboardModalProps {
  teams: TeamState[];
  onClose: () => void;
  onReturnLobby: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  teams,
  onClose,
  onReturnLobby,
}) => {
  const leaderboardData = computeLeaderboard(teams);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-5 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy & Title */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 shadow-xs mb-2">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            BẢNG XẾP HẠNG
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">
            Kết quả cuối cùng
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 my-2 shadow-2xs">
          <table className="w-full text-left text-[11px] sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-extrabold uppercase text-[9px] sm:text-[11px] border-b border-slate-200">
                <th className="py-2.5 px-1.5 sm:px-3 text-center">Hạng</th>
                <th className="py-2.5 px-1.5 sm:px-3">Nhóm</th>
                <th className="py-2.5 px-1 text-center">Thẻ</th>
                <th className="py-2.5 px-1 text-center">Tim</th>
                <th className="py-2.5 px-1.5 sm:px-3 text-center">Thời gian</th>
                <th className="py-2.5 px-1.5 sm:px-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              {leaderboardData.map((row) => {
                const { rank, team, statusText, statusBadge, formattedTime } = row;

                return (
                  <tr key={team.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Rank column */}
                    <td className="py-2 px-1 sm:px-3 text-center">
                      {rank === 1 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500 text-white font-black text-[10px] sm:text-xs shadow-xs">
                          1
                        </span>
                      )}
                      {rank === 2 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-400 text-white font-black text-[10px] sm:text-xs shadow-xs">
                          2
                        </span>
                      )}
                      {rank === 3 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-700 text-white font-black text-[10px] sm:text-xs shadow-xs">
                          3
                        </span>
                      )}
                      {rank === '-' && <span className="text-slate-400 font-bold">—</span>}
                    </td>

                    {/* Team Column */}
                    <td className="py-2 px-1 sm:px-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span
                          className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full shrink-0 shadow-2xs"
                          style={{ backgroundColor: team.color }}
                        />
                        <span className="font-extrabold text-slate-900 truncate max-w-[70px] sm:max-w-none">{team.name}</span>
                      </div>
                    </td>

                    {/* Cards Column */}
                    <td className="py-2 px-1 text-center font-bold text-amber-800">
                      {team.cards.length}/8
                    </td>

                    {/* Hearts Column */}
                    <td className="py-2 px-1 text-center">
                      <div className="flex items-center justify-center gap-0.5">
                        {[1, 2, 3].map((h) => (
                          <span
                            key={h}
                            className={`text-[10px] sm:text-xs ${h <= team.hearts ? 'text-red-500' : 'text-slate-300 opacity-40'}`}
                          >
                            ❤️
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Time Column */}
                    <td className="py-2 px-1 sm:px-3 text-center font-mono font-bold text-slate-700 text-[10px] sm:text-xs">
                      {formattedTime}
                    </td>

                    {/* Status Badge */}
                    <td className="py-2 px-1 sm:px-3 text-center">
                      {statusBadge === 'completed' && (
                        <span className="inline-block px-1.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold bg-emerald-100 text-emerald-800 shadow-2xs">
                          Hoàn thành
                        </span>
                      )}
                      {statusBadge === 'defeat' && (
                        <span className="inline-block px-1.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold bg-rose-100 text-rose-700">
                          Thua
                        </span>
                      )}
                      {statusBadge === 'eliminated' && (
                        <span className="inline-block px-1.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold bg-slate-200 text-slate-700">
                          Bị loại
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-semibold my-2">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>Chỉ nhóm ghép đúng toàn bộ sơ đồ mới được xếp hạng.</span>
        </div>

        {/* Return to Lobby Button */}
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onReturnLobby();
            }}
            className="w-full sm:w-auto px-12 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm sm:text-base shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Về phòng chờ
          </button>
        </div>
      </div>
    </div>
  );
};

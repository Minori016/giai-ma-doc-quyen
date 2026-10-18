import React, { useEffect, useRef } from 'react';
import { TeamState } from '../types/game';
import { formatTime } from '../game/logic';
import { Trophy, BarChart3, Home, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface VictoryModalProps {
  team: TeamState;
  rank: number;
  onOpenLeaderboard: () => void;
  onReturnLobby: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  team,
  rank,
  onOpenLeaderboard,
  onReturnLobby,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Confetti particles effect on canvas
  useEffect(() => {
    sound.playVictory();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 500;

    const colors = ['#F59E0B', '#FBBF24', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'];
    const particles: Array<{
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngleIncremental: number;
      tiltAngle: number;
    }> = [];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 40 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      });
    }

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 2 + p.r / 2) / 2;
        p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();

        if (p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = -10;
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    let i = 0;
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col items-center p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        {/* Canvas for Confetti */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Golden Trophy Artwork */}
        <div className="relative z-20 my-2">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-100 flex items-center justify-center shadow-lg border-4 border-amber-200">
            <Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-amber-700 drop-shadow-md" />
          </div>
        </div>

        {/* Title & Rank Banner */}
        <div className="relative z-20 my-2">
          <h2 className="text-3xl sm:text-4xl font-black text-amber-950 uppercase tracking-tight drop-shadow-xs">
            CHIẾN THẮNG
          </h2>

          <div className="inline-block mt-2">
            <span
              className="inline-block px-4 py-1 rounded-full text-white font-extrabold text-sm sm:text-base shadow-xs"
              style={{ backgroundColor: team.color }}
            >
              {team.name}
            </span>
          </div>

          <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-black text-lg sm:text-xl px-8 py-1.5 rounded-full shadow-md border border-amber-300 my-2 tracking-wide">
            HẠNG {rank}
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
            Đã ghép đúng toàn bộ sơ đồ.
          </p>
        </div>

        {/* Two Stats Cards */}
        <div className="relative z-20 w-full grid grid-cols-2 gap-3 my-3">
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-2xl p-3 shadow-2xs text-left">
            <span className="text-2xl">🎴</span>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Thẻ kiến thức
              </div>
              <div className="text-base sm:text-lg font-black text-slate-800">
                8/8
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-2xl p-3 shadow-2xs text-left">
            <span className="text-2xl">⏱️</span>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Thời gian hoàn thành
              </div>
              <div className="text-base sm:text-lg font-black text-slate-800">
                {team.completionTime ? formatTime(team.completionTime) : '--'}
              </div>
            </div>
          </div>
        </div>

        {/* Green pill: Sơ đồ hoàn thành */}
        <div className="relative z-20 w-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-xs sm:text-sm py-2 px-4 rounded-xl flex items-center justify-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Sơ đồ hoàn thành</span>
        </div>

        {/* Actions */}
        <div className="relative z-20 w-full flex items-center justify-center gap-3">
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

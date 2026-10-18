import React, { useState } from 'react';
import { Copy, CheckCheck, X, Share2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface HostQRModalProps {
  roomCode: string;
  onClose: () => void;
}

export const HostQRModal: React.FC<HostQRModalProps> = ({ roomCode, onClose }) => {
  const [copied, setCopied] = useState(false);

  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}?room=${roomCode}` : `https://monopoly.game?room=${roomCode}`;

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard?.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col items-center p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="my-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            MÃ QR THAM GIA PHÒNG
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
            Mỗi nhóm dùng 1 điện thoại quét mã để thi đấu.
          </p>
        </div>

        {/* QR Code SVG rendering */}
        <div className="my-4 p-4 bg-white border-2 border-slate-200 rounded-3xl shadow-md flex items-center justify-center">
          <svg className="w-48 h-48 sm:w-56 sm:h-56" viewBox="0 0 100 100" fill="none">
            {/* Background */}
            <rect width="100" height="100" fill="white" />
            {/* QR Pattern visual elements */}
            {/* Top-left marker */}
            <rect x="10" y="10" width="24" height="24" rx="4" stroke="#0F172A" strokeWidth="4" fill="none" />
            <rect x="16" y="16" width="12" height="12" rx="2" fill="#0F172A" />
            {/* Top-right marker */}
            <rect x="66" y="10" width="24" height="24" rx="4" stroke="#0F172A" strokeWidth="4" fill="none" />
            <rect x="72" y="16" width="12" height="12" rx="2" fill="#0F172A" />
            {/* Bottom-left marker */}
            <rect x="10" y="66" width="24" height="24" rx="4" stroke="#0F172A" strokeWidth="4" fill="none" />
            <rect x="16" y="72" width="12" height="12" rx="2" fill="#0F172A" />
            {/* Grid bits */}
            <rect x="40" y="12" width="6" height="6" fill="#0F172A" />
            <rect x="50" y="12" width="8" height="6" fill="#0F172A" />
            <rect x="42" y="24" width="8" height="6" fill="#0F172A" />
            <rect x="54" y="22" width="6" height="8" fill="#0F172A" />
            <rect x="12" y="40" width="6" height="8" fill="#0F172A" />
            <rect x="22" y="44" width="8" height="6" fill="#0F172A" />
            <rect x="36" y="38" width="10" height="10" rx="2" fill="#0284C7" />
            <rect x="52" y="40" width="6" height="6" fill="#0F172A" />
            <rect x="64" y="42" width="10" height="6" fill="#0F172A" />
            <rect x="80" y="40" width="8" height="8" fill="#0F172A" />
            <rect x="40" y="56" width="6" height="12" fill="#0F172A" />
            <rect x="52" y="54" width="8" height="8" fill="#0F172A" />
            <rect x="68" y="58" width="8" height="6" fill="#0F172A" />
            <rect x="42" y="74" width="12" height="6" fill="#0F172A" />
            <rect x="58" y="72" width="8" height="10" fill="#0F172A" />
            <rect x="72" y="70" width="6" height="8" fill="#0F172A" />
            <rect x="82" y="80" width="8" height="8" fill="#0F172A" />
            {/* Center icon: Golden monogram */}
            <circle cx="50" cy="50" r="9" fill="#0F172A" />
            <circle cx="50" cy="50" r="7" fill="#F59E0B" />
            <text x="50" y="54" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="900">ĐQ</text>
          </svg>
        </div>

        {/* Room Code */}
        <div className="bg-slate-100 px-6 py-2 rounded-2xl border border-slate-200 mb-3">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Mã phòng thi đấu
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-widest font-mono">
            {roomCode}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all cursor-pointer"
        >
          {copied ? <CheckCheck className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Đã sao chép link tham gia!' : 'Sao chép link mời nhóm'}</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { CHARACTERS } from '../data/gameData';
import { TeamState } from '../types/game';
import { Check, ChevronRight, RotateCcw } from 'lucide-react';
import { sound } from '../utils/sound';

interface CharacterSelectModalProps {
  currentTeam: TeamState;
  onSave: (teamName: string, characterId: number) => void;
  onClose: () => void;
}

interface CardTheme {
  badgeBg: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  watermark: React.ReactNode;
}

const CARD_THEMES: Record<number, CardTheme> = {
  1: {
    badgeBg: '#0284C7',
    bgGradient: 'from-[#DCEEFB] via-[#D5ECFB] to-[#C4E2FA]',
    borderColor: 'border-[#BAE6FD]',
    textColor: '#0284C7',
    watermark: (
      <svg className="w-full h-full" viewBox="0 0 100 120" fill="none">
        <rect x="5" y="45" width="22" height="65" fill="#93C5FD" fillOpacity="0.25" />
        <rect x="12" y="30" width="18" height="80" fill="#93C5FD" fillOpacity="0.3" />
        <rect x="68" y="45" width="6" height="25" rx="1" fill="#93C5FD" fillOpacity="0.4" />
        <rect x="78" y="32" width="6" height="38" rx="1" fill="#93C5FD" fillOpacity="0.45" />
        <rect x="88" y="20" width="6" height="50" rx="1" fill="#93C5FD" fillOpacity="0.5" />
        <path d="M64 45L77 30L95 16" stroke="#93C5FD" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
      </svg>
    ),
  },
  2: {
    badgeBg: '#EF4444',
    bgGradient: 'from-[#FDE8EC] via-[#FCD9E0] to-[#FCCAD4]',
    borderColor: 'border-[#FECDD3]',
    textColor: '#C9182B',
    watermark: (
      <svg className="w-full h-full" viewBox="0 0 100 120" fill="none">
        <rect x="5" y="35" width="28" height="75" fill="#F472B6" fillOpacity="0.22" />
        <path d="M5 35 Q19 22 33 35 Z" fill="#F472B6" fillOpacity="0.22" />
        <rect x="70" y="30" width="25" height="80" fill="#F472B6" fillOpacity="0.25" />
        <rect x="74" y="38" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity="0.4" />
        <rect x="84" y="38" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity="0.4" />
      </svg>
    ),
  },
  3: {
    badgeBg: '#9333EA',
    bgGradient: 'from-[#F3E8FF] via-[#EADBFA] to-[#DFCCF8]',
    borderColor: 'border-[#E9D5FF]',
    textColor: '#7E22CE',
    watermark: (
      <svg className="w-full h-full" viewBox="0 0 100 120" fill="none">
        <g transform="translate(62, 18) scale(0.9)" opacity="0.45">
          <path d="M16 4C10.5 4 6 8.5 6 14C6 17.5 8 20.5 10 23V27C10 28 11 29 12 29H20C21 29 22 28 22 27V23C24 20.5 26 17.5 26 14C26 8.5 21.5 4 16 4Z" stroke="#9333EA" strokeWidth="2.5" fill="#F3E8FF" />
          <path d="M12 33H20" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 37H18" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 10V18" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
        </g>
        <rect x="15" y="70" width="3" height="40" fill="#A855F7" fillOpacity="0.3" />
        <circle cx="16.5" cy="65" r="10" fill="#A855F7" fillOpacity="0.25" />
      </svg>
    ),
  },
  4: {
    badgeBg: '#F97316',
    bgGradient: 'from-[#FFEDD5] via-[#FEDDC1] to-[#FCCDAB]',
    borderColor: 'border-[#FED7AA]',
    textColor: '#C2410C',
    watermark: (
      <svg className="w-full h-full" viewBox="0 0 100 120" fill="none">
        <path d="M70 20 L74 65 H68 L66 20 Z" fill="#FB923C" fillOpacity="0.35" />
        <path d="M80 15 L85 65 H78 L76 15 Z" fill="#FB923C" fillOpacity="0.4" />
        <path d="M90 22 L94 65 H88 L87 22 Z" fill="#FB923C" fillOpacity="0.35" />
        <rect x="62" y="65" width="34" height="45" fill="#FB923C" fillOpacity="0.25" />
      </svg>
    ),
  },
  5: {
    badgeBg: '#0D9488',
    bgGradient: 'from-[#E0F7EF] via-[#CEF2E4] to-[#BDECD9]',
    borderColor: 'border-[#99F6E4]',
    textColor: '#0D766E',
    watermark: (
      <svg className="w-full h-full" viewBox="0 0 100 120" fill="none">
        <g transform="translate(60, 15) scale(0.9)" opacity="0.45">
          <path d="M16 38 C16 20 28 8 28 8 C28 8 30 22 20 30 C28 28 36 18 36 18 C36 18 36 30 24 36" stroke="#0D9488" strokeWidth="2.5" fill="#CCFBF1" strokeLinejoin="round" />
          <path d="M8 20 C8 20 18 20 18 30" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 32 L17 46" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  6: {
    badgeBg: '#D97706',
    bgGradient: 'from-[#FEF3C7] via-[#FDEAB5] to-[#FCE09E]',
    borderColor: 'border-[#FDE68A]',
    textColor: '#854D0E',
    watermark: (
      <svg className="w-full h-full" viewBox="0 0 100 120" fill="none">
        <rect x="68" y="25" width="22" height="85" fill="#F59E0B" fillOpacity="0.32" />
        <polygon points="68,25 79,15 90,25" fill="#F59E0B" fillOpacity="0.32" />
        <rect x="52" y="45" width="18" height="65" fill="#F59E0B" fillOpacity="0.25" />
        <rect x="72" y="32" width="4" height="6" fill="#FFFFFF" fillOpacity="0.5" />
        <rect x="80" y="32" width="4" height="6" fill="#FFFFFF" fillOpacity="0.5" />
        <rect x="72" y="44" width="4" height="6" fill="#FFFFFF" fillOpacity="0.5" />
        <rect x="80" y="44" width="4" height="6" fill="#FFFFFF" fillOpacity="0.5" />
      </svg>
    ),
  },
};

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  currentTeam,
  onSave,
  onClose,
}) => {
  const [teamName, setTeamName] = useState(currentTeam.name);
  const [selectedCharId, setSelectedCharId] = useState(currentTeam.characterId);

  const selectedChar = CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0];

  const handleConfirm = () => {
    sound.playClick();
    onSave(teamName.trim() || `Nhóm ${currentTeam.id}`, selectedCharId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl lg:max-w-[890px] bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col p-5 sm:p-7 animate-in zoom-in-95 duration-200">
        
        {/* Title Header */}
        <div className="text-center mb-2 sm:mb-3">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1.5px] w-12 sm:w-16 bg-[#BA8E41]/70" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F1E36] tracking-tight uppercase">
              CHỌN NHÂN VẬT
            </h2>
            <span className="h-[1.5px] w-12 sm:w-16 bg-[#BA8E41]/70" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
            Chọn nhân vật đại diện cho nhóm của bạn.
          </p>
        </div>

        {/* Team Name Input Row */}
        <div className="flex items-center justify-center gap-2 max-w-xs mx-auto mb-4 sm:mb-5 w-full">
          <div className="bg-[#B87A31] text-white font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-2xs shrink-0 select-none">
            Tên nhóm
          </div>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            maxLength={20}
            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-1.5 font-bold text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#B87A31]/40 shadow-2xs"
            placeholder="Nhóm 1"
          />
        </div>

        {/* 6 Character Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 my-1">
          {CHARACTERS.map((char) => {
            const isSelected = char.id === selectedCharId;
            const theme = CARD_THEMES[char.id] || CARD_THEMES[1];

            return (
              <div
                key={char.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCharId(char.id);
                }}
                className={`relative h-[250px] sm:h-[285px] rounded-[18px] border-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all select-none ${
                  isSelected
                    ? 'border-[#10B981] ring-3 ring-[#10B981]/30 shadow-[0_0_18px_rgba(16,185,129,0.35)] scale-[1.02] z-10'
                    : `${theme.borderColor} hover:border-slate-300 hover:scale-[1.01] hover:shadow-sm`
                }`}
              >
                {/* Background Gradient & Themed Watermark */}
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient}`} />
                <div className="absolute inset-0 pointer-events-none opacity-85">
                  {theme.watermark}
                </div>

                {/* Character Number Badge at Top-Left */}
                <div className="relative z-10 p-2 sm:p-2.5">
                  <div
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full text-white font-black text-xs flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: theme.badgeBg }}
                  >
                    {char.id.toString().padStart(2, '0')}
                  </div>
                </div>

                {/* 3D Character Full-Body Artwork Standing on Card Floor */}
                <div className="absolute inset-x-0 bottom-9 top-6 flex items-end justify-center pointer-events-none z-10">
                  <img
                    src={`/assets/char_full_${char.id}.png`}
                    alt={char.name}
                    className="h-full w-auto max-h-[205px] object-contain drop-shadow-md transition-transform duration-200"
                    loading="eager"
                    draggable={false}
                  />
                </div>

                {/* Bottom Footer Section */}
                {isSelected ? (
                  /* Selected State: Dark Emerald Bar with White Checkmark Pill */
                  <div className="w-full bg-gradient-to-b from-[#097560] to-[#044D3F] pt-1.5 pb-2.5 px-1 flex flex-col items-center justify-center relative z-20 rounded-b-[16px]">
                    <span className="text-white text-xs font-black tracking-tight drop-shadow-xs">
                      {char.name}
                    </span>
                    <div className="absolute -bottom-2.5 bg-white border border-emerald-400/80 rounded-full px-2.5 py-0.5 flex items-center gap-1 shadow-md shadow-emerald-950/20">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#0D8A71] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                      </div>
                      <span className="text-[11px] font-black text-[#085C4B]">Đã chọn</span>
                    </div>
                  </div>
                ) : (
                  /* Unselected State: Clean Label in Character Theme Color */
                  <div className="w-full text-center pb-2.5 pt-1 z-20">
                    <span
                      className="text-xs sm:text-[13px] font-black tracking-tight"
                      style={{ color: theme.textColor }}
                    >
                      {char.name}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Control Bar: Quay lại, Đang chọn, Xác nhận */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-700 stroke-[2.5]" />
            <span>Quay lại</span>
          </button>

          <div className="text-xs sm:text-sm font-semibold text-slate-700">
            Đang chọn:{' '}
            <strong className="text-[#0F1E36] font-black text-sm sm:text-base ml-1">
              {selectedChar.name}
            </strong>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-2 px-7 sm:px-8 py-2.5 rounded-full bg-gradient-to-r from-[#005E4D] to-[#0A6E5C] hover:from-[#004E40] hover:to-[#085E4E] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-950/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Xác nhận</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};

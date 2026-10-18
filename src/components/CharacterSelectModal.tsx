import React, { useState } from 'react';
import { CHARACTERS } from '../data/gameData';
import { CharacterAvatar } from './GameIcons';
import { TeamState } from '../types/game';
import { Check, ChevronRight, RotateCcw } from 'lucide-react';
import { sound } from '../utils/sound';

interface CharacterSelectModalProps {
  currentTeam: TeamState;
  onSave: (teamName: string, characterId: number) => void;
  onClose: () => void;
}

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
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-5 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Title */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <span className="h-0.5 w-12 bg-amber-600/40 hidden sm:block" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              CHỌN NHÂN VẬT
            </h2>
            <span className="h-0.5 w-12 bg-amber-600/40 hidden sm:block" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            Chọn nhân vật đại diện cho nhóm của bạn.
          </p>
        </div>

        {/* Team Name Input */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto mb-5 w-full">
          <span className="bg-amber-100 text-amber-900 font-extrabold text-xs sm:text-sm px-3 py-2 rounded-xl shrink-0">
            Tên nhóm
          </span>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            maxLength={20}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-1.5 font-bold text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            placeholder="Nhập tên nhóm của bạn..."
          />
        </div>

        {/* 6 Character Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 my-2">
          {CHARACTERS.map((char) => {
            const isSelected = char.id === selectedCharId;

            return (
              <div
                key={char.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCharId(char.id);
                }}
                className={`relative flex flex-col items-center justify-between p-3 rounded-2xl border-2 transition-all cursor-pointer shadow-sm select-none ${
                  isSelected
                    ? 'border-emerald-500 ring-4 ring-emerald-500/25 scale-[1.03] shadow-md z-10'
                    : 'border-slate-200 hover:border-slate-300 hover:scale-[1.01] bg-slate-50/50'
                }`}
                style={{ backgroundColor: isSelected ? `${char.bgLight}` : undefined }}
              >
                {/* Character Number Badge */}
                <div
                  className="w-7 h-7 rounded-full text-white font-black text-xs flex items-center justify-center self-start mb-1 shadow-2xs"
                  style={{ backgroundColor: char.color }}
                >
                  {char.id.toString().padStart(2, '0')}
                </div>

                {/* Avatar Artwork */}
                <div className="my-2 flex justify-center">
                  <CharacterAvatar id={char.id} className="w-20 h-24 sm:w-24 sm:h-28 drop-shadow-sm" />
                </div>

                {/* Character Name Label */}
                <div className="w-full text-center mt-1">
                  <div className="text-xs sm:text-sm font-black text-slate-800">
                    {char.name}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 truncate mt-0.5">
                    {char.title}
                  </div>
                </div>

                {/* Selected Pill if active */}
                {isSelected && (
                  <div className="mt-2 w-full bg-emerald-600 text-white font-extrabold text-[11px] py-1 rounded-xl flex items-center justify-center gap-1 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Đã chọn</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Quay lại, Đang chọn, Xác nhận */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-extrabold text-xs sm:text-sm shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Quay lại</span>
          </button>

          <div className="text-xs sm:text-sm font-semibold text-slate-600">
            Đang chọn: <strong className="text-slate-900 font-black">{selectedChar.name}</strong> ({selectedChar.title})
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-1.5 px-7 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span>Xác nhận</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

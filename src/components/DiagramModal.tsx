import React, { useState } from 'react';
import { KNOWLEDGE_CARDS } from '../data/gameData';
import { KnowledgeCard, TeamState } from '../types/game';
import { validateDiagram, formatTime } from '../game/logic';
import { TileIcon } from './GameIcons';
import { RotateCcw, CheckCircle, ArrowDown, ArrowRight, X } from 'lucide-react';
import { sound } from '../utils/sound';

interface DiagramModalProps {
  team: TeamState;
  timeRemaining: number;
  onSuccess: () => void;
  onClose: () => void;
  onUpdateSlots?: (newSlots: Record<number, number | null>) => void;
}

export const DiagramModal: React.FC<DiagramModalProps> = ({
  team,
  timeRemaining,
  onSuccess,
  onClose,
  onUpdateSlots,
}) => {
  // Slots state 1..8
  const [slots, setSlots] = useState<Record<number, number | null>>(
    team.diagramSlots || { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null }
  );

  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [wrongSlots, setWrongSlots] = useState<number[]>([]);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Cards currently placed anywhere
  const placedCardIds = Object.values(slots).filter((id): id is number => id !== null);

  const handleSelectCard = (cardId: number) => {
    sound.playClick();
    if (selectedCardId === cardId) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(cardId);
    }
  };

  const handleSlotClick = (slotId: number) => {
    sound.playClick();
    setWrongSlots([]);
    setFeedbackMsg(null);

    // If a card is selected from palette, place it into this slot
    if (selectedCardId !== null) {
      // If another slot already has this card, clear it
      const newSlots = { ...slots };
      Object.keys(newSlots).forEach((k) => {
        if (newSlots[Number(k)] === selectedCardId) {
          newSlots[Number(k)] = null;
        }
      });
      newSlots[slotId] = selectedCardId;
      setSlots(newSlots);
      onUpdateSlots?.(newSlots);
      setSelectedCardId(null);
      return;
    }

    // If slot is occupied and no card selected, remove it
    if (slots[slotId] !== null) {
      const newSlots = { ...slots, [slotId]: null };
      setSlots(newSlots);
      onUpdateSlots?.(newSlots);
    }
  };

  const handleReset = () => {
    sound.playClick();
    const emptySlots = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null };
    setSlots(emptySlots);
    onUpdateSlots?.(emptySlots);
    setSelectedCardId(null);
    setWrongSlots([]);
    setFeedbackMsg(null);
  };

  const handleCheck = () => {
    sound.playClick();
    // Verify all 8 slots are filled
    const unfilled = [1, 2, 3, 4, 5, 6, 7, 8].filter((id) => slots[id] === null);
    if (unfilled.length > 0) {
      setFeedbackMsg(`Hãy điền đủ 8 vị trí trước khi kiểm tra (còn thiếu ${unfilled.length} ô).`);
      return;
    }

    const { isCorrect, wrongSlots: errors } = validateDiagram(slots);

    if (isCorrect) {
      sound.playVictory();
      setFeedbackMsg(null);
      onSuccess();
    } else {
      sound.playWrong();
      setWrongSlots(errors);
      setFeedbackMsg(
        `Chưa chính xác (${errors.length} ô sai). Bạn có thể đổi lại vị trí các ô màu đỏ, đồng hồ vẫn đang đếm ngược!`
      );
    }
  };

  // Helper to render card inside slot
  const renderSlotCard = (slotId: number) => {
    const cardId = slots[slotId];
    const isWrong = wrongSlots.includes(slotId);

    if (cardId === null) {
      return (
        <button
          type="button"
          aria-label={`Vị trí ${slotId}`}
          onClick={() => handleSlotClick(slotId)}
          className={`w-full h-11 sm:h-13 rounded-2xl border-2 flex items-center justify-center font-black text-sm sm:text-base transition-all cursor-pointer shadow-xs ${
            selectedCardId !== null
              ? 'border-dashed border-teal-500 bg-teal-50/70 hover:bg-teal-100 text-teal-700 animate-pulse'
              : 'border-teal-500/80 bg-white hover:bg-teal-50/40 text-teal-800'
          }`}
        >
          <span>{slotId}</span>
        </button>
      );
    }

    const card = KNOWLEDGE_CARDS.find((c) => c.id === cardId);
    if (!card) return null;

    return (
      <div
        onClick={() => handleSlotClick(slotId)}
        className={`relative w-full h-11 sm:h-13 rounded-2xl border-2 flex items-center justify-between px-2 sm:px-3 text-xs sm:text-sm font-bold shadow-xs cursor-pointer transition-all ${
          isWrong
            ? 'bg-rose-50 border-rose-500 text-rose-950 animate-shake'
            : 'bg-emerald-50 border-emerald-500 text-emerald-950 hover:bg-emerald-100/60'
        }`}
        title="Nhấp để gỡ thẻ này ra"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 truncate">
          <TileIcon name={card.icon} className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span className="truncate">{card.title}</span>
        </div>
        <span className="text-slate-400 hover:text-rose-600 p-0.5 rounded-full shrink-0">
          <X className="w-3.5 h-3.5" />
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-4 sm:p-7 max-h-[96vh] animate-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          {/* Team Info */}
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full shadow-2xs"
              style={{ backgroundColor: team.color }}
            />
            <span className="font-extrabold text-slate-900 text-sm sm:text-base">{team.name}</span>
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
            <span className="font-bold text-teal-700 text-xs sm:text-sm">Ghép sơ đồ</span>
            <span className="text-slate-300">|</span>
            <span className="font-bold text-amber-700 text-xs sm:text-sm">Thẻ 8/8</span>
          </div>

          {/* Timer & Close */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold text-sm px-3 py-1 rounded-full">
              <span>⏱️</span>
              <span>{formatTime(timeRemaining)}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Đóng lại (vẫn có thể mở lại bất cứ lúc nào)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Title */}
        <div className="text-center my-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            GHÉP SƠ ĐỒ
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Chọn thẻ, sau đó chọn ô trống.
          </p>
        </div>

        {/* Diagram Flowchart Layout (Marxist-Leninist Monopoly Origin Theory) */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-3 sm:p-4 my-2 flex flex-col items-center justify-center">
          {/* Node 1 (Top Center) */}
          <div className="w-52 sm:w-64">{renderSlotCard(1)}</div>

          {/* Branch Arrows Down-Left and Down-Right */}
          <div className="w-52 sm:w-64 flex justify-between px-10 my-1 text-teal-600">
            <span className="transform rotate-20">↙</span>
            <span className="transform -rotate-20">↘</span>
          </div>

          {/* Row 2: Node 2 (Left) and Node 3 (Right) */}
          <div className="w-full max-w-lg flex items-center justify-between gap-4 sm:gap-8">
            <div className="w-48 sm:w-56">{renderSlotCard(2)}</div>
            <div className="w-48 sm:w-56">{renderSlotCard(3)}</div>
          </div>

          {/* Row 2 Arrows Down */}
          <div className="w-full max-w-lg flex items-center justify-between px-16 sm:px-20 my-1 text-teal-600">
            <ArrowDown className="w-4 h-4" />
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Row 3: Node 4 (Left) and Node 5 -> Node 6 (Right) */}
          <div className="w-full max-w-2xl flex items-center justify-between gap-3 sm:gap-6">
            <div className="w-44 sm:w-52">{renderSlotCard(4)}</div>

            <div className="flex items-center gap-2">
              <div className="w-40 sm:w-48">{renderSlotCard(5)}</div>
              <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
              <div className="w-40 sm:w-48">{renderSlotCard(6)}</div>
            </div>
          </div>

          {/* Converge Arrows to Node 7 */}
          <div className="w-64 sm:w-80 flex justify-between px-6 sm:px-12 my-1 text-teal-600">
            <span className="transform -rotate-25">↘</span>
            <span className="transform rotate-25">↙</span>
          </div>

          {/* Node 7 (Center Convergence) */}
          <div className="w-52 sm:w-64">{renderSlotCard(7)}</div>

          {/* Arrow Down to Node 8 */}
          <div className="my-1 text-teal-600">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Node 8 (Final Organization) */}
          <div className="w-56 sm:w-72">{renderSlotCard(8)}</div>
        </div>

        {/* Feedback message */}
        {feedbackMsg && (
          <div
            className={`p-2.5 rounded-xl text-xs sm:text-sm font-semibold text-center mb-2 animate-in fade-in duration-200 ${
              wrongSlots.length > 0
                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {feedbackMsg}
          </div>
        )}

        {/* Knowledge Cards Palette */}
        <div className="mt-1">
          <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 uppercase tracking-wide">
              THẺ KIẾN THỨC
            </h3>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
              Ghép sai được sửa lại, đồng hồ vẫn chạy.
            </span>
          </div>

          {/* 8 Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {KNOWLEDGE_CARDS.map((card) => {
              const isPlaced = placedCardIds.includes(card.id);
              const isSelected = selectedCardId === card.id;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleSelectCard(card.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50 text-teal-900 ring-2 ring-teal-500/30 shadow-xs'
                      : isPlaced
                      ? 'border-slate-200 bg-slate-100 text-slate-400 opacity-60'
                      : 'border-slate-200 hover:border-teal-300 bg-white text-slate-800 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <TileIcon name={card.icon} className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold leading-tight truncate">
                    {card.title}
                  </span>
                  {isPlaced && (
                    <span className="ml-auto text-[10px] text-teal-600 font-bold shrink-0">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions: Xếp lại & Kiểm tra */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Xếp lại</span>
          </button>

          <button
            type="button"
            onClick={handleCheck}
            className="px-8 sm:px-12 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm sm:text-base shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Kiểm tra
          </button>
        </div>
      </div>
    </div>
  );
};

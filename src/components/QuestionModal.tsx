import React, { useState } from 'react';
import { QuestionData, TeamState } from '../types/game';
import { sound } from '../utils/sound';
import { CheckCircle2, XCircle, AlertTriangle, Sparkles } from 'lucide-react';

interface QuestionModalProps {
  question: QuestionData;
  team: TeamState;
  onAnswer: (selectedChoice: 'A' | 'B' | 'C' | 'D') => void;
  onClose: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  team,
  onAnswer,
  onClose,
}) => {
  const [selected, setSelected] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const isChallenge = Boolean(question.isChallenge);

  const handleSubmit = () => {
    if (!selected || hasSubmitted) return;
    const correct = selected === question.correctAnswer;
    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  const handleContinue = () => {
    if (selected) {
      onAnswer(selected);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-4 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          {/* Team Info */}
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full shadow-2xs"
              style={{ backgroundColor: team.color }}
            />
            <span className="font-extrabold text-slate-800 text-sm sm:text-base">{team.name}</span>
            <span className="text-slate-300">|</span>
            {/* Hearts */}
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
            {/* Cards */}
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-700">
              <span>🎴</span>
              <span>Thẻ {team.cards.length}/8</span>
            </div>
          </div>

          {/* Question / Challenge Badge */}
          <div>
            {isChallenge ? (
              <span className="bg-purple-100 border border-purple-300 text-purple-900 text-xs sm:text-sm font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                <span>⚡</span> THỬ THÁCH {question.tileNumber.toString().padStart(2, '0')}
              </span>
            ) : (
              <span className="bg-sky-50 border border-sky-200 text-sky-800 text-xs sm:text-sm font-black px-3 py-1 rounded-full uppercase tracking-wider">
                CÂU HỎI {question.tileNumber.toString().padStart(2, '0')}
              </span>
            )}
          </div>
        </div>

        {/* Center Illustration VS / Challenge */}
        <div className="flex justify-center my-2 sm:my-3">
          {isChallenge ? (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
              🎯
            </div>
          ) : (
            <div className="relative flex items-center justify-center w-28 h-16">
              <div className="w-10 h-14 bg-gradient-to-t from-sky-600 to-sky-400 rounded-lg shadow-md flex items-center justify-center text-white text-[10px] font-black mr-2 transform -rotate-3">
                TECH
              </div>
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center z-10 shadow-md">
                VS
              </div>
              <div className="w-10 h-14 bg-gradient-to-t from-amber-600 to-amber-400 rounded-lg shadow-md flex items-center justify-center text-white text-[10px] font-black ml-2 transform rotate-3">
                CORP
              </div>
            </div>
          )}
        </div>

        {/* Question Title & Text */}
        <div className="text-center mb-4">
          <h2 className="text-base sm:text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
            {question.title}
          </h2>
          <p className="text-slate-800 font-bold text-sm sm:text-lg leading-snug px-2">
            {question.question}
          </p>
        </div>

        {/* Choices List */}
        <div className="space-y-2.5 my-2">
          {question.choices.map((choice) => {
            const isChoiceSelected = selected === choice.id;
            const isChoiceCorrect = choice.id === question.correctAnswer;

            let choiceClasses =
              'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white';
            let circleClasses = 'border-slate-300 text-slate-600 bg-slate-100';

            if (isChoiceSelected && !hasSubmitted) {
              choiceClasses =
                'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/30';
              circleClasses = 'border-emerald-500 text-white bg-emerald-600 font-black';
            }

            if (hasSubmitted) {
              if (isChoiceCorrect) {
                choiceClasses =
                  'border-emerald-500 bg-emerald-100/80 text-emerald-950 font-bold';
                circleClasses = 'border-emerald-600 text-white bg-emerald-600 font-black';
              } else if (isChoiceSelected && !isChoiceCorrect) {
                choiceClasses = 'border-rose-400 bg-rose-50 text-rose-950';
                circleClasses = 'border-rose-500 text-white bg-rose-600 font-black';
              } else {
                choiceClasses = 'border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={choice.id}
                type="button"
                disabled={hasSubmitted}
                onClick={() => {
                  sound.playClick();
                  setSelected(choice.id);
                }}
                className={`w-full text-left flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${choiceClasses}`}
              >
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 border ${circleClasses}`}
                >
                  {choice.id}
                </span>
                <span className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
                  {choice.text}
                </span>
                {hasSubmitted && isChoiceCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {hasSubmitted && isChoiceSelected && !isChoiceCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Feedback Card (if answered) */}
        {hasSubmitted && (
          <div
            className={`mt-3 p-3.5 rounded-2xl border text-xs sm:text-sm animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                : 'bg-rose-50/90 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {isCorrect ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Chính xác! (+1 Thẻ kiến thức)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>
                    {isChallenge ? 'Sai ở ô Thử thách! Nhóm bị loại!' : 'Chưa chính xác! (-1 Tim, lùi 2 ô)'}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed text-slate-700 mt-1 font-medium">
              <strong className="text-slate-900">Giải thích:</strong> {question.explanation}
            </p>
          </div>
        )}

        {/* Footer info & CTA Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="text-[11px] sm:text-xs text-slate-600 font-medium">
            {isChallenge ? (
              <span className="text-purple-700 font-bold">
                ⚡ Đúng: +1 thẻ | Sai: Bị loại ngay.
              </span>
            ) : (
              <span>
                <strong className="text-emerald-700">Đúng:</strong> +1 thẻ &nbsp;|&nbsp;{' '}
                <strong className="text-rose-600">Sai:</strong> -1 tim, lùi 2 ô.
              </span>
            )}
          </div>

          <div>
            {!hasSubmitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selected}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  selected
                    ? 'bg-teal-700 hover:bg-teal-800 text-white active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                Trả lời
              </button>
            ) : (
              <button
                type="button"
                onClick={handleContinue}
                className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-teal-700 hover:bg-teal-800 shadow-md active:scale-95 cursor-pointer transition-all"
              >
                Tiếp tục
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

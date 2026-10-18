import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { sound } from '../utils/sound';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-5 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title & Pill */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            <span>📖</span>
            <span>LUẬT CHƠI</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-800 font-extrabold text-xs sm:text-sm px-4 py-1 rounded-full mt-2 shadow-2xs">
            <span>6 nhóm</span>
            <span>•</span>
            <span>15 phút</span>
            <span>•</span>
            <span>8 thẻ kiến thức</span>
          </div>
        </div>

        {/* Content: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          {/* Left Column */}
          <div className="space-y-3.5">
            {/* Mục tiêu */}
            <div className="flex items-start gap-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 shadow-2xs">
              <span className="text-2xl shrink-0 mt-0.5">🎯</span>
              <div>
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide">
                  MỤC TIÊU
                </h3>
                <p className="text-xs text-slate-700 font-medium mt-0.5 leading-relaxed">
                  Thu đủ 8 thẻ và ghép đúng sơ đồ.
                </p>
              </div>
            </div>

            {/* Di chuyển */}
            <div className="flex items-start gap-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 shadow-2xs">
              <span className="text-2xl shrink-0 mt-0.5">🎲</span>
              <div>
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide">
                  DI CHUYỂN
                </h3>
                <p className="text-xs text-slate-700 font-medium mt-0.5 leading-relaxed">
                  Gieo xúc xắc: đi 1 – 6 ô.<br />
                  Qua ô 32: quay về ô 01, giữ thẻ và tim.
                </p>
              </div>
            </div>

            {/* Câu hỏi */}
            <div className="flex items-start gap-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 shadow-2xs">
              <span className="text-2xl shrink-0 mt-0.5">🎴</span>
              <div>
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide">
                  CÂU HỎI
                </h3>
                <p className="text-xs text-slate-700 font-medium mt-0.5 leading-relaxed">
                  <strong className="text-emerald-700">Đúng:</strong> nhận 1 thẻ chưa có.<br />
                  <strong className="text-rose-600">Sai:</strong> mất 1 tim, lùi 2 ô.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Ô đặc biệt */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-black text-sm text-slate-900 uppercase tracking-wide mb-2.5">
                <span className="text-amber-500">⭐</span>
                <span>Ô ĐẶC BIỆT</span>
              </div>

              <div className="space-y-2 text-xs text-slate-700 font-medium leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold shrink-0">12, 23 •</span>
                  <span>
                    <strong className="text-purple-900">Thử thách:</strong> Đúng: +1 thẻ. Sai: bị loại.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold shrink-0">06, 20 •</span>
                  <span>
                    <strong className="text-sky-900">Gieo thêm:</strong> Được gieo tiếp 1 lần.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold shrink-0">13, 26 •</span>
                  <span>
                    <strong className="text-rose-900">Lùi bước:</strong> Tự động lùi ngẫu nhiên 1–6 ô.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold shrink-0">16, 29 •</span>
                  <span>
                    <strong className="text-pink-900">Học lại:</strong> Về ô 01, giữ nguyên thẻ và tim.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">9 ô •</span>
                  <span>
                    <strong className="text-emerald-900">Giải lao:</strong> Không trả lời, được gieo tiếp.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Callout Box */}
        <div className="flex items-start gap-3 bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 my-3 text-xs text-amber-950 font-medium">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <ul className="list-disc pl-4 space-y-1">
            <li>Lùi không vượt quá ô 01. Không kích hoạt ô khi bị phạt di chuyển.</li>
            <li>Hết 3 tim: bị loại. Chỉ nhóm ghép đúng toàn bộ sơ đồ mới được xếp hạng.</li>
          </ul>
        </div>

        {/* Button: Đã hiểu */}
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-10 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm sm:text-base shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};

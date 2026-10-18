import React, { useState } from 'react';
import { BOARD_TILES } from '../data/gameData';
import { BoardTile, TeamState } from '../types/game';
import { TileIcon, CharacterAvatar } from './GameIcons';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { sound } from '../utils/sound';

interface BoardProps {
  currentTeam: TeamState;
  teams: TeamState[];
  isRolling: boolean;
  diceValue: number;
  onRollDice: () => void;
  onTileClick?: (tile: BoardTile) => void;
}

export const Board: React.FC<BoardProps> = ({
  currentTeam,
  teams,
  isRolling,
  diceValue,
  onRollDice,
  onTileClick,
}) => {
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);

  // Group tiles by row (0 to 3)
  const row0 = BOARD_TILES.filter((t) => t.row === 0).sort((a, b) => a.col - b.col); // 01 -> 08 (left to right)
  const row1 = BOARD_TILES.filter((t) => t.row === 1).sort((a, b) => a.col - b.col); // 16 -> 09 (displayed left to right: col 0..7 => 16..09)
  const row2 = BOARD_TILES.filter((t) => t.row === 2).sort((a, b) => a.col - b.col); // 17 -> 24 (left to right: col 0..7 => 17..24)
  const row3 = BOARD_TILES.filter((t) => t.row === 3).sort((a, b) => a.col - b.col); // 32 -> 25 (displayed left to right: col 0..7 => 32..25)

  const getTileBgStyle = (tile: BoardTile) => {
    switch (tile.colorType) {
      case 'green':
        return 'bg-[#EAFBF3]/95 border-[#34D399] shadow-emerald-900/10 hover:bg-[#D5F7E8]';
      case 'tan':
        return 'bg-[#FFF9EA]/95 border-[#FCD34D] shadow-amber-900/10 hover:bg-[#FFF3D2]';
      case 'blue':
        return 'bg-[#EEF8FE]/95 border-[#60A5FA] shadow-blue-900/10 hover:bg-[#DBF0FD]';
      case 'purple':
        return 'bg-[#F7EEFD]/95 border-[#C084FC] shadow-purple-900/10 hover:bg-[#EEDCFB]';
      case 'red':
      case 'pink':
        return 'bg-[#FDF0F3]/95 border-[#F472B6] shadow-rose-900/10 hover:bg-[#FCE0E7]';
      default:
        return 'bg-white/95 border-slate-300 shadow-slate-900/10 hover:bg-slate-50';
    }
  };

  const getNumberColor = (tile: BoardTile) => {
    switch (tile.colorType) {
      case 'green':
        return 'text-[#059669]';
      case 'tan':
        return 'text-[#D97706]';
      case 'blue':
        return 'text-[#2563EB]';
      case 'purple':
        return 'text-[#9333EA]';
      case 'red':
      case 'pink':
        return 'text-[#E11D48]';
      default:
        return 'text-slate-800';
    }
  };

  const getSubtitleColor = (tile: BoardTile) => {
    if (tile.subtitle === 'Câu hỏi') return 'text-[#DC2626] font-bold';
    if (tile.subtitle === 'Gieo thêm') return 'text-[#2563EB] font-bold';
    if (tile.subtitle === 'Thử thách') return 'text-[#7C3AED] font-bold';
    return 'text-[#DC2626] font-bold';
  };

  // Find teams currently on this tile
  const getTeamsOnTile = (tileNumber: number) => {
    return teams.filter((t) => t.currentTile === tileNumber && t.status !== 'eliminated');
  };

  const canRoll =
    !isRolling &&
    currentTeam.status !== 'completed' &&
    currentTeam.status !== 'eliminated' &&
    currentTeam.status !== 'timed_out' &&
    currentTeam.cards.length < 8;

  const renderTileCard = (tile: BoardTile) => {
    const teamsOnThisTile = getTeamsOnTile(tile.number);
    const isCurrentTeamHere = currentTeam.currentTile === tile.number;

    return (
      <div
        key={tile.number}
        onClick={() => onTileClick?.(tile)}
        onMouseEnter={() => setHoveredTile(tile.number)}
        onMouseLeave={() => setHoveredTile(null)}
        className={`relative flex-1 flex flex-col items-center justify-between p-1 sm:p-2 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-sm min-h-[96px] sm:min-h-[108px] md:min-h-[116px] backdrop-blur-sm ${getTileBgStyle(
          tile
        )} ${
          isCurrentTeamHere
            ? 'ring-4 ring-blue-500/80 scale-[1.03] z-20 shadow-xl'
            : 'hover:scale-[1.02] z-10'
        }`}
      >
        {/* Top Tile Number centered */}
        <div className="w-full flex items-center justify-center relative">
          <span className={`text-xs sm:text-sm font-black ${getNumberColor(tile)}`}>
            {tile.number.toString().padStart(2, '0')}
          </span>
          {tile.type === 'challenge' && (
            <span className="absolute right-0 top-0 text-[9px] sm:text-[10px] font-black bg-purple-200 text-purple-900 px-1 rounded-full shadow-2xs">
              ★
            </span>
          )}
        </div>

        {/* Tile Graphic: Pure Transparent 3D Vector Icon */}
        <div className="my-0.5 sm:my-1 transform transition-transform hover:scale-110 flex items-center justify-center">
          <TileIcon name={tile.icon} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 drop-shadow-xs" />
        </div>

        {/* Tile Title & Subtitle */}
        <div className="text-center w-full px-0.5 flex flex-col items-center justify-center min-h-[28px]">
          <div className="text-[10px] sm:text-xs font-black text-slate-900 leading-tight line-clamp-1">
            {tile.title}
          </div>
          {tile.subtitle ? (
            <div className={`text-[9px] sm:text-[10px] ${getSubtitleColor(tile)} leading-tight mt-0.5 truncate`}>
              {tile.subtitle}
            </div>
          ) : (
            <div className="h-2.5 sm:h-3" />
          )}
        </div>

        {/* Character Avatar Pawns on this tile */}
        {teamsOnThisTile.length > 0 && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center -space-x-2 z-30 pointer-events-none">
            {teamsOnThisTile.map((t) => (
              <div
                key={t.id}
                style={{ borderColor: t.color, backgroundColor: t.color }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 shadow-lg transition-all ${
                  t.id === currentTeam.id ? 'ring-3 ring-blue-400 scale-110 z-40 animate-bounce' : ''
                }`}
                title={`${t.name} (Nhân vật ${t.characterId})`}
              >
                <CharacterAvatar id={t.characterId} className="w-full h-full" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col justify-between p-2 sm:p-4 select-none overflow-hidden rounded-2xl border border-slate-200/90 shadow-xl bg-slate-100">
      
      {/* 3D Isometric Smart City & Campus Map Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <img
          src="/assets/board_city_bg.jpg"
          alt="Bản đồ cờ bàn 3D"
          className="w-full h-full object-cover opacity-90 brightness-[1.02] contrast-[1.05]"
        />
        {/* Soft daylight ambient overlay to guarantee sharp contrast for all tiles */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]" />
      </div>

      {/* Main Board Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between gap-3 sm:gap-4 my-auto px-2 sm:px-6">
        
        {/* ROW 0: Tiles 01 -> 08 (Left to Right) */}
        <div className="relative">
          {/* Paved road track ribbon background under this row */}
          <div className="absolute inset-x-0 -inset-y-1 bg-white/75 backdrop-blur-xs border border-slate-200/80 rounded-2xl shadow-sm -z-10 pointer-events-none" />

          {/* Right turn connector curve from Row 0 down to Row 1 */}
          <div className="absolute -right-4 sm:-right-6 top-1/2 h-[calc(100%+1.25rem)] w-6 sm:w-8 border-r-4 border-b-4 border-slate-300/90 rounded-br-2xl pointer-events-none hidden md:flex items-center justify-end pr-0.5">
            <ArrowDown className="w-3.5 h-3.5 text-slate-500 translate-y-3" strokeWidth={2.5} />
          </div>

          <div className="flex items-center gap-1 sm:gap-2 w-full">
            {row0.map((tile, idx) => (
              <React.Fragment key={tile.number}>
                {renderTileCard(tile)}
                {idx < 7 && (
                  <div className="flex items-center justify-center shrink-0 w-2.5 sm:w-3.5 opacity-70">
                    <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500" strokeWidth={2.5} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ROW 1: Tiles 16 <- 09 (Displayed 16..09 Left to Right, Flow Points Left) */}
        <div className="relative">
          <div className="absolute inset-x-0 -inset-y-1 bg-white/75 backdrop-blur-xs border border-slate-200/80 rounded-2xl shadow-sm -z-10 pointer-events-none" />

          {/* Left turn connector curve from Row 1 down to Row 2 */}
          <div className="absolute -left-4 sm:-left-6 top-1/2 h-[calc(100%+4.5rem)] w-6 sm:w-8 border-l-4 border-b-4 border-slate-300/90 rounded-bl-2xl pointer-events-none hidden md:flex items-center justify-start pl-0.5">
            <ArrowDown className="w-3.5 h-3.5 text-slate-500 translate-y-6" strokeWidth={2.5} />
          </div>

          <div className="flex items-center gap-1 sm:gap-2 w-full">
            {row1.map((tile, idx) => (
              <React.Fragment key={tile.number}>
                {renderTileCard(tile)}
                {idx < 7 && (
                  <div className="flex items-center justify-center shrink-0 w-2.5 sm:w-3.5 opacity-70">
                    <ArrowLeft className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500" strokeWidth={2.5} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* CENTER ACTION PLAZA: 3D Dice Button & Target Pill (Positioned right between Row 1 & Row 2) */}
        <div className="relative z-20 flex flex-col items-center justify-center my-1 sm:my-2">
          <div className="flex flex-col items-center gap-1.5">
            {/* 3D Styled Emerald Dice Button */}
            <button
              onClick={() => {
                if (canRoll) {
                  sound.playClick();
                  onRollDice();
                }
              }}
              disabled={!canRoll}
              className={`relative group px-7 sm:px-9 py-2.5 sm:py-3 rounded-full font-black text-sm sm:text-base tracking-wide flex items-center gap-3 shadow-2xl border-2 transition-all cursor-pointer select-none active:scale-95 ${
                canRoll
                  ? 'bg-gradient-to-r from-[#004D3F] via-[#056852] to-[#004D3F] text-white border-[#34D399]/80 hover:from-[#004135] hover:to-[#01352A] shadow-[0_8px_25px_rgba(4,99,82,0.45)] ring-2 ring-emerald-400/40'
                  : 'bg-slate-400/80 text-slate-200 border-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              {/* 3D Dice Cube */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-slate-900 shadow-md flex items-center justify-center font-black text-2xl border border-slate-200 shrink-0 ${
                  isRolling ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'
                }`}
              >
                {diceValue === 1 && '⚀'}
                {diceValue === 2 && '⚁'}
                {diceValue === 3 && '⚂'}
                {diceValue === 4 && '⚃'}
                {diceValue === 5 && '⚄'}
                {diceValue === 6 && '⚅'}
              </div>

              <span className="font-black text-base sm:text-lg leading-none text-white drop-shadow-xs">
                {isRolling ? 'Đang gieo...' : 'Gieo xúc xắc'}
              </span>
            </button>

            {/* Subtitle Pill */}
            <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-full px-4 py-1 flex items-center gap-1.5 shadow-sm text-xs font-bold text-slate-800 select-none">
              <span>🎴</span>
              <span>Thu đủ 8 thẻ để ghép sơ đồ</span>
            </div>
          </div>
        </div>

        {/* ROW 2: Tiles 17 -> 24 (Left to Right, Flow Points Right) */}
        <div className="relative">
          <div className="absolute inset-x-0 -inset-y-1 bg-white/75 backdrop-blur-xs border border-slate-200/80 rounded-2xl shadow-sm -z-10 pointer-events-none" />

          {/* Right turn connector curve from Row 2 down to Row 3 */}
          <div className="absolute -right-4 sm:-right-6 top-1/2 h-[calc(100%+1.25rem)] w-6 sm:w-8 border-r-4 border-b-4 border-slate-300/90 rounded-br-2xl pointer-events-none hidden md:flex items-center justify-end pr-0.5">
            <ArrowDown className="w-3.5 h-3.5 text-slate-500 translate-y-3" strokeWidth={2.5} />
          </div>

          <div className="flex items-center gap-1 sm:gap-2 w-full">
            {row2.map((tile, idx) => (
              <React.Fragment key={tile.number}>
                {renderTileCard(tile)}
                {idx < 7 && (
                  <div className="flex items-center justify-center shrink-0 w-2.5 sm:w-3.5 opacity-70">
                    <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500" strokeWidth={2.5} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ROW 3: Tiles 32 <- 25 (Displayed 32..25 Left to Right, Flow Points Left) */}
        <div className="relative">
          <div className="absolute inset-x-0 -inset-y-1 bg-white/75 backdrop-blur-xs border border-slate-200/80 rounded-2xl shadow-sm -z-10 pointer-events-none" />

          {/* Left vertical return road connecting Row 3 back up to Row 0 */}
          <div className="absolute -left-4 sm:-left-6 bottom-1/2 -top-[280px] sm:-top-[320px] w-6 sm:w-8 border-l-4 border-slate-300/90 rounded-l-2xl pointer-events-none hidden md:flex items-center justify-start pl-0.5">
            <ArrowUp className="w-3.5 h-3.5 text-slate-500" strokeWidth={2.5} />
          </div>

          <div className="flex items-center gap-1 sm:gap-2 w-full">
            {row3.map((tile, idx) => (
              <React.Fragment key={tile.number}>
                {renderTileCard(tile)}
                {idx < 7 && (
                  <div className="flex items-center justify-center shrink-0 w-2.5 sm:w-3.5 opacity-70">
                    <ArrowLeft className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500" strokeWidth={2.5} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

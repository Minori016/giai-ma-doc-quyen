import React, { useState } from 'react';
import { BOARD_TILES } from '../data/gameData';
import { BoardTile, TeamState } from '../types/game';
import { TileIcon } from './GameIcons';
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
  const rows: BoardTile[][] = [
    BOARD_TILES.filter((t) => t.row === 0), // 01 to 08
    BOARD_TILES.filter((t) => t.row === 1), // 16 to 09 (stored in order 09 to 16, but col 0..7)
    BOARD_TILES.filter((t) => t.row === 2), // 17 to 24
    BOARD_TILES.filter((t) => t.row === 3), // 32 to 25
  ];

  // For rows 1 and 3, they go right-to-left visually (col 0 to 7)
  // Let's sort each row by column ascending (col 0..7) so CSS grid places them correctly!
  const sortedRows = rows.map((row) => [...row].sort((a, b) => a.col - b.col));

  const getTileBgStyle = (tile: BoardTile) => {
    switch (tile.colorType) {
      case 'green':
        return 'bg-emerald-50/90 border-emerald-300 text-emerald-950 hover:bg-emerald-100/90 shadow-emerald-700/10';
      case 'tan':
        return 'bg-amber-50/90 border-amber-300 text-amber-950 hover:bg-amber-100/90 shadow-amber-800/10';
      case 'blue':
        return 'bg-sky-50/90 border-sky-300 text-sky-950 hover:bg-sky-100/90 shadow-sky-800/10';
      case 'purple':
        return 'bg-purple-50/90 border-purple-300 text-purple-950 hover:bg-purple-100/90 shadow-purple-800/10';
      case 'red':
        return 'bg-rose-50/90 border-rose-300 text-rose-950 hover:bg-rose-100/90 shadow-rose-800/10';
      case 'pink':
        return 'bg-fuchsia-50/90 border-pink-300 text-pink-950 hover:bg-pink-100/90 shadow-pink-800/10';
      default:
        return 'bg-white border-slate-300 text-slate-800';
    }
  };

  const getNumberBadgeColor = (tile: BoardTile) => {
    switch (tile.colorType) {
      case 'green':
        return 'text-emerald-700 font-bold';
      case 'tan':
        return 'text-amber-700 font-bold';
      case 'blue':
        return 'text-sky-700 font-bold';
      case 'purple':
        return 'text-purple-700 font-bold';
      case 'red':
        return 'text-rose-700 font-bold';
      case 'pink':
        return 'text-pink-700 font-bold';
      default:
        return 'text-slate-700 font-bold';
    }
  };

  // Find teams currently on this tile
  const getTeamsOnTile = (tileNumber: number) => {
    return teams.filter((t) => t.currentTile === tileNumber && t.status !== 'eliminated');
  };

  const renderArrow = (direction: 'right' | 'left' | 'down' | 'up') => {
    switch (direction) {
      case 'right':
        return <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={2.5} />;
      case 'left':
        return <ArrowLeft className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={2.5} />;
      case 'down':
        return <ArrowDown className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={2.5} />;
      case 'up':
        return <ArrowUp className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={2.5} />;
    }
  };

  // Can roll dice if current team is playing or ready, and not yet finished/eliminated
  const canRoll =
    !isRolling &&
    currentTeam.status !== 'completed' &&
    currentTeam.status !== 'eliminated' &&
    currentTeam.status !== 'timed_out' &&
    currentTeam.cards.length < 8;

  return (
    <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-2 sm:p-4 bg-radial from-slate-100 via-sky-50 to-slate-200 select-none overflow-hidden rounded-xl border border-slate-200 shadow-inner">
      {/* Cityscape and park backdrop decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        {/* Subtle decorative grid and roads */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e115_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e115_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Park greenery accents */}
        <div className="absolute top-1/4 left-1/6 w-64 h-32 bg-emerald-200/40 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/6 w-72 h-36 bg-sky-200/40 rounded-full blur-2xl" />
        {/* City buildings badges */}
        <div className="absolute top-16 right-8 text-[11px] font-black tracking-widest text-slate-400 uppercase bg-white/70 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
          BIG TECH
        </div>
        <div className="absolute bottom-16 left-8 text-[11px] font-black tracking-widest text-slate-400 uppercase bg-white/70 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
          R&D LAB
        </div>
        <div className="absolute bottom-20 right-14 text-[11px] font-black tracking-widest text-slate-400 uppercase bg-white/70 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
          APP STORE
        </div>
      </div>

      {/* Main Board Grid: 4 Rows of 8 Tiles */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between gap-3 sm:gap-4 my-auto">
        {sortedRows.map((rowTiles, rowIndex) => (
          <div key={rowIndex} className="relative">
            {/* Grid of 8 tiles */}
            <div className="grid grid-cols-8 gap-1.5 sm:gap-3 items-center">
              {rowTiles.map((tile) => {
                const teamsOnThisTile = getTeamsOnTile(tile.number);
                const isCurrentTeamHere = currentTeam.currentTile === tile.number;

                return (
                  <div
                    key={tile.number}
                    onClick={() => onTileClick?.(tile)}
                    onMouseEnter={() => setHoveredTile(tile.number)}
                    onMouseLeave={() => setHoveredTile(null)}
                    className={`relative flex flex-col items-center justify-between p-1.5 sm:p-2 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-sm min-h-[92px] sm:min-h-[110px] md:min-h-[118px] ${getTileBgStyle(
                      tile
                    )} ${
                      isCurrentTeamHere
                        ? 'ring-4 ring-blue-500/50 scale-[1.03] z-20 shadow-md'
                        : 'hover:scale-[1.02] z-10'
                    }`}
                  >
                    {/* Top Tile Number & Subtitle */}
                    <div className="w-full flex items-center justify-between px-1">
                      <span className={`text-[11px] sm:text-xs md:text-sm font-extrabold ${getNumberBadgeColor(tile)}`}>
                        {tile.number.toString().padStart(2, '0')}
                      </span>
                      {tile.type === 'challenge' && (
                        <span className="text-[9px] sm:text-[10px] font-black bg-purple-200 text-purple-900 px-1 py-0.2 rounded-full">
                          ★
                        </span>
                      )}
                    </div>

                    {/* Tile Icon */}
                    <div className="my-0.5 sm:my-1 transform transition-transform group-hover:scale-110">
                      <TileIcon name={tile.icon} className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>

                    {/* Tile Title & Type Subtitle */}
                    <div className="text-center w-full px-0.5">
                      <div className="text-[10px] sm:text-xs font-bold leading-tight line-clamp-2">
                        {tile.title}
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-semibold opacity-75 mt-0.5">
                        {tile.subtitle}
                      </div>
                    </div>

                    {/* Pawns on this tile */}
                    {teamsOnThisTile.length > 0 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center -space-x-1.5 z-30 pointer-events-none">
                        {teamsOnThisTile.map((t) => (
                          <div
                            key={t.id}
                            style={{ backgroundColor: t.color }}
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-white font-black text-[10px] sm:text-xs flex items-center justify-center border-2 border-white shadow-md transition-all ${
                              t.id === currentTeam.id ? 'ring-2 ring-blue-400 scale-110 z-40 animate-bounce' : ''
                            }`}
                            title={`${t.name} đang ở đây`}
                          >
                            {t.id}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Direction Flow Arrow */}
                    <div className="absolute -bottom-2 sm:-bottom-2.5 right-1 opacity-70">
                      {renderArrow(tile.direction)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Center Action Overlay: Dice Button & Park Plaza */}
      <div className="relative z-20 flex flex-col items-center justify-center mt-3 sm:mt-4 mb-2">
        <div className="flex flex-col items-center gap-2">
          {/* 3D Styled Dice Button */}
          <button
            onClick={() => {
              if (canRoll) {
                sound.playClick();
                onRollDice();
              }
            }}
            disabled={!canRoll}
            className={`relative group px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-black text-sm sm:text-base tracking-wide flex items-center gap-3 shadow-lg border transition-all cursor-pointer ${
              canRoll
                ? 'bg-gradient-to-b from-emerald-600 via-teal-700 to-teal-800 text-white border-teal-500 hover:from-emerald-500 hover:to-teal-700 active:scale-95 shadow-teal-900/30'
                : 'bg-slate-300 text-slate-500 border-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            {/* Animated 3D Dice Icon */}
            <div
              className={`w-8 h-8 rounded-lg bg-white text-slate-900 shadow-md flex items-center justify-center font-black text-lg border border-slate-200 ${
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

            <div className="flex flex-col text-left">
              <span className="font-extrabold text-sm sm:text-base leading-none">
                {isRolling ? 'Đang gieo...' : 'Gieo xúc xắc'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium opacity-85 leading-tight mt-0.5">
                {currentTeam.cards.length >= 8
                  ? 'Đã đủ 8 thẻ! Hãy bấm Ghép sơ đồ'
                  : currentTeam.status === 'eliminated'
                  ? 'Nhóm đã bị loại'
                  : currentTeam.status === 'completed'
                  ? 'Nhóm đã hoàn thành'
                  : 'Đi từ 1 đến 6 ô'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

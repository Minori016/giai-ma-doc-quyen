import React, { useState, useEffect, useRef } from 'react';
import {
  INITIAL_TEAMS,
  BOARD_TILES,
  QUESTIONS_RECORD,
  CHARACTERS,
} from './data/gameData';
import {
  rollDice,
  computeNextTile,
  computeStepBack,
  evaluateAnswer,
  computeLeaderboard,
} from './game/logic';
import { BoardTile, QuestionData, TeamState } from './types/game';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Board } from './components/Board';
import { QuestionModal } from './components/QuestionModal';
import { DiagramModal } from './components/DiagramModal';
import { MyCardsModal } from './components/MyCardsModal';
import { RulesModal } from './components/RulesModal';
import { VictoryModal } from './components/VictoryModal';
import { DefeatModal } from './components/DefeatModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { LobbyModal } from './components/LobbyModal';
import { CharacterSelectModal } from './components/CharacterSelectModal';
import { HostQRModal } from './components/HostQRModal';
import { sound } from './utils/sound';

export default function App() {
  const [teams, setTeams] = useState<TeamState[]>(() => {
    // Seed initial teams
    return INITIAL_TEAMS.map((t) => ({ ...t }));
  });

  const [activeTeamId, setActiveTeamId] = useState<number>(1);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'ended'>('lobby');
  const [timeRemaining, setTimeRemaining] = useState<number>(900); // 15 mins
  const [roomCode] = useState<string>('482615');

  // Dice state
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [diceValue, setDiceValue] = useState<number>(1);

  // Active question modal
  const [activeQuestion, setActiveQuestion] = useState<QuestionData | null>(null);

  // Modals visibility
  const [showLobby, setShowLobby] = useState<boolean>(true);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [showMyCards, setShowMyCards] = useState<boolean>(false);
  const [showDiagram, setShowDiagram] = useState<boolean>(false);
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [showDefeat, setShowDefeat] = useState<boolean>(false);
  const [defeatReason, setDefeatReason] = useState<'timeout' | 'eliminated_hearts' | 'eliminated_challenge'>('timeout');
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showCharacterSelect, setShowCharacterSelect] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);

  // Banner notification for tile events (rest, step back, etc.)
  const [eventToast, setEventToast] = useState<{ title: string; desc: string; type?: string } | null>(null);

  // Ref for timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Current active team
  const currentTeam = teams.find((t) => t.id === activeTeamId) || teams[0];

  // Auto-start check (?autostart=1 support for verification testability)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        startGame();
      }
    }
  }, []);

  // Countdown timer when playing
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Handle global time out
  const handleTimeOut = () => {
    setGameState('ended');
    setTeams((prev) =>
      prev.map((t) => (t.status === 'playing' || t.status === 'diagram' ? { ...t, status: 'timed_out' } : t))
    );
    if (currentTeam.status !== 'completed') {
      setDefeatReason('timeout');
      setShowDefeat(true);
    }
  };

  // Autonomous turns simulation for other 5 teams
  useEffect(() => {
    if (gameState !== 'playing') return;

    const aiInterval = setInterval(() => {
      setTeams((prevTeams) => {
        return prevTeams.map((team) => {
          // Only AI teams that are still playing
          if (!team.isAI || team.id === activeTeamId || team.status !== 'playing') {
            return team;
          }

          // If team has 8 cards, AI may solve diagram after a delay
          if (team.cards.length >= 8) {
            const timeElapsed = 900 - timeRemaining;
            return {
              ...team,
              status: 'completed',
              completionTime: timeElapsed + Math.floor(Math.random() * 30),
            };
          }

          // Simulate an AI dice roll
          const roll = rollDice();
          const targetTile = computeNextTile(team.currentTile, roll);
          const tileDef = BOARD_TILES.find((t) => t.number === targetTile);

          if (!tileDef) return team;

          if (tileDef.type === 'question') {
            // ~80% chance AI answers correctly
            const isCorrect = Math.random() < 0.8;
            const evalResult = evaluateAnswer(
              { ...team, currentTile: targetTile },
              false,
              isCorrect
            );
            return evalResult.updatedTeam;
          } else if (tileDef.type === 'challenge') {
            // 75% chance correct, 25% eliminated
            const isCorrect = Math.random() < 0.75;
            const evalResult = evaluateAnswer(
              { ...team, currentTile: targetTile },
              true,
              isCorrect
            );
            return evalResult.updatedTeam;
          } else if (tileDef.type === 'step_back') {
            return {
              ...team,
              currentTile: computeStepBack(targetTile, Math.floor(Math.random() * 4) + 1),
            };
          } else if (tileDef.type === 'reset_start') {
            return {
              ...team,
              currentTile: 1,
            };
          }

          return {
            ...team,
            currentTile: targetTile,
          };
        });
      });
    }, 14000);

    return () => clearInterval(aiInterval);
  }, [gameState, activeTeamId, timeRemaining]);

  // Start Game handler
  const startGame = () => {
    sound.playClick();
    setShowLobby(false);
    setGameState('playing');
    setTeams((prev) => prev.map((t) => ({ ...t, status: 'playing' })));
  };

  // Roll dice for active user team
  const handleRollDice = () => {
    if (isRolling || gameState !== 'playing') return;
    if (currentTeam.status === 'completed' || currentTeam.status === 'eliminated') return;
    if (currentTeam.cards.length >= 8) {
      setShowDiagram(true);
      return;
    }

    setIsRolling(true);
    sound.playDiceRoll();

    // Rolling animation
    let rollCounter = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(rollDice());
      rollCounter++;
      if (rollCounter > 8) {
        clearInterval(rollInterval);
        const finalRoll = rollDice();
        setDiceValue(finalRoll);
        setIsRolling(false);
        moveTeamPawn(currentTeam.id, finalRoll);
      }
    }, 70);
  };

  // Move pawn step-by-step
  const moveTeamPawn = (teamId: number, steps: number) => {
    const startTile = currentTeam.currentTile;
    const targetTile = computeNextTile(startTile, steps);

    let currentStep = startTile;
    let remainingSteps = steps;

    const stepInterval = setInterval(() => {
      if (remainingSteps <= 0) {
        clearInterval(stepInterval);
        // Land on target tile
        landOnTile(targetTile);
        return;
      }

      currentStep = computeNextTile(currentStep, 1);
      remainingSteps--;
      sound.playStep();

      setTeams((prev) =>
        prev.map((t) => (t.id === teamId ? { ...t, currentTile: currentStep } : t))
      );
    }, 140);
  };

  // Land on tile handler
  const landOnTile = (tileNumber: number) => {
    const tile = BOARD_TILES.find((t) => t.number === tileNumber);
    if (!tile) return;

    if (tile.type === 'question' || tile.type === 'challenge') {
      if (tile.questionId && QUESTIONS_RECORD[tile.questionId]) {
        setActiveQuestion(QUESTIONS_RECORD[tile.questionId]);
      }
      return;
    }

    if (tile.type === 'rest') {
      sound.playCardGet();
      setEventToast({
        title: '☕ Ô 03 - GIẢI LAO',
        desc: 'Nghỉ ngơi thư giãn! Nhóm được gieo xúc xắc tiếp.',
        type: 'emerald',
      });
      return;
    }

    if (tile.type === 'roll_again') {
      sound.playCardGet();
      setEventToast({
        title: '⚡ Ô GIEO THÊM',
        desc: 'Được gieo xúc xắc thêm một lần nữa!',
        type: 'sky',
      });
      return;
    }

    if (tile.type === 'step_back') {
      sound.playWrong();
      const steps = Math.floor(Math.random() * 6) + 1;
      const newPos = computeStepBack(tileNumber, steps);
      setTeams((prev) =>
        prev.map((t) => (t.id === activeTeamId ? { ...t, currentTile: newPos } : t))
      );
      setEventToast({
        title: '⚠️ Ô LÙI BƯỚC',
        desc: `Cạnh tranh gay gắt / Chi phí chuyển đổi: Nhóm bị lùi ngẫu nhiên ${steps} ô về ô ${newPos.toString().padStart(2, '0')}.`,
        type: 'rose',
      });
      return;
    }

    if (tile.type === 'reset_start') {
      sound.playWrong();
      setTeams((prev) =>
        prev.map((t) => (t.id === activeTeamId ? { ...t, currentTile: 1 } : t))
      );
      setEventToast({
        title: '🔄 Ô HỌC LẠI',
        desc: 'Nhầm khái niệm / Thiếu bằng chứng: Quay về ô 01, giữ nguyên thẻ và tim.',
        type: 'pink',
      });
      return;
    }

    if (tile.type === 'loop') {
      setEventToast({
        title: '🔁 TIẾP VÒNG',
        desc: 'Đi hết ô 32 quay vòng về ô 01, vẫn giữ nguyên thẻ và tim.',
        type: 'pink',
      });
    }
  };

  // Answer question handler
  const handleQuestionAnswer = (choiceId: 'A' | 'B' | 'C' | 'D') => {
    if (!activeQuestion) return;

    const isCorrect = choiceId === activeQuestion.correctAnswer;
    const isChallenge = Boolean(activeQuestion.isChallenge);

    const result = evaluateAnswer(currentTeam, isChallenge, isCorrect);

    setTeams((prev) =>
      prev.map((t) => (t.id === activeTeamId ? result.updatedTeam : t))
    );

    setActiveQuestion(null);

    if (result.effect === 'card_added') {
      sound.playCardGet();
      setEventToast({
        title: '🎉 THU THẬP THẺ MỚI',
        desc: result.message,
        type: 'emerald',
      });

      // If team now has 8 cards, open diagram modal!
      if (result.updatedTeam.cards.length >= 8) {
        setTimeout(() => {
          setShowDiagram(true);
        }, 800);
      }
    } else if (result.effect === 'heart_lost') {
      sound.playWrong();
      setEventToast({
        title: '💔 MẤT 1 TIM',
        desc: result.message,
        type: 'rose',
      });
    } else if (result.effect === 'eliminated') {
      sound.playWrong();
      setDefeatReason(isChallenge ? 'eliminated_challenge' : 'eliminated_hearts');
      setShowDefeat(true);
    }
  };

  // Diagram success handler
  const handleDiagramSuccess = () => {
    const elapsed = 900 - timeRemaining;
    const updatedTeam: TeamState = {
      ...currentTeam,
      cards: currentTeam.cards.length === 8 ? currentTeam.cards : [1, 2, 3, 4, 5, 6, 7, 8],
      status: 'completed',
      completionTime: elapsed,
    };

    setTeams((prev) =>
      prev.map((t) => (t.id === activeTeamId ? updatedTeam : t))
    );

    setShowDiagram(false);
    setShowVictory(true);
  };

  // Calculate current rank for active team
  const currentLeaderboard = computeLeaderboard(teams);
  const myRankRow = currentLeaderboard.find((r) => r.team.id === currentTeam.id);
  const myRank = typeof myRankRow?.rank === 'number' ? myRankRow.rank : 1;

  // Save character changes
  const handleSaveCharacter = (name: string, characterId: number) => {
    const char = CHARACTERS.find((c) => c.id === characterId);
    setTeams((prev) =>
      prev.map((t) =>
        t.id === activeTeamId
          ? {
              ...t,
              name,
              characterId,
              color: char?.color || t.color,
              badgeColor: char?.accent || t.badgeColor,
            }
          : t
      )
    );
    setShowCharacterSelect(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 text-slate-800 overflow-hidden font-sans">
      {/* Top Navigation Header */}
      <Header
        currentTeam={currentTeam}
        teams={teams}
        timeRemaining={timeRemaining}
        onOpenMyCards={() => setShowMyCards(true)}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
        onOpenRules={() => setShowRules(true)}
        onOpenQR={() => setShowQR(true)}
        onOpenDiagram={() => setShowDiagram(true)}
      />

      {/* Main Board Area */}
      <main className="flex-1 relative overflow-auto p-2 sm:p-4 flex flex-col justify-center items-center">
        {/* Floating Event Toast */}
        {eventToast && (
          <div className="absolute top-4 z-40 max-w-md w-full px-4 animate-in slide-in-from-top-4 duration-300">
            <div
              className={`p-3.5 rounded-2xl border shadow-xl flex items-start justify-between gap-3 backdrop-blur-md ${
                eventToast.type === 'emerald'
                  ? 'bg-emerald-500/95 border-emerald-400 text-white'
                  : eventToast.type === 'rose'
                  ? 'bg-rose-600/95 border-rose-500 text-white'
                  : eventToast.type === 'sky'
                  ? 'bg-sky-500/95 border-sky-400 text-white'
                  : 'bg-slate-900/95 border-slate-700 text-white'
              }`}
            >
              <div>
                <div className="font-black text-xs sm:text-sm tracking-wide">
                  {eventToast.title}
                </div>
                <div className="text-xs font-medium opacity-90 mt-0.5">
                  {eventToast.desc}
                </div>
              </div>
              <button
                onClick={() => setEventToast(null)}
                className="text-white/80 hover:text-white font-bold p-1 text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* 32 Tiles Board */}
        <Board
          currentTeam={currentTeam}
          teams={teams}
          isRolling={isRolling}
          diceValue={diceValue}
          onRollDice={handleRollDice}
          onTileClick={(tile) => {
            if (tile.type === 'question' || tile.type === 'challenge') {
              if (tile.questionId && QUESTIONS_RECORD[tile.questionId]) {
                setActiveQuestion(QUESTIONS_RECORD[tile.questionId]);
              }
            } else if (tile.type === 'rest') {
              setEventToast({
                title: `Ô ${tile.number.toString().padStart(2, '0')} - GIẢI LAO`,
                desc: 'Không cần trả lời câu hỏi, được gieo xúc xắc tiếp.',
                type: 'emerald',
              });
            } else if (tile.type === 'step_back') {
              setEventToast({
                title: `Ô ${tile.number.toString().padStart(2, '0')} - LÙI BƯỚC`,
                desc: 'Tự động lùi ngẫu nhiên từ 1 đến 6 ô.',
                type: 'rose',
              });
            } else if (tile.type === 'reset_start') {
              setEventToast({
                title: `Ô ${tile.number.toString().padStart(2, '0')} - HỌC LẠI`,
                desc: 'Quay về ô 01, giữ nguyên thẻ và tim.',
                type: 'pink',
              });
            }
          }}
        />
      </main>

      {/* Bottom Footer Bar (6-team switcher) */}
      <Footer
        teams={teams}
        currentTeamId={activeTeamId}
        onSelectTeam={(teamId) => {
          sound.playClick();
          setActiveTeamId(teamId);
        }}
        onOpenDiagram={() => setShowDiagram(true)}
      />

      {/* MODALS */}
      {showLobby && (
        <LobbyModal
          teams={teams}
          currentTeam={currentTeam}
          roomCode={roomCode}
          onStartGame={startGame}
          onOpenCharacterSelect={() => setShowCharacterSelect(true)}
          onOpenQR={() => setShowQR(true)}
        />
      )}

      {showCharacterSelect && (
        <CharacterSelectModal
          currentTeam={currentTeam}
          onSave={handleSaveCharacter}
          onClose={() => setShowCharacterSelect(false)}
        />
      )}

      {activeQuestion && (
        <QuestionModal
          question={activeQuestion}
          team={currentTeam}
          onAnswer={handleQuestionAnswer}
          onClose={() => setActiveQuestion(null)}
        />
      )}

      {showDiagram && (
        <DiagramModal
          team={currentTeam}
          timeRemaining={timeRemaining}
          onSuccess={handleDiagramSuccess}
          onClose={() => setShowDiagram(false)}
          onUpdateSlots={(newSlots) => {
            setTeams((prev) =>
              prev.map((t) => (t.id === activeTeamId ? { ...t, diagramSlots: newSlots } : t))
            );
          }}
        />
      )}

      {showMyCards && (
        <MyCardsModal
          team={currentTeam}
          timeRemaining={timeRemaining}
          onClose={() => setShowMyCards(false)}
          onOpenDiagram={() => {
            setShowMyCards(false);
            setShowDiagram(true);
          }}
        />
      )}

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}

      {showVictory && (
        <VictoryModal
          team={currentTeam}
          rank={myRank}
          onOpenLeaderboard={() => {
            setShowVictory(false);
            setShowLeaderboard(true);
          }}
          onReturnLobby={() => {
            setShowVictory(false);
            setShowLobby(true);
            setGameState('lobby');
          }}
        />
      )}

      {showDefeat && (
        <DefeatModal
          team={currentTeam}
          reason={defeatReason}
          onOpenLeaderboard={() => {
            setShowDefeat(false);
            setShowLeaderboard(true);
          }}
          onReturnLobby={() => {
            setShowDefeat(false);
            setShowLobby(true);
            setGameState('lobby');
          }}
        />
      )}

      {showLeaderboard && (
        <LeaderboardModal
          teams={teams}
          onClose={() => setShowLeaderboard(false)}
          onReturnLobby={() => {
            setShowLeaderboard(false);
            setShowLobby(true);
            setGameState('lobby');
          }}
        />
      )}

      {showQR && (
        <HostQRModal
          roomCode={roomCode}
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
}

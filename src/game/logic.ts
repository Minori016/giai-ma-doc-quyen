import { CORRECT_DIAGRAM_SLOTS } from '../data/gameData.ts';
import type { TeamState } from '../types/game.ts';

/**
 * Rolls a standard 6-sided die (1 to 6).
 */
export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

/**
 * Calculates the next tile on the 32-tile board after rolling.
 * Passing tile 32 loops back to 1.
 */
export function computeNextTile(currentTile: number, roll: number): number {
  const next = currentTile + roll;
  if (next > 32) {
    return next - 32;
  }
  return next;
}

/**
 * Calculates step-back movement.
 * Moving backward cannot pass tile 01.
 */
export function computeStepBack(currentTile: number, steps: number): number {
  return Math.max(1, currentTile - steps);
}

/**
 * Formats seconds into MM:SS string.
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(Math.max(0, seconds) / 60);
  const secs = Math.floor(Math.max(0, seconds) % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Picks the next card to reward the team from uncollected cards (1..8).
 */
export function getNextRewardCard(currentCards: number[]): number | null {
  for (let cardId = 1; cardId <= 8; cardId++) {
    if (!currentCards.includes(cardId)) {
      return cardId;
    }
  }
  return null;
}

export interface AnswerResult {
  updatedTeam: TeamState;
  effect: 'card_added' | 'heart_lost' | 'eliminated';
  awardedCardId?: number;
  message: string;
}

/**
 * Evaluates a team's answer to a question or challenge tile according to game rules.
 */
export function evaluateAnswer(
  team: TeamState,
  isChallenge: boolean,
  isCorrect: boolean
): AnswerResult {
  if (isCorrect) {
    const nextCard = getNextRewardCard(team.cards);
    const newCards = nextCard ? [...team.cards, nextCard] : [...team.cards];
    const willSolveDiagram = newCards.length >= 8;

    const updatedTeam: TeamState = {
      ...team,
      cards: newCards,
      status: willSolveDiagram ? 'diagram' : team.status,
    };

    return {
      updatedTeam,
      effect: 'card_added',
      awardedCardId: nextCard ?? undefined,
      message: nextCard
        ? `Chính xác! Nhóm nhận được Thẻ kiến thức số ${nextCard}.`
        : 'Chính xác! Bạn đã thu thập đủ 8 thẻ kiến thức.',
    };
  }

  // Answer is WRONG
  if (isChallenge) {
    // Challenge rule: Wrong answer leads to immediate elimination!
    const updatedTeam: TeamState = {
      ...team,
      hearts: 0,
      status: 'eliminated',
    };
    return {
      updatedTeam,
      effect: 'eliminated',
      message: 'Sai ở ô Thử thách! Nhóm bị loại ngay lập tức.',
    };
  }

  // Normal question wrong answer: Lose 1 heart, step back 2 tiles (min 1)
  const remainingHearts = Math.max(0, team.hearts - 1);
  const isEliminated = remainingHearts <= 0;
  const newTile = computeStepBack(team.currentTile, 2);

  const updatedTeam: TeamState = {
    ...team,
    hearts: remainingHearts,
    currentTile: newTile,
    status: isEliminated ? 'eliminated' : team.status,
  };

  return {
    updatedTeam,
    effect: isEliminated ? 'eliminated' : 'heart_lost',
    message: isEliminated
      ? 'Sai câu hỏi! Nhóm đã mất hết 3 tim và bị loại.'
      : 'Sai câu hỏi! Nhóm mất 1 tim và bị lùi 2 ô.',
  };
}

/**
 * Validates the 8 diagram slots against the canonical sequence.
 */
export function validateDiagram(slots: Record<number, number | null>): {
  isCorrect: boolean;
  wrongSlots: number[];
  correctCount: number;
} {
  const wrongSlots: number[] = [];
  let correctCount = 0;

  for (let slotId = 1; slotId <= 8; slotId++) {
    const target = CORRECT_DIAGRAM_SLOTS[slotId];
    const actual = slots[slotId];
    if (actual === target) {
      correctCount++;
    } else {
      wrongSlots.push(slotId);
    }
  }

  return {
    isCorrect: wrongSlots.length === 0,
    wrongSlots,
    correctCount,
  };
}

export interface RankedTeamRow {
  rank: number | '-';
  team: TeamState;
  statusText: string;
  statusBadge: 'completed' | 'defeat' | 'eliminated';
  formattedTime: string;
}

/**
 * Computes official leaderboard according to game rules:
 * - Only teams that correctly solved the diagram are ranked (fastest first).
 * - Eliminated or timed-out teams show '-' rank.
 */
export function computeLeaderboard(teams: TeamState[]): RankedTeamRow[] {
  const completed = teams.filter((t) => t.status === 'completed');
  const nonCompleted = teams.filter((t) => t.status !== 'completed');

  // Sort completed teams by completion time ascending
  completed.sort((a, b) => {
    const timeA = a.completionTime ?? 9999;
    const timeB = b.completionTime ?? 9999;
    return timeA - timeB;
  });

  const rankedCompleted: RankedTeamRow[] = completed.map((team, idx) => ({
    rank: idx + 1,
    team,
    statusText: 'Hoàn thành',
    statusBadge: 'completed',
    formattedTime: team.completionTime ? formatTime(team.completionTime) : '--',
  }));

  const rankedNonCompleted: RankedTeamRow[] = nonCompleted.map((team) => {
    const isEliminated = team.status === 'eliminated' || team.hearts <= 0;
    return {
      rank: '-',
      team,
      statusText: isEliminated ? 'Bị loại' : 'Thua',
      statusBadge: isEliminated ? 'eliminated' : 'defeat',
      formattedTime: '--',
    };
  });

  return [...rankedCompleted, ...rankedNonCompleted];
}

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  rollDice,
  computeNextTile,
  computeStepBack,
  formatTime,
  getNextRewardCard,
  evaluateAnswer,
  validateDiagram,
  computeLeaderboard,
} from './logic.ts';
import type { TeamState } from '../types/game.ts';

function createDummyTeam(overrides: Partial<TeamState> = {}): TeamState {
  return {
    id: 1,
    name: 'Nhóm 1',
    characterId: 1,
    color: '#0284c7',
    badgeColor: '#38bdf8',
    currentTile: 1,
    hearts: 3,
    cards: [],
    status: 'playing',
    completionTime: null,
    timeRemaining: 900,
    diagramSlots: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
    isReady: true,
    ...overrides,
  };
}

test('rollDice returns integers between 1 and 6', () => {
  for (let i = 0; i < 50; i++) {
    const val = rollDice();
    assert.ok(val >= 1 && val <= 6);
    assert.equal(Math.floor(val), val);
  }
});

test('computeNextTile handles regular moves and loop past 32', () => {
  assert.equal(computeNextTile(1, 4), 5);
  assert.equal(computeNextTile(30, 2), 32);
  assert.equal(computeNextTile(30, 3), 1); // 33 - 32 = 1
  assert.equal(computeNextTile(32, 6), 6); // 38 - 32 = 6
  assert.equal(computeNextTile(31, 5), 4); // 36 - 32 = 4
});

test('computeStepBack never steps back before tile 01', () => {
  assert.equal(computeStepBack(10, 4), 6);
  assert.equal(computeStepBack(3, 2), 1);
  assert.equal(computeStepBack(2, 4), 1);
  assert.equal(computeStepBack(1, 6), 1);
});

test('formatTime formats seconds into MM:SS string correctly', () => {
  assert.equal(formatTime(900), '15:00');
  assert.equal(formatTime(365), '06:05');
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(-10), '00:00');
});

test('getNextRewardCard provides next uncollected card 1..8', () => {
  assert.equal(getNextRewardCard([]), 1);
  assert.equal(getNextRewardCard([1, 2]), 3);
  assert.equal(getNextRewardCard([1, 2, 4, 5]), 3);
  assert.equal(getNextRewardCard([1, 2, 3, 4, 5, 6, 7]), 8);
  assert.equal(getNextRewardCard([1, 2, 3, 4, 5, 6, 7, 8]), null);
});

test('evaluateAnswer handles correct answer and card collection', () => {
  const team = createDummyTeam({ cards: [1, 2, 3] });
  const result = evaluateAnswer(team, false, true);
  assert.equal(result.effect, 'card_added');
  assert.deepEqual(result.updatedTeam.cards, [1, 2, 3, 4]);
  assert.equal(result.updatedTeam.hearts, 3);
});

test('evaluateAnswer transitions to diagram when 8 cards are reached', () => {
  const team = createDummyTeam({ cards: [1, 2, 3, 4, 5, 6, 7] });
  const result = evaluateAnswer(team, false, true);
  assert.equal(result.updatedTeam.cards.length, 8);
  assert.equal(result.updatedTeam.status, 'diagram');
});

test('evaluateAnswer on regular wrong question loses 1 heart and steps back 2 tiles', () => {
  const team = createDummyTeam({ currentTile: 5, hearts: 3 });
  const result = evaluateAnswer(team, false, false);
  assert.equal(result.effect, 'heart_lost');
  assert.equal(result.updatedTeam.hearts, 2);
  assert.equal(result.updatedTeam.currentTile, 3);
});

test('evaluateAnswer eliminates team if hearts reach 0', () => {
  const team = createDummyTeam({ currentTile: 10, hearts: 1 });
  const result = evaluateAnswer(team, false, false);
  assert.equal(result.effect, 'eliminated');
  assert.equal(result.updatedTeam.hearts, 0);
  assert.equal(result.updatedTeam.status, 'eliminated');
});

test('evaluateAnswer on challenge tile eliminates team immediately if wrong', () => {
  const team = createDummyTeam({ currentTile: 12, hearts: 3 });
  const result = evaluateAnswer(team, true, false);
  assert.equal(result.effect, 'eliminated');
  assert.equal(result.updatedTeam.hearts, 0);
  assert.equal(result.updatedTeam.status, 'eliminated');
});

test('validateDiagram checks slots 1 to 8 against canonical order', () => {
  const correctSlots = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 };
  assert.equal(validateDiagram(correctSlots).isCorrect, true);
  assert.equal(validateDiagram(correctSlots).wrongSlots.length, 0);

  const partialSlots = { 1: 1, 2: 3, 3: 2, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 };
  const val = validateDiagram(partialSlots);
  assert.equal(val.isCorrect, false);
  assert.deepEqual(val.wrongSlots, [2, 3]);
});

test('computeLeaderboard ranks only completed teams by time and lists non-completed', () => {
  const team1 = createDummyTeam({ id: 1, name: 'Nhóm 1', status: 'completed', completionTime: 365 }); // 06:05
  const team3 = createDummyTeam({ id: 3, name: 'Nhóm 3', status: 'completed', completionTime: 408 }); // 06:48
  const team2 = createDummyTeam({ id: 2, name: 'Nhóm 2', status: 'playing', hearts: 2 });
  const team4 = createDummyTeam({ id: 4, name: 'Nhóm 4', status: 'eliminated', hearts: 0 });

  const lb = computeLeaderboard([team1, team2, team3, team4]);
  assert.equal(lb[0].team.name, 'Nhóm 1');
  assert.equal(lb[0].rank, 1);
  assert.equal(lb[0].formattedTime, '06:05');

  assert.equal(lb[1].team.name, 'Nhóm 3');
  assert.equal(lb[1].rank, 2);
  assert.equal(lb[1].formattedTime, '06:48');

  assert.equal(lb[2].rank, '-');
  assert.equal(lb[3].rank, '-');
  assert.equal(lb[3].statusBadge, 'eliminated');
});

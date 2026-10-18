export type TileType = 
  | 'start' 
  | 'question' 
  | 'challenge' 
  | 'rest' 
  | 'roll_again' 
  | 'step_back' 
  | 'reset_start' 
  | 'loop';

export interface QuestionChoice {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface QuestionData {
  id: string;
  tileNumber: number;
  topic: string;
  title: string;
  isChallenge?: boolean;
  question: string;
  choices: QuestionChoice[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface BoardTile {
  number: number; // 1 to 32
  title: string;
  subtitle: string;
  type: TileType;
  colorType: 'green' | 'tan' | 'blue' | 'purple' | 'red' | 'pink';
  icon: string;
  questionId?: string;
  row: number; // 0, 1, 2, 3
  col: number; // 0 to 7
  direction: 'right' | 'left' | 'down' | 'up';
}

export interface KnowledgeCard {
  id: number; // 1 to 8
  title: string;
  icon: string;
  description: string;
}

export interface CharacterInfo {
  id: number;
  name: string;
  title: string;
  color: string;
  bgLight: string;
  accent: string;
  gender: 'male' | 'female';
  description: string;
}

export type TeamStatus = 'ready' | 'playing' | 'diagram' | 'completed' | 'eliminated' | 'timed_out';

export interface TeamState {
  id: number; // 1 to 6
  name: string;
  characterId: number;
  color: string;
  badgeColor: string;
  currentTile: number; // 1 to 32
  hearts: number; // 0 to 3
  cards: number[]; // Array of card IDs (1 to 8)
  status: TeamStatus;
  completionTime: number | null; // in seconds from start
  timeRemaining: number; // countdown in seconds
  diagramSlots: Record<number, number | null>; // slot 1..8 -> card id 1..8
  isReady: boolean;
  isAI?: boolean;
}

export interface DiagramSlotDef {
  slotId: number; // 1 to 8
  label: string;
  targetCardId: number;
  row: number;
  col: number;
}

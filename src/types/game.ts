
export type ClueType = 'basic' | 'initials' | 'company' | 'debut' | 'nationality' | 'trivia';

export interface Clue {
  type: ClueType;
  text: string;
  order: number;
}

export interface KpopItem {
  id: string;
  type: 'idol' | 'group' | 'song' | 'product';
  name: string;
  image: string;
  clues: Clue[];
  category?: string;
  debutYear?: number;
}

export interface GameState {
  currentItem?: KpopItem;
  revealedClues: number[];
  guesses: string[];
  solved: boolean;
  startTime?: Date;
  endTime?: Date;
  score?: number;
}

export interface UserStats {
  streak: number;
  totalPlayed: number;
  totalWon: number;
  averageGuesses: number;
  bestScore: number;
}


import React, { createContext, useContext, useState, useEffect } from "react";
import { GameState, KpopItem, UserStats } from "../types/game";
import { getDailyGameItem } from "../data/gameItems";
import { toast } from "sonner";

interface GameContextType {
  gameState: GameState;
  userStats: UserStats;
  initializeGame: () => void;
  submitGuess: (guess: string) => boolean;
  revealNextClue: () => void;
  resetGame: () => void;
  shareResults: () => void;
  isLoading: boolean;
}

const initialGameState: GameState = {
  currentItem: undefined,
  revealedClues: [1], // Show first clue by default
  guesses: [],
  solved: false,
  score: 0
};

const initialUserStats: UserStats = {
  streak: 0,
  totalPlayed: 0,
  totalWon: 0,
  averageGuesses: 0,
  bestScore: 0
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [userStats, setUserStats] = useState<UserStats>(initialUserStats);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize the game on first load
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    setIsLoading(true);
    
    try {
      // Load any saved game state from localStorage
      const savedGameState = localStorage.getItem("kpop_game_state");
      const savedUserStats = localStorage.getItem("kpop_user_stats");
      
      // Check if we have a saved game from today
      let shouldStartNewGame = true;
      
      if (savedGameState) {
        const parsed = JSON.parse(savedGameState);
        const lastPlayDate = parsed.startTime ? new Date(parsed.startTime) : null;
        
        if (lastPlayDate) {
          const today = new Date();
          shouldStartNewGame = 
            lastPlayDate.getDate() !== today.getDate() || 
            lastPlayDate.getMonth() !== today.getMonth() ||
            lastPlayDate.getFullYear() !== today.getFullYear() ||
            parsed.solved;
        }
        
        if (!shouldStartNewGame) {
          setGameState(parsed);
        }
      }
      
      if (shouldStartNewGame) {
        const dailyItem = getDailyGameItem();
        setGameState({
          currentItem: dailyItem,
          revealedClues: [1], // First clue revealed by default
          guesses: [],
          solved: false,
          startTime: new Date()
        });
      }
      
      // Load user stats if available
      if (savedUserStats) {
        setUserStats(JSON.parse(savedUserStats));
      }
    } catch (error) {
      console.error("Error initializing game:", error);
      
      // Fallback to a new game
      const dailyItem = getDailyGameItem();
      setGameState({
        currentItem: dailyItem,
        revealedClues: [1],
        guesses: [],
        solved: false,
        startTime: new Date()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveGameState = (state: GameState) => {
    localStorage.setItem("kpop_game_state", JSON.stringify(state));
  };

  const saveUserStats = (stats: UserStats) => {
    localStorage.setItem("kpop_user_stats", JSON.stringify(stats));
  };

  const submitGuess = (guess: string): boolean => {
    if (!gameState.currentItem || gameState.solved) return false;
    
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedAnswer = gameState.currentItem.name.toLowerCase();
    
    const isCorrect = normalizedGuess === normalizedAnswer;
    
    const updatedGameState = {
      ...gameState,
      guesses: [...gameState.guesses, guess],
      solved: isCorrect
    };
    
    if (isCorrect) {
      updatedGameState.endTime = new Date();
      updatedGameState.score = calculateScore(
        gameState.revealedClues.length,
        gameState.guesses.length + 1,
        gameState.startTime!
      );
      
      // Update user stats
      const updatedStats = {
        ...userStats,
        streak: userStats.streak + 1,
        totalPlayed: userStats.totalPlayed + 1,
        totalWon: userStats.totalWon + 1,
        averageGuesses: Math.round(((userStats.averageGuesses * userStats.totalWon) + gameState.guesses.length + 1) / (userStats.totalWon + 1)),
        bestScore: Math.max(userStats.bestScore, updatedGameState.score)
      };
      
      setUserStats(updatedStats);
      saveUserStats(updatedStats);
      
      // Show success toast
      toast.success("Congratulations! You got it right!");
    } else {
      // Show clue toast
      toast.error("Not correct! Try again.");
      
      // Reveal next clue if there are more available
      if (gameState.currentItem.clues.length > gameState.revealedClues.length) {
        revealNextClue();
      }
    }
    
    setGameState(updatedGameState);
    saveGameState(updatedGameState);
    
    return isCorrect;
  };

  const revealNextClue = () => {
    if (!gameState.currentItem) return;
    
    const sortedClues = gameState.currentItem.clues.sort((a, b) => a.order - b.order);
    
    if (gameState.revealedClues.length < sortedClues.length) {
      const nextClueOrder = sortedClues[gameState.revealedClues.length].order;
      
      const updatedGameState = {
        ...gameState,
        revealedClues: [...gameState.revealedClues, nextClueOrder]
      };
      
      setGameState(updatedGameState);
      saveGameState(updatedGameState);
    }
  };

  const resetGame = () => {
    const dailyItem = getDailyGameItem();
    const newGameState: GameState = {
      currentItem: dailyItem,
      revealedClues: [1],
      guesses: [],
      solved: false,
      startTime: new Date()
    };
    
    setGameState(newGameState);
    saveGameState(newGameState);
  };

  const shareResults = () => {
    if (!gameState.solved || !gameState.currentItem) return;
    
    const guessCount = gameState.guesses.length;
    const itemType = gameState.currentItem.type;
    
    let shareText = `I guessed today's K-pop ${itemType} in ${guessCount} tries!\n`;
    shareText += `Score: ${gameState.score}\n`;
    shareText += `Play today's game at yourdomain.com`;
    
    if (navigator.share) {
      navigator.share({
        title: "My K-pop Guess Result",
        text: shareText
      }).catch(err => {
        console.error("Error sharing:", err);
        // Fallback: copy to clipboard
        copyToClipboard(shareText);
      });
    } else {
      // Fallback: copy to clipboard
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Result copied to clipboard!");
    }).catch(err => {
      console.error("Could not copy text: ", err);
      toast.error("Could not copy to clipboard");
    });
  };

  const calculateScore = (cluesRevealed: number, guesses: number, startTime: Date): number => {
    const timeBonus = Math.max(0, 100 - Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
    const clueBonus = Math.max(0, 500 - (cluesRevealed * 100));
    const guessBonus = Math.max(0, 500 - (guesses * 50));
    
    return clueBonus + guessBonus + timeBonus;
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        userStats,
        initializeGame,
        submitGuess,
        revealNextClue,
        resetGame,
        shareResults,
        isLoading
      }}
    >
      {children}
    </GameContext.Provider>
  );
}


import { createContext, useContext, useState, useEffect } from "react";
import { GameState, UserStats } from "../types/game";
import { toast } from "sonner";
import { calculateScore, copyToClipboard } from "../utils/gameUtils";
import { getDailyGameItem } from "../data/gameItems";
import { useGameStorage } from "../hooks/useGameStorage";

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

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    revealedClues: [1],
    guesses: [],
    solved: false,
    score: 0
  });
  const [userStats, setUserStats] = useState<UserStats>({
    streak: 0,
    totalPlayed: 0,
    totalWon: 0,
    averageGuesses: 0,
    bestScore: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const { saveGameState, saveUserStats, loadGameState, loadUserStats } = useGameStorage();

  // Initialize the game on first load
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    setIsLoading(true);
    
    try {
      // Load any saved game state and stats
      const savedState = loadGameState();
      const savedStats = loadUserStats();
      
      // Check if we have a saved game from today
      let shouldStartNewGame = true;
      
      if (savedState) {
        const lastPlayDate = savedState.startTime ? new Date(savedState.startTime) : null;
        
        if (lastPlayDate) {
          const today = new Date();
          shouldStartNewGame = 
            lastPlayDate.getDate() !== today.getDate() || 
            lastPlayDate.getMonth() !== today.getMonth() ||
            lastPlayDate.getFullYear() !== today.getFullYear() ||
            savedState.solved;
        }
        
        if (!shouldStartNewGame) {
          setGameState(savedState);
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
      
      // Set user stats if available
      if (savedStats) {
        setUserStats(savedStats);
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
      // Show error toast
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
    const newGameState = {
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


import { GameState, UserStats } from "../types/game";

export function useGameStorage() {
  const saveGameState = (state: GameState) => {
    localStorage.setItem("kpop_game_state", JSON.stringify(state));
  };

  const saveUserStats = (stats: UserStats) => {
    localStorage.setItem("kpop_user_stats", JSON.stringify(stats));
  };

  const loadGameState = (): GameState | null => {
    const savedGameState = localStorage.getItem("kpop_game_state");
    if (savedGameState) {
      return JSON.parse(savedGameState);
    }
    return null;
  };

  const loadUserStats = (): UserStats | null => {
    const savedUserStats = localStorage.getItem("kpop_user_stats");
    if (savedUserStats) {
      return JSON.parse(savedUserStats);
    }
    return null;
  };

  return {
    saveGameState,
    saveUserStats,
    loadGameState,
    loadUserStats
  };
}

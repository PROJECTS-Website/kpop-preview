
import { Button } from "@/components/ui/button";
import { useGameContext } from "@/contexts/GameContext";
import { Trophy, User } from "lucide-react";

const UserStats = () => {
  const { userStats } = useGameContext();

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-pink-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-kpop-text">Your Stats</h3>
        <Button variant="outline" size="sm" className="text-xs">
          <User className="h-3 w-3 mr-1" /> Sign In
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-pink-50 rounded-lg p-2">
          <p className="text-xs text-gray-500">Streak</p>
          <p className="font-bold text-kpop-primary">{userStats.streak}</p>
        </div>
        <div className="bg-pink-50 rounded-lg p-2">
          <p className="text-xs text-gray-500">Played</p>
          <p className="font-bold text-kpop-primary">{userStats.totalPlayed}</p>
        </div>
        <div className="bg-pink-50 rounded-lg p-2">
          <p className="text-xs text-gray-500">Win %</p>
          <p className="font-bold text-kpop-primary">
            {userStats.totalPlayed > 0 
              ? Math.round((userStats.totalWon / userStats.totalPlayed) * 100) 
              : 0}%
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <Button variant="ghost" size="sm" className="w-full text-xs flex justify-center items-center text-kpop-accent">
          <Trophy className="h-3 w-3 mr-1" /> View Leaderboard
        </Button>
      </div>
    </div>
  );
};

export default UserStats;

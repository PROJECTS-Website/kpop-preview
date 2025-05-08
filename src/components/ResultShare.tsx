
import { Button } from "@/components/ui/button";
import { useGameContext } from "@/contexts/GameContext";
import { Share2, Copy, Trophy, Twitter, MessageCircle } from "lucide-react";

const ResultShare = () => {
  const { gameState, userStats, shareResults } = useGameContext();

  if (!gameState.solved) {
    return null;
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="kpop-card border-2 border-kpop-primary bg-gradient-to-r from-pink-50 to-purple-50">
        <h3 className="text-xl font-bold text-center mb-4">
          You got it in {gameState.guesses.length + 1} tries!
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-2xl font-bold text-kpop-primary">{gameState.score}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Streak</p>
            <p className="text-2xl font-bold text-kpop-accent">{userStats.streak}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={shareResults}
            className="w-full bg-kpop-primary hover:bg-kpop-primary/80"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share Result
          </Button>
          
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="flex flex-col items-center justify-center py-3">
              <Twitter className="h-5 w-5 mb-1" />
              <span className="text-xs">Twitter</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center py-3">
              <MessageCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">WhatsApp</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center py-3">
              <Copy className="h-5 w-5 mb-1" />
              <span className="text-xs">Copy</span>
            </Button>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-center text-gray-600">
            New challenge in <span className="font-bold">24:00:00</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultShare;

import { useState } from "react";
import { useGameContext } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, Send, VolumeX, Volume2 } from "lucide-react";
import ClueDisplay from "@/components/ClueDisplay";
import GuessInput from "@/components/GuessInput";
import ResultShare from "@/components/ResultShare";
import UserStats from "@/components/UserStats";
import { GameProvider } from "@/contexts/GameContext";

const VoiceGuessContent = () => {
  const { gameState, isLoading } = useGameContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Audio play logic would go here
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Mute logic would go here
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-kpop-primary font-medium">Loading game...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-kpop-background">
      <header className="bg-white shadow-md py-4">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-kpop-primary">Voice Guess</h1>
            <Button variant="outline" size="sm" asChild>
              <a href="/games">Back to Games</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container max-w-4xl mx-auto py-6 px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="kpop-card max-w-md mx-auto w-full">
            <div className="flex flex-col items-center p-4 space-y-4">
              <div className="bg-kpop-primary/10 rounded-full p-8 mb-4">
                <Button 
                  onClick={togglePlay} 
                  className="h-16 w-16 rounded-full bg-kpop-primary hover:bg-kpop-primary/80"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <Play className="h-8 w-8 ml-1" />
                  )}
                </Button>
              </div>
              
              <div className="flex justify-center space-x-2 w-full">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Play Again
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">
                Listen carefully and try to identify the idol's voice!
              </p>
            </div>
          </div>
          
          <div className="max-w-md mx-auto w-full space-y-6">
            <ClueDisplay />
            <GuessInput />
            <ResultShare />
          </div>
          
          <div className="max-w-md mx-auto w-full">
            <UserStats />
          </div>
        </div>
      </main>
      
      <footer className="py-4 px-4 text-center text-sm text-gray-500">
        &copy; 2025 K-Pop Guess Game | Daily K-pop guessing game
      </footer>
    </div>
  );
};

const VoiceGuess = () => {
  return (
    <GameProvider>
      <VoiceGuessContent />
    </GameProvider>
  );
};

export default VoiceGuess;

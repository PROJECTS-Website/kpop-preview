
import { GameProvider } from "@/contexts/GameContext";
import GameHeader from "@/components/GameHeader";
import ImageReveal from "@/components/ImageReveal";
import ClueDisplay from "@/components/ClueDisplay";
import GuessInput from "@/components/GuessInput";
import ResultShare from "@/components/ResultShare";
import UserStats from "@/components/UserStats";
import Confetti from "@/components/Confetti";
import { useGameContext } from "@/contexts/GameContext";

const GameContent = () => {
  const { isLoading } = useGameContext();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-kpop-primary font-medium">Loading game...</div>
      </div>
    );
  }
  
  return (
    <>
      <Confetti />
      
      <div className="grid grid-cols-1 gap-6">
        <ImageReveal className="max-w-md mx-auto w-full" />
        
        <div className="max-w-md mx-auto w-full space-y-6">
          <ClueDisplay />
          <GuessInput />
          <ResultShare />
        </div>
        
        <div className="max-w-md mx-auto w-full">
          <UserStats />
        </div>
      </div>
    </>
  );
};

const Index = () => {
  return (
    <GameProvider>
      <div className="min-h-screen flex flex-col bg-kpop-background">
        <GameHeader />
        
        <main className="flex-grow container max-w-4xl mx-auto py-6 px-4 sm:px-6">
          <GameContent />
        </main>
        
        <footer className="py-4 px-4 text-center text-sm text-gray-500">
          &copy; 2025 K-Pop Guess Game | Daily K-pop guessing game
        </footer>
      </div>
    </GameProvider>
  );
};

export default Index;

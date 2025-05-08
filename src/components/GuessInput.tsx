
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameContext } from "@/contexts/GameContext";
import { Search, Check, X } from "lucide-react";

const GuessInput = () => {
  const { gameState, submitGuess } = useGameContext();
  const [guessValue, setGuessValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessValue.trim()) return;
    
    const isCorrect = submitGuess(guessValue);
    setGuessValue("");
  };

  if (gameState.solved) {
    return (
      <div className="kpop-card border-2 border-kpop-success bg-green-50 flex items-center justify-center p-4">
        <Check className="text-kpop-success mr-2" />
        <p className="font-medium text-kpop-success">
          Correct! The answer is <span className="font-bold">{gameState.currentItem?.name}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <Input
          type="text"
          value={guessValue}
          onChange={(e) => setGuessValue(e.target.value)}
          placeholder="Enter your guess..."
          className="flex-grow rounded-full text-base px-4 py-6 border-2 focus:border-kpop-accent"
        />
        <Button 
          type="submit" 
          className="rounded-full px-6 bg-kpop-primary hover:bg-kpop-primary/80"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Previous guesses */}
      {gameState.guesses.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Previous guesses:</p>
          <div className="flex flex-wrap gap-2">
            {gameState.guesses.map((guess, index) => (
              <div 
                key={index} 
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {guess}
                <X className="ml-1 h-3 w-3" />
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default GuessInput;

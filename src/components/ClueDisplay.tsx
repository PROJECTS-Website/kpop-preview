
import { useEffect, useState } from "react";
import { useGameContext } from "@/contexts/GameContext";
import { Clue } from "@/types/game";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

const ClueDisplay = () => {
  const { gameState, revealNextClue } = useGameContext();
  const [visibleClues, setVisibleClues] = useState<Clue[]>([]);

  useEffect(() => {
    if (!gameState.currentItem) return;

    const clues = gameState.currentItem.clues
      .filter(clue => gameState.revealedClues.includes(clue.order))
      .sort((a, b) => a.order - b.order);

    setVisibleClues(clues);
  }, [gameState.currentItem, gameState.revealedClues]);

  if (!gameState.currentItem || visibleClues.length === 0) {
    return <div className="p-4 text-center">Loading clues...</div>;
  }

  const canRevealMore = gameState.currentItem.clues.length > gameState.revealedClues.length;

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold text-center">Clues</h2>
      
      <div className="space-y-2">
        {visibleClues.map((clue, index) => (
          <div 
            key={clue.order} 
            className={cn(
              "kpop-card animate-fade-in flex items-start gap-3",
              index === visibleClues.length - 1 && "border-2 border-kpop-primary"
            )}
          >
            <div className="bg-kpop-primary text-white rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
              {clue.order}
            </div>
            <p>{clue.text}</p>
          </div>
        ))}
      </div>

      {!gameState.solved && canRevealMore && (
        <Button 
          onClick={revealNextClue}
          className="w-full mt-4 bg-kpop-accent hover:bg-kpop-accent/80 text-white font-medium"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Reveal Next Clue
        </Button>
      )}
    </div>
  );
};

export default ClueDisplay;

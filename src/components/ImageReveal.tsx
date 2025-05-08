
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGameContext } from "@/contexts/GameContext";

interface ImageRevealProps {
  className?: string;
}

const ImageReveal = ({ className }: ImageRevealProps) => {
  const { gameState } = useGameContext();
  const [blurLevel, setBlurLevel] = useState(12);
  
  useEffect(() => {
    if (!gameState.currentItem) return;
    
    // Gradually decrease blur based on revealed clues
    const maxClues = gameState.currentItem.clues.length;
    const revealedCount = gameState.revealedClues.length;
    
    // Calculate blur from 12 (maximum) to 0 (fully revealed)
    const newBlurLevel = gameState.solved 
      ? 0 
      : Math.max(0, 12 - Math.floor((revealedCount / maxClues) * 12));
    
    setBlurLevel(newBlurLevel);
  }, [gameState.revealedClues.length, gameState.solved, gameState.currentItem]);

  if (!gameState.currentItem) {
    return (
      <div className={cn("rounded-2xl bg-gray-200 animate-pulse w-full h-80", className)}>
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-hidden rounded-2xl relative", className)}>
      <div 
        className="w-full aspect-square bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${gameState.currentItem.image})`,
          filter: `blur(${blurLevel}px)` 
        }}
      />
      
      {/* Overlay with category type */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {gameState.currentItem.type.charAt(0).toUpperCase() + gameState.currentItem.type.slice(1)}
      </div>
    </div>
  );
};

export default ImageReveal;

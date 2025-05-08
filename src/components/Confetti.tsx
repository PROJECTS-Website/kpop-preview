
import { useEffect, useState } from "react";
import { useGameContext } from "@/contexts/GameContext";

const Confetti = () => {
  const { gameState } = useGameContext();
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    if (gameState.solved) {
      setShowConfetti(true);
      generateConfetti();
      
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.solved]);
  
  const generateConfetti = () => {
    const pieces = [];
    const colors = [
      'bg-kpop-primary',
      'bg-kpop-accent',
      'bg-yellow-400',
      'bg-blue-500',
      'bg-green-400'
    ];
    
    for (let i = 0; i < 50; i++) {
      const left = `${Math.random() * 100}%`;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = `${Math.random() * 0.7 + 0.3}rem`;
      const delay = `${Math.random() * 1.5}s`;
      const rotation = `${Math.random() * 360}deg`;
      
      pieces.push(
        <div
          key={i}
          className={`absolute ${color} animate-confetti-fall`}
          style={{
            left,
            width: size,
            height: size,
            animationDelay: delay,
            transform: `rotate(${rotation})`,
          }}
        />
      );
    }
    
    setConfettiPieces(pieces);
  };
  
  if (!showConfetti) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces}
    </div>
  );
};

export default Confetti;

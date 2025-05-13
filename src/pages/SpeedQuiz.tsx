
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer } from "lucide-react";

const SpeedQuiz = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const startGame = () => {
    setIsStarted(true);
    setTimeLeft(60);
    setScore(0);
  };
  
  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (guess.trim() !== "") {
      // In a real implementation, we'd check against a database of valid answers
      // For this demo, we'll just give points for any non-empty guess
      setScore(score + 1);
      setGuess("");
    }
  };
  
  useEffect(() => {
    if (!isStarted || isFinished) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isStarted, isFinished]);

  return (
    <div className="min-h-screen flex flex-col bg-kpop-background">
      <header className="bg-white shadow-md py-4">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-kpop-primary">Speed Quiz</h1>
            <Button variant="outline" size="sm" asChild>
              <a href="/games">Back to Games</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container max-w-4xl mx-auto py-6 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          {!isStarted ? (
            <div className="kpop-card text-center">
              <h2 className="text-2xl font-bold mb-4">K-pop Speed Quiz</h2>
              <p className="mb-8 text-gray-600">
                Name as many K-pop idols, groups, or songs as you can in 60 seconds!
              </p>
              <Button 
                onClick={startGame} 
                className="bg-kpop-primary hover:bg-kpop-primary/80"
              >
                Start Game
              </Button>
            </div>
          ) : isFinished ? (
            <div className="kpop-card text-center animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
              <div className="text-center mb-6">
                <div className="inline-block p-8 bg-kpop-primary/10 rounded-full mb-4">
                  <div className="text-5xl font-bold text-kpop-primary">{score}</div>
                </div>
                <p className="text-gray-600">K-pop items named</p>
              </div>
              <div className="space-y-4">
                <Button 
                  onClick={() => {
                    setIsFinished(false);
                    startGame();
                  }} 
                  className="w-full bg-kpop-primary"
                >
                  Play Again
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setIsStarted(false);
                    setIsFinished(false);
                  }}
                >
                  Back to Instructions
                </Button>
              </div>
            </div>
          ) : (
            <div className="kpop-card">
              <div className="flex justify-between items-center mb-6">
                <div className="bg-kpop-accent/10 px-4 py-2 rounded-lg">
                  <span className="font-bold text-xl text-kpop-accent">{score}</span>
                  <span className="text-sm text-gray-500 ml-1">points</span>
                </div>
                <div className="bg-pink-100 px-4 py-2 rounded-lg flex items-center">
                  <Timer className="h-4 w-4 text-kpop-primary mr-1" />
                  <span className="font-bold text-xl text-kpop-primary">{timeLeft}</span>
                  <span className="text-sm text-gray-500 ml-1">sec</span>
                </div>
              </div>
              
              <form onSubmit={handleGuess} className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Type any K-pop idol, group or song:</p>
                  <Input
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Type here..."
                    className="text-lg"
                    autoFocus
                  />
                </div>
                
                <Button type="submit" className="w-full bg-kpop-primary">
                  Submit Answer
                </Button>
              </form>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-4 px-4 text-center text-sm text-gray-500">
        &copy; 2025 K-Pop Guess Game | Daily K-pop guessing game
      </footer>
    </div>
  );
};

export default SpeedQuiz;

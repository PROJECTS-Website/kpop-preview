
import { Music } from "lucide-react";

const GameHeader = () => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center border-b border-pink-200">
      <div className="flex items-center gap-2">
        <Music className="h-6 w-6 text-kpop-primary" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-kpop-primary to-kpop-accent bg-clip-text text-transparent">
          K-Pop Guess
        </h1>
      </div>
      <nav className="flex gap-4">
        <a href="#" className="text-kpop-primary hover:text-kpop-accent font-medium">
          Rules
        </a>
        <a href="#" className="text-kpop-primary hover:text-kpop-accent font-medium">
          Leaderboard
        </a>
      </nav>
    </header>
  );
};

export default GameHeader;

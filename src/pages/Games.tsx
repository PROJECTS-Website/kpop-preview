
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Image, Timer, Award } from "lucide-react";

const GameCard = ({ 
  title, 
  description, 
  icon, 
  to 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  to: string;
}) => (
  <Link 
    to={to} 
    className="kpop-card hover-scale border-2 border-pink-200 hover:border-kpop-primary transition-colors"
  >
    <div className="flex flex-col items-center text-center p-4">
      <div className="bg-kpop-primary/10 rounded-full p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

const Games = () => {
  return (
    <div className="container max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-kpop-primary">
        Choose a Game
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GameCard
          title="Image Blur/Reveal"
          description="Guess the idol or group from a progressively revealed image"
          icon={<Image className="h-8 w-8 text-kpop-primary" />}
          to="/"
        />
        
        <GameCard
          title="Voice Guess"
          description="Listen to audio clips and guess the idol"
          icon={<Music className="h-8 w-8 text-kpop-primary" />}
          to="/voice-guess"
        />
        
        <GameCard
          title="K-pop Trivia"
          description="Test your knowledge with fact-based quizzes"
          icon={<Award className="h-8 w-8 text-kpop-primary" />}
          to="/trivia"
        />
        
        <GameCard
          title="Speed Quiz"
          description="Race against time to identify as many idols as possible"
          icon={<Timer className="h-8 w-8 text-kpop-primary" />}
          to="/speed-quiz"
        />
      </div>
    </div>
  );
};

export default Games;

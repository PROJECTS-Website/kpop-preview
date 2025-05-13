
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Grid, User, Settings } from "lucide-react";

const GameHeader = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-kpop-primary to-kpop-accent bg-clip-text text-transparent">
              K-pop Guess
            </h1>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <Link to="/games">
                <Grid className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="sm" className="ml-2">
              <User className="h-4 w-4 mr-1" />
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;

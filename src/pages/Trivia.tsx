
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserStats from "@/components/UserStats";

const Trivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  // Sample trivia questions
  const questions = [
    {
      question: "Which group debuted with the song 'No More Dream'?",
      options: ["BTS", "EXO", "SEVENTEEN", "GOT7"],
      answer: 0
    },
    {
      question: "Which company is BLACKPINK under?",
      options: ["SM Entertainment", "JYP Entertainment", "YG Entertainment", "HYBE"],
      answer: 2
    },
    {
      question: "Who is known as the 'Dance Machine' in BTS?",
      options: ["Jin", "Jungkook", "J-Hope", "Jimin"],
      answer: 2
    },
    {
      question: "Which K-pop song became the first to reach #1 on Billboard Hot 100?",
      options: ["Boy With Luv", "Dynamite", "Gangnam Style", "How You Like That"],
      answer: 1
    },
    {
      question: "Which K-pop idol is from Thailand and is a member of BLACKPINK?",
      options: ["Jisoo", "Rose", "Jennie", "Lisa"],
      answer: 3
    }
  ];

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-kpop-background">
      <header className="bg-white shadow-md py-4">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-kpop-primary">K-pop Trivia</h1>
            <Button variant="outline" size="sm" asChild>
              <a href="/games">Back to Games</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container max-w-4xl mx-auto py-6 px-4 sm:px-6">
        {showResult ? (
          <div className="kpop-card max-w-md mx-auto animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-center">Quiz Completed!</h2>
            <p className="text-center text-xl mb-6">
              Your score: <span className="font-bold text-kpop-primary">{score}</span> out of {questions.length}
            </p>
            
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-kpop-primary/10 rounded-full">
                <div className="text-3xl font-bold text-kpop-primary">
                  {Math.round((score / questions.length) * 100)}%
                </div>
              </div>
            </div>
            
            <Button onClick={restartQuiz} className="w-full bg-kpop-primary">
              Play Again
            </Button>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="kpop-card mb-6">
              <div className="mb-4 text-center">
                <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-kpop-primary h-2.5 rounded-full transition-all" 
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            
              <h2 className="text-xl font-bold mb-6">{questions[currentQuestion].question}</h2>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full justify-start p-4 h-auto text-left bg-white hover:bg-kpop-primary/10 text-kpop-text hover:text-kpop-primary border border-gray-200 hover:border-kpop-primary"
                    variant="outline"
                  >
                    <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span> {option}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="text-center text-gray-500 text-sm">
              Answer questions to earn points!
            </div>
          </div>
        )}
        
        <div className="mt-8 max-w-md mx-auto w-full">
          <UserStats />
        </div>
      </main>
      
      <footer className="py-4 px-4 text-center text-sm text-gray-500">
        &copy; 2025 K-Pop Guess Game | Daily K-pop guessing game
      </footer>
    </div>
  );
};

export default Trivia;

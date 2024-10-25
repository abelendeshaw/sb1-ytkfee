'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Trophy, ArrowRight, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const questions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    id: 3,
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 'Leonardo da Vinci',
  },
  {
    id: 4,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 'Pacific Ocean',
  },
  {
    id: 5,
    question: 'Which element has the chemical symbol "Au"?',
    options: ['Silver', 'Gold', 'Copper', 'Aluminum'],
    correctAnswer: 'Gold',
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (question.correctAnswer === selectedAnswers[index] ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(''));
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <Card className="animate-in fade-in-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
          <CardDescription>Here's how you performed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Score: {score}/{questions.length}</span>
              <span>{percentage.toFixed(0)}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q.id} className="p-4 rounded-lg bg-muted">
                <p className="font-medium">{q.question}</p>
                <p className={cn(
                  "mt-2 text-sm",
                  selectedAnswers[index] === q.correctAnswer
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                )}>
                  Your answer: {selectedAnswers[index]}
                  {selectedAnswers[index] !== q.correctAnswer && (
                    <span className="block text-green-600 dark:text-green-400">
                      Correct answer: {q.correctAnswer}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
          <Button onClick={resetQuiz} className="w-full">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Card className="animate-in fade-in-50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Question {currentQuestion + 1}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <h2 className="text-xl font-semibold">{currentQ.question}</h2>
        <RadioGroup
          value={selectedAnswers[currentQuestion]}
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {currentQ.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label
                htmlFor={option}
                className="flex-grow p-3 -ml-2 rounded-md hover:bg-muted cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestion]}
          className="w-full"
        >
          {currentQuestion === questions.length - 1 ? (
            'Show Results'
          ) : (
            <>
              Next Question
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
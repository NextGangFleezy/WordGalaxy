import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface WordStarProps {
  word: string;
  isCorrect: boolean;
  onSelect: (word: string) => void;
  disabled?: boolean;
}

export default function WordStar({ word, isCorrect, onSelect, disabled }: WordStarProps) {
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleClick = () => {
    if (disabled) return;
    
    const feedbackType = isCorrect ? 'correct' : 'wrong';
    setFeedback(feedbackType);
    
    setTimeout(() => {
      setFeedback(null);
      onSelect(word);
    }, isCorrect ? 2000 : 1500);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={`
        word-star w-40 h-40 rounded-full font-bold text-2xl text-white 
        transform transition-all duration-300 animate-float
        hover:scale-110 hover:shadow-2xl
        ${feedback === 'correct' ? 'correct-answer' : ''}
        ${feedback === 'wrong' ? 'wrong-answer' : ''}
      `}
    >
      {word}
    </Button>
  );
}

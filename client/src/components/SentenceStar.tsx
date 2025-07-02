import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SentenceStarProps {
  sentence: string;
  isCorrect: boolean;
  onSelect: (sentence: string) => void;
  disabled?: boolean;
}

export default function SentenceStar({ sentence, isCorrect, onSelect, disabled }: SentenceStarProps) {
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleClick = () => {
    if (disabled) return;
    
    const feedbackType = isCorrect ? 'correct' : 'wrong';
    setFeedback(feedbackType);
    
    setTimeout(() => {
      setFeedback(null);
      onSelect(sentence);
    }, isCorrect ? 2000 : 1500);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={`
        word-star w-64 h-32 rounded-xl font-bold text-lg text-white 
        transform transition-all duration-300 animate-float
        hover:scale-105 hover:shadow-2xl p-4
        ${feedback === 'correct' ? 'correct-answer' : ''}
        ${feedback === 'wrong' ? 'wrong-answer' : ''}
      `}
    >
      <span className="text-center leading-tight">{sentence}</span>
    </Button>
  );
}
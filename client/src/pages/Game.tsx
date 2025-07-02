import { useParams, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import StarField from '@/components/StarField';
import WordStar from '@/components/WordStar';
import CompletionModal from '@/components/CompletionModal';
import { getPlanetById } from '@/lib/gameData';
import { useGameState } from '@/hooks/useGameState';
import { useSpeech } from '@/hooks/useSpeech';

export default function Game() {
  const { planet: planetId } = useParams<{ planet: string }>();
  const [, setLocation] = useLocation();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const planet = getPlanetById(planetId || '');
  const { gameState, getCurrentWord, getWordOptions, handleCorrectAnswer } = useGameState(planet);
  const { speak } = useSpeech();

  const currentWord = getCurrentWord();
  const wordOptions = getWordOptions();

  // Auto-speak word when it changes
  useEffect(() => {
    if (currentWord && !gameState.isComplete) {
      const timer = setTimeout(() => speak(currentWord), 500);
      return () => clearTimeout(timer);
    }
  }, [currentWord, gameState.isComplete, speak]);

  // Redirect if planet not found
  useEffect(() => {
    if (planetId && !planet) {
      setLocation('/planets');
    }
  }, [planetId, planet, setLocation]);

  const handleWordSelect = (selectedWord: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    const isCorrect = selectedWord === currentWord;
    
    if (isCorrect) {
      setFeedbackMessage('🌟 Great job! 🌟');
      setFeedbackType('success');
      
      setTimeout(() => {
        handleCorrectAnswer();
        setFeedbackMessage('');
        setFeedbackType('');
        setIsProcessing(false);
      }, 2000);
    } else {
      setFeedbackMessage('❌ Try again! ❌');
      setFeedbackType('error');
      
      setTimeout(() => {
        setFeedbackMessage('');
        setFeedbackType('');
        setIsProcessing(false);
      }, 1500);
    }
  };

  const handleContinue = () => {
    setLocation('/planets');
  };

  if (!planet) {
    return (
      <div className="galaxy-bg min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="galaxy-bg min-h-screen overflow-hidden">
      <StarField />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Progress Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {planet.displayName}
          </h2>
          <div className="text-2xl text-yellow-300 font-bold">
            ⭐ {gameState.correctAnswers}/{gameState.shuffledWords.length} stars collected
          </div>
        </div>
        
        {/* Target Word Display */}
        <div className="text-center mb-12">
          <p className="text-2xl text-white mb-4">Find this word:</p>
          <div className="text-6xl md:text-8xl font-bold text-yellow-400 bg-black bg-opacity-50 px-8 py-4 rounded-3xl border-4 border-yellow-400 shadow-2xl">
            {currentWord}
          </div>
          <Button 
            onClick={() => speak(currentWord)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            🔊 Hear Word
          </Button>
        </div>
        
        {/* Word Stars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {wordOptions.map((word, index) => (
            <WordStar
              key={`${word}-${index}`}
              word={word}
              isCorrect={word === currentWord}
              onSelect={handleWordSelect}
              disabled={isProcessing}
            />
          ))}
        </div>
        
        {/* Feedback Message */}
        <div className={`text-4xl font-bold text-center mb-8 min-h-[60px] ${
          feedbackType === 'success' ? 'text-green-400' : 
          feedbackType === 'error' ? 'text-red-400' : ''
        }`}>
          {feedbackMessage}
        </div>
        
        {/* Back to Map Button */}
        <Button 
          onClick={() => setLocation('/planets')}
          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold text-xl px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          🗺️ Back to Map
        </Button>
      </div>
      
      {/* Completion Modal */}
      <CompletionModal
        isOpen={gameState.isComplete}
        planetName={planet.displayName}
        onContinue={handleContinue}
      />
    </div>
  );
}

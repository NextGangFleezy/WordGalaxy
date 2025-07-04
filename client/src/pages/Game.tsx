import { useParams, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import StarField from '@/components/StarField';
import WordStar from '@/components/WordStar';
import SentenceStar from '@/components/SentenceStar';
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
  const { gameState, getCurrentContent, getOptions, getTotalItems, handleCorrectAnswer } = useGameState(planet);
  const { speak, speakSlow, speakRepeat, speakSpell, preferredVoice } = useSpeech();

  const currentContent = getCurrentContent();
  const options = getOptions();
  
  // Remove auto-speak - let user control when to hear letters

  // Redirect if planet not found
  useEffect(() => {
    if (planetId && !planet) {
      setLocation('/planets');
    }
  }, [planetId, planet, setLocation]);

  const handleSelection = (selectedContent: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    const isCorrect = selectedContent === currentContent;
    
    if (isCorrect) {
      setFeedbackMessage('🌟 Great job! 🌟');
      setFeedbackType('success');
      
      // Immediately speak confirmation with the correct letter
      if (planet) {
        const confirmationText = planet.gameType === 'letters' 
          ? `Yes! ${selectedContent}!` 
          : `Correct! ${selectedContent}!`;
        speak(confirmationText);
      }
      
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
          <p className="text-lg text-blue-300 mb-2">{planet.description}</p>
          <div className="text-2xl text-yellow-300 font-bold">
            ⭐ {gameState.correctAnswers}/{getTotalItems()} stars collected
          </div>
        </div>
        
        {/* Target Content Display */}
        <div className="text-center mb-12">
          <p className="text-2xl text-white mb-4">
            {planet.gameType === 'sentences' ? 'Read this sentence:' : 
             planet.gameType === 'letters' ? 'Find this letter:' : 'Find this word:'}
          </p>
          {(planet.gameType === 'words' || planet.gameType === 'letters') && (
            <div className="text-sm text-blue-200 mb-4 space-y-1">
              <p>💡 Speech Options:</p>
              {planet.gameType === 'letters' ? (
                <p><strong>Hear Letter:</strong> Clear letter name pronunciation</p>
              ) : (
                <>
                  <p><strong>Normal:</strong> Clear pronunciation • <strong>Syllables:</strong> Slow with breaks</p>
                  <p><strong>Spell Out:</strong> Letter by letter • <strong>Learn Mode:</strong> Normal then syllables</p>
                </>
              )}
              {preferredVoice && (
                <p className="text-xs text-blue-300">
                  🎤 Using: {preferredVoice.name.replace(/Microsoft|Google|Apple/, '').trim()}
                </p>
              )}
            </div>
          )}
          <div className={`font-bold text-yellow-400 bg-black bg-opacity-50 px-8 py-4 rounded-3xl border-4 border-yellow-400 shadow-2xl ${
            planet.gameType === 'sentences' ? 'text-3xl md:text-4xl' : 'text-6xl md:text-8xl'
          }`}>
            {currentContent}
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <Button 
              onClick={() => speak(currentContent)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              🔊 {planet.gameType === 'sentences' ? 'Hear Sentence' : 
                   planet.gameType === 'letters' ? 'Hear Letter' : 'Hear Word'}
            </Button>
            {planet.gameType === 'words' && (
              <>
                <Button 
                  onClick={() => speakSlow(currentContent)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  🐌 Syllables
                </Button>
                <Button 
                  onClick={() => speakSpell(currentContent)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  🔤 Spell Out
                </Button>
                <Button 
                  onClick={() => speakRepeat(currentContent)}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  🎓 Learn Mode
                </Button>
              </>
            )}
            {planet.gameType === 'sentences' && (
              <Button 
                onClick={() => speakSlow(currentContent)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                🐌 Slow Reading
              </Button>
            )}
          </div>
        </div>
        
        {/* Content Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {options.map((option, index) => (
            planet.gameType === 'sentences' ? (
              <SentenceStar
                key={`${option}-${index}`}
                sentence={option}
                isCorrect={option === currentContent}
                onSelect={handleSelection}
                disabled={isProcessing}
              />
            ) : (
              <WordStar
                key={`${option}-${index}`}
                word={option}
                isCorrect={option === currentContent}
                onSelect={handleSelection}
                disabled={isProcessing}
              />
            )
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

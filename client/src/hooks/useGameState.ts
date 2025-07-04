import { useState, useEffect } from 'react';
import { Planet, shuffleArray, generateWrongAnswers, generateWrongLetters } from '@/lib/gameData';

export interface GameState {
  currentWordIndex: number;
  correctAnswers: number;
  shuffledWords: string[];
  shuffledSentences: string[];
  isComplete: boolean;
}

export interface GameProgress {
  [planetId: string]: number;
}

export function useGameState(planet?: Planet) {
  const [gameState, setGameState] = useState<GameState>({
    currentWordIndex: 0,
    correctAnswers: 0,
    shuffledWords: [],
    shuffledSentences: [],
    isComplete: false
  });

  const [progress, setProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem('wordGalaxyProgress');
    return saved ? JSON.parse(saved) : {};
  });

  // Initialize game when planet changes
  useEffect(() => {
    if (planet) {
      console.log('Initializing game for planet:', planet.id);
      const shuffledWords = shuffleArray([...planet.words]);
      const shuffledSentences = planet.sentences ? shuffleArray([...planet.sentences]) : [];
      setGameState({
        currentWordIndex: 0,
        correctAnswers: 0,
        shuffledWords,
        shuffledSentences,
        isComplete: false
      });
    }
  }, [planet]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('wordGalaxyProgress', JSON.stringify(progress));
  }, [progress]);

  const getCurrentWord = () => {
    if (!planet || gameState.shuffledWords.length === 0) return '';
    return gameState.shuffledWords[gameState.currentWordIndex];
  };

  const getCurrentSentence = () => {
    if (!planet || gameState.shuffledSentences.length === 0) return '';
    return gameState.shuffledSentences[gameState.currentWordIndex];
  };

  const getCurrentContent = () => {
    return planet?.gameType === 'sentences' ? getCurrentSentence() : getCurrentWord();
  };

  const getTotalItems = () => {
    return planet?.gameType === 'sentences' ? gameState.shuffledSentences.length : gameState.shuffledWords.length;
  };

  const getWordOptions = () => {
    const currentWord = getCurrentWord();
    if (!currentWord) return [];
    
    if (planet?.gameType === 'letters') {
      const wrongLetters = generateWrongLetters(currentWord, planet.words);
      return shuffleArray([currentWord, ...wrongLetters]);
    }
    
    const wrongAnswers = generateWrongAnswers(currentWord, planet?.words);
    return shuffleArray([currentWord, ...wrongAnswers]);
  };

  const getSentenceOptions = () => {
    const currentSentence = getCurrentSentence();
    if (!currentSentence || !planet?.sentences) return [];
    
    const wrongSentences = planet.sentences.filter(s => s !== currentSentence);
    const selectedWrong = shuffleArray(wrongSentences).slice(0, 2);
    return shuffleArray([currentSentence, ...selectedWrong]);
  };

  const getOptions = () => {
    return planet?.gameType === 'sentences' ? getSentenceOptions() : getWordOptions();
  };

  const handleCorrectAnswer = () => {
    console.log('handleCorrectAnswer called - advancing from index:', gameState.currentWordIndex);
    const newCorrectAnswers = gameState.correctAnswers + 1;
    const newWordIndex = gameState.currentWordIndex + 1;
    const totalItems = getTotalItems();
    const isComplete = newWordIndex >= totalItems;

    setGameState(prev => ({
      ...prev,
      correctAnswers: newCorrectAnswers,
      currentWordIndex: newWordIndex,
      isComplete
    }));

    if (isComplete && planet) {
      setProgress(prev => ({
        ...prev,
        [planet.id]: newCorrectAnswers
      }));
    }
  };

  const resetGame = () => {
    if (planet) {
      const shuffledWords = shuffleArray([...planet.words]);
      const shuffledSentences = planet.sentences ? shuffleArray([...planet.sentences]) : [];
      setGameState({
        currentWordIndex: 0,
        correctAnswers: 0,
        shuffledWords,
        shuffledSentences,
        isComplete: false
      });
    }
  };

  return {
    gameState,
    progress,
    getCurrentWord,
    getCurrentSentence,
    getCurrentContent,
    getTotalItems,
    getWordOptions,
    getSentenceOptions,
    getOptions,
    handleCorrectAnswer,
    resetGame
  };
}

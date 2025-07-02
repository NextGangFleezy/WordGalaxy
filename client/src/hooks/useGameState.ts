import { useState, useEffect } from 'react';
import { Planet, shuffleArray, generateWrongAnswers } from '@/lib/gameData';

export interface GameState {
  currentWordIndex: number;
  correctAnswers: number;
  shuffledWords: string[];
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
    isComplete: false
  });

  const [progress, setProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem('wordGalaxyProgress');
    return saved ? JSON.parse(saved) : {};
  });

  // Initialize game when planet changes
  useEffect(() => {
    if (planet) {
      const shuffledWords = shuffleArray([...planet.words]);
      setGameState({
        currentWordIndex: 0,
        correctAnswers: 0,
        shuffledWords,
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

  const getWordOptions = () => {
    const currentWord = getCurrentWord();
    if (!currentWord) return [];
    
    const wrongAnswers = generateWrongAnswers(currentWord, planet?.words);
    return shuffleArray([currentWord, ...wrongAnswers]);
  };

  const handleCorrectAnswer = () => {
    const newCorrectAnswers = gameState.correctAnswers + 1;
    const newWordIndex = gameState.currentWordIndex + 1;
    const isComplete = newWordIndex >= gameState.shuffledWords.length;

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
      setGameState({
        currentWordIndex: 0,
        correctAnswers: 0,
        shuffledWords,
        isComplete: false
      });
    }
  };

  return {
    gameState,
    progress,
    getCurrentWord,
    getWordOptions,
    handleCorrectAnswer,
    resetGame
  };
}

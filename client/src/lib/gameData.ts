export interface Planet {
  id: string;
  name: string;
  displayName: string;
  words: string[];
  sentences?: string[];
  gameType: 'words' | 'sentences';
  emoji: string;
  className: string;
  description: string;
}

export const planets: Planet[] = [
  {
    id: 'zoom',
    name: 'zoom',
    displayName: 'Planet Zoom',
    words: ['the', 'and', 'is', 'me'],
    gameType: 'words',
    emoji: '🪐',
    className: 'planet-zoom',
    description: 'Learn basic sight words'
  },
  {
    id: 'pop',
    name: 'pop',
    displayName: 'Planet Pop',
    words: ['run', 'play', 'big', 'little', 'can', 'go', 'up', 'down'],
    gameType: 'words',
    emoji: '🌍',
    className: 'planet-pop',
    description: 'Practice action and size words'
  },
  {
    id: 'zing',
    name: 'zing',
    displayName: 'Planet Zing',
    words: ['jump', 'red', 'you', 'see', 'look', 'here', 'come', 'help'],
    sentences: [
      'I can run.',
      'You can jump.',
      'Look and see.',
      'Come here and help me.',
      'The big red ball can go up.'
    ],
    gameType: 'sentences',
    emoji: '🌎',
    className: 'planet-zing',
    description: 'Read complete sentences'
  },
  {
    id: 'nova',
    name: 'nova',
    displayName: 'Planet Nova',
    words: ['with', 'they', 'have', 'this', 'from', 'said', 'what', 'make'],
    sentences: [
      'They have a big house.',
      'What can you make with this?',
      'I said you can come from here.',
      'Look at what they have.',
      'The little girl said help me.'
    ],
    gameType: 'sentences',
    emoji: '⭐',
    className: 'planet-nova',
    description: 'Advanced sentence reading'
  }
];

export const allWords = planets.flatMap(planet => planet.words);

export function getPlanetById(id: string): Planet | undefined {
  return planets.find(planet => planet.id === id);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateWrongAnswers(correctWord: string, excludeWords: string[] = []): string[] {
  const wrongWords = allWords.filter(word => 
    word !== correctWord && !excludeWords.includes(word)
  );
  return shuffleArray(wrongWords).slice(0, 2);
}

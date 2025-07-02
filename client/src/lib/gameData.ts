export interface Planet {
  id: string;
  name: string;
  displayName: string;
  words: string[];
  emoji: string;
  className: string;
}

export const planets: Planet[] = [
  {
    id: 'zoom',
    name: 'zoom',
    displayName: 'Planet Zoom',
    words: ['the', 'and', 'is', 'me'],
    emoji: '🪐',
    className: 'planet-zoom'
  },
  {
    id: 'pop',
    name: 'pop',
    displayName: 'Planet Pop',
    words: ['run', 'play', 'big', 'little'],
    emoji: '🌍',
    className: 'planet-pop'
  },
  {
    id: 'zing',
    name: 'zing',
    displayName: 'Planet Zing',
    words: ['jump', 'red', 'you', 'see'],
    emoji: '🌎',
    className: 'planet-zing'
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

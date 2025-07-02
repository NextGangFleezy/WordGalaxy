export interface Planet {
  id: string;
  name: string;
  displayName: string;
  words: string[];
  sentences?: string[];
  gameType: 'letters' | 'words' | 'sentences';
  emoji: string;
  className: string;
  description: string;
}

export const planets: Planet[] = [
  {
    id: 'alpha',
    name: 'alpha',
    displayName: 'Planet Alpha',
    words: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    gameType: 'letters',
    emoji: '🅰️',
    className: 'bg-gradient-to-br from-blue-400 to-blue-600',
    description: 'Learn your first letters! Listen carefully and find the right letter.'
  },
  {
    id: 'beta',
    name: 'beta',
    displayName: 'Planet Beta',
    words: ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
    gameType: 'letters',
    emoji: '🅱️',
    className: 'bg-gradient-to-br from-green-400 to-green-600',
    description: 'More letters to master! You are becoming a letter expert.'
  },
  {
    id: 'gamma',
    name: 'gamma',
    displayName: 'Planet Gamma',
    words: ['U', 'V', 'W', 'X', 'Y', 'Z'],
    gameType: 'letters',
    emoji: '🔤',
    className: 'bg-gradient-to-br from-orange-400 to-orange-600',
    description: 'Complete the alphabet! Now you know all your letters.'
  },
  {
    id: 'zoom',
    name: 'zoom',
    displayName: 'Planet Zoom',
    words: ['I', 'a', 'the', 'and', 'to', 'you', 'it', 'in', 'was', 'for'],
    gameType: 'words',
    emoji: '🌍',
    className: 'bg-gradient-to-br from-teal-400 to-teal-600',
    description: 'Your first sight words! These are the most common words you see every day.'
  },
  {
    id: 'pop',
    name: 'pop',
    displayName: 'Planet Pop',
    words: ['big', 'little', 'run', 'jump', 'play', 'look', 'see', 'go', 'come', 'up'],
    gameType: 'words',
    emoji: '🔴',
    className: 'bg-gradient-to-br from-red-400 to-red-600',
    description: 'Action and describing words! These help you talk about what you do.'
  },
  {
    id: 'zing',
    name: 'zing',
    displayName: 'Planet Zing',
    sentences: [
      'I can run fast.',
      'The cat is big.',
      'Look at the ball.',
      'I like to play.',
      'The sun is up.',
      'Come and see me.',
      'We can jump high.',
      'The dog can go.',
      'It is little and red.',
      'You are my friend.'
    ],
    words: [],
    gameType: 'sentences',
    emoji: '⚡',
    className: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    description: 'Read complete sentences! Put your sight words together to read full thoughts.'
  },
  {
    id: 'nova',
    name: 'nova',
    displayName: 'Planet Nova',
    sentences: [
      'The little cat likes to play in the big yard.',
      'I can see you running fast to the red ball.',
      'Come and look at the pretty flowers with me.',
      'We jump up and down when we are happy.',
      'The sun comes up every morning to make it bright.',
      'My friend and I like to go to the park together.',
      'The big dog can run faster than the little cat.',
      'Look up at the stars that twinkle in the dark sky.',
      'I was happy when you came to play with me today.',
      'The red bird likes to sit on the tall green tree.'
    ],
    words: [],
    gameType: 'sentences',
    emoji: '💫',
    className: 'bg-gradient-to-br from-purple-400 to-purple-600',
    description: 'Master longer sentences! Challenge yourself with more complex reading.'
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

export function generateWrongLetters(correctLetter: string, excludeLetters: string[] = []): string[] {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const wrongLetters = alphabet.filter(letter => 
    letter !== correctLetter && !excludeLetters.includes(letter)
  );
  return shuffleArray(wrongLetters).slice(0, 2);
}

// Pronunciation dictionary for sight words to help with correct pronunciation
export const pronunciationMap: Record<string, string> = {
  // Basic sight words with phonetic improvements
  'the': 'thuh',
  'and': 'and',
  'is': 'iz',
  'me': 'mee',
  
  // Action and size words
  'run': 'ruhn',
  'play': 'play',
  'big': 'big',
  'little': 'lit-uhl',
  'can': 'can',
  'go': 'goh',
  'up': 'uhp',
  'down': 'down',
  
  // Reading words
  'jump': 'juhmp',
  'red': 'red',
  'you': 'yoo',
  'see': 'see',
  'look': 'look',
  'here': 'heer',
  'come': 'kuhm',
  'help': 'help',
  
  // Advanced words
  'with': 'with',
  'they': 'thay',
  'have': 'hav',
  'this': 'this',
  'from': 'fruhm',
  'said': 'sed',
  'what': 'wuht',
  'make': 'mayk'
};

// Function to get phonetic pronunciation or original word
export function getPhoneticPronunciation(word: string): string {
  return pronunciationMap[word.toLowerCase()] || word;
}

// Function to add natural pauses to sentences for better comprehension
export function addSentencePauses(sentence: string): string {
  return sentence
    .replace(/\./g, '... ') // Longer pause at period
    .replace(/,/g, ', ... ') // Pause at comma
    .replace(/\s+/g, ' ... '); // Small pause between each word
}

// Function to break down longer words into syllables for pronunciation
export function syllableBreakdown(word: string): string {
  const syllableMap: Record<string, string> = {
    'little': 'lit ... tle',
    'help': 'help',
    'jump': 'jump',
    'come': 'come'
  };
  
  return syllableMap[word.toLowerCase()] || word;
}
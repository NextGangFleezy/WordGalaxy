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

// Function to break down words into syllables for pronunciation
export function syllableBreakdown(word: string): string {
  const syllableMap: Record<string, string> = {
    'little': 'lit ... tle',
    'the': 'the',
    'and': 'and', 
    'run': 'run',
    'play': 'play',
    'big': 'big',
    'can': 'can',
    'go': 'go',
    'up': 'up',
    'down': 'down',
    'jump': 'jump',
    'red': 'red',
    'you': 'you',
    'see': 'see',
    'look': 'look',
    'here': 'here',
    'come': 'come',
    'help': 'help',
    'with': 'with',
    'they': 'they',
    'have': 'have',
    'this': 'this',
    'from': 'from',
    'said': 'said',
    'what': 'what',
    'make': 'make'
  };
  
  return syllableMap[word.toLowerCase()] || word;
}

// Enhanced phonetic breakdown for letter-by-letter pronunciation
export function phoneticBreakdown(word: string): string {
  const phoneticLetters: Record<string, string> = {
    'a': 'ay',
    'b': 'buh',
    'c': 'kuh', 
    'd': 'duh',
    'e': 'eh',
    'f': 'fuh',
    'g': 'guh',
    'h': 'huh',
    'i': 'ih',
    'j': 'juh',
    'k': 'kuh',
    'l': 'luh',
    'm': 'muh',
    'n': 'nuh',
    'o': 'oh',
    'p': 'puh',
    'q': 'kwuh',
    'r': 'ruh',
    's': 'sss',
    't': 'tuh',
    'u': 'uh',
    'v': 'vuh',
    'w': 'wuh',
    'x': 'ksss',
    'y': 'yuh',
    'z': 'zzz'
  };
  
  return word.toLowerCase().split('').map(letter => 
    phoneticLetters[letter] || letter
  ).join(' ... ');
}
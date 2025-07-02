import { useCallback, useEffect, useState } from 'react';
import { getPhoneticPronunciation, addSentencePauses, syllableBreakdown, phoneticBreakdown } from '@/lib/pronunciation';

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Load and select the best voice for children
  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Find the best voice for children (prefer female, clear voices)
      const childFriendlyVoice = availableVoices.find(voice => 
        voice.lang.startsWith('en') && (
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen') ||
          voice.name.toLowerCase().includes('zira')
        )
      ) || availableVoices.find(voice => 
        voice.lang.startsWith('en') && voice.default
      ) || availableVoices.find(voice => 
        voice.lang.startsWith('en')
      );
      
      setPreferredVoice(childFriendlyVoice || null);
    };

    // Update voices when they become available
    updateVoices();
    speechSynthesis.addEventListener('voiceschanged', updateVoices);
    
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', updateVoices);
    };
  }, []);

  const speak = useCallback((text: string, mode: 'normal' | 'slow' | 'repeat' | 'spell' = 'normal') => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      let processedText = text;
      let speechSettings = {
        rate: 0.8,
        pitch: 1.0,
        volume: 0.95
      };

      switch (mode) {
        case 'normal':
          // Slower clear pronunciation for children
          speechSettings.rate = 0.6;
          speechSettings.pitch = 1.0;
          // For single letters, use letter names
          if (text.length === 1 && /^[A-Za-z]$/.test(text)) {
            const letterNames: { [key: string]: string } = {
              'A': 'ay', 'B': 'bee', 'C': 'see', 'D': 'dee', 'E': 'ee',
              'F': 'eff', 'G': 'jee', 'H': 'aitch', 'I': 'eye', 'J': 'jay',
              'K': 'kay', 'L': 'ell', 'M': 'emm', 'N': 'enn', 'O': 'oh',
              'P': 'pee', 'Q': 'cue', 'R': 'arr', 'S': 'ess', 'T': 'tee',
              'U': 'you', 'V': 'vee', 'W': 'double-you', 'X': 'ex', 
              'Y': 'why', 'Z': 'zee'
            };
            const upperLetter = text.toUpperCase();
            processedText = letterNames[upperLetter] || text;
            speechSettings.rate = 0.5; // Even slower for letters
          }
          break;
          
        case 'slow':
          // Much slower with emphasis on each syllable
          speechSettings.rate = 0.4;
          speechSettings.pitch = 0.9;
          if (!text.includes(' ')) {
            // For single words, add syllable breaks
            processedText = syllableBreakdown(text);
          } else {
            // For sentences, add significant pauses
            processedText = text.replace(/\s+/g, ' ... ... ');
          }
          break;
          
        case 'repeat':
          // Normal pronunciation followed by slow repetition
          speechSettings.rate = 0.6;
          speechSettings.pitch = 1.0;
          break;
          
        case 'spell':
          // Spell out each letter clearly with full letter names
          speechSettings.rate = 0.4;
          speechSettings.pitch = 1.1;
          if (!text.includes(' ')) {
            // Convert each letter to its full phonetic name for clarity
            const letterNames: { [key: string]: string } = {
              'A': 'ay', 'B': 'bee', 'C': 'see', 'D': 'dee', 'E': 'ee',
              'F': 'eff', 'G': 'jee', 'H': 'aitch', 'I': 'eye', 'J': 'jay',
              'K': 'kay', 'L': 'ell', 'M': 'emm', 'N': 'enn', 'O': 'oh',
              'P': 'pee', 'Q': 'cue', 'R': 'arr', 'S': 'ess', 'T': 'tee',
              'U': 'you', 'V': 'vee', 'W': 'double-you', 'X': 'ex', 
              'Y': 'why', 'Z': 'zee'
            };
            
            const letters = text.split('').map(letter => {
              const upperLetter = letter.toUpperCase();
              return letterNames[upperLetter] || upperLetter;
            }).join(' ... ');
            processedText = letters;
          }
          break;
      }
      
      const utterance = new SpeechSynthesisUtterance(processedText);
      
      // Use the preferred voice if available
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = speechSettings.rate;
      utterance.pitch = speechSettings.pitch;
      utterance.volume = speechSettings.volume;
      
      speechSynthesis.speak(utterance);
      
      // Special handling for repeat mode
      if (mode === 'repeat') {
        utterance.onend = () => {
          setTimeout(() => {
            // Second pronunciation - much slower with syllables
            const slowText = !text.includes(' ') ? syllableBreakdown(text) : text.replace(/\s+/g, ' ... ');
            const repeatUtterance = new SpeechSynthesisUtterance(slowText);
            if (preferredVoice) repeatUtterance.voice = preferredVoice;
            repeatUtterance.rate = 0.4;
            repeatUtterance.pitch = 0.95;
            repeatUtterance.volume = 0.95;
            speechSynthesis.speak(repeatUtterance);
          }, 1200);
        };
      }
    }
  }, [preferredVoice]);

  const speakSlow = useCallback((text: string) => {
    speak(text, 'slow');
  }, [speak]);

  const speakRepeat = useCallback((text: string) => {
    speak(text, 'repeat');
  }, [speak]);

  const speakSpell = useCallback((text: string) => {
    speak(text, 'spell');
  }, [speak]);

  return { speak, speakSlow, speakRepeat, speakSpell, voices, preferredVoice };
}

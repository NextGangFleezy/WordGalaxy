import { useCallback, useEffect, useState } from 'react';
import { getPhoneticPronunciation, addSentencePauses, syllableBreakdown, phoneticBreakdown } from '@/lib/pronunciation';

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Load and select the most natural-sounding voice
  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Enhanced voice selection for natural, child-friendly voices
      const findBestVoice = () => {
        // Priority 1: High-quality neural/premium voices
        const neuralVoices = availableVoices.filter(voice => 
          voice.lang.startsWith('en') && (
            voice.name.includes('Neural') ||
            voice.name.includes('Premium') ||
            voice.name.includes('Enhanced') ||
            voice.name.includes('HD') ||
            voice.name.includes('Natural')
          )
        );
        
        // Priority 2: Specific high-quality voices known for clarity
        const highQualityVoices = availableVoices.filter(voice => 
          voice.lang.startsWith('en') && (
            voice.name.toLowerCase().includes('samantha') ||
            voice.name.toLowerCase().includes('allison') ||
            voice.name.toLowerCase().includes('ava') ||
            voice.name.toLowerCase().includes('serena') ||
            voice.name.toLowerCase().includes('susan') ||
            voice.name.toLowerCase().includes('victoria') ||
            voice.name.toLowerCase().includes('emma') ||
            voice.name.toLowerCase().includes('jenny') ||
            voice.name.toLowerCase().includes('anna') ||
            voice.name.toLowerCase().includes('daniel') ||
            voice.name.toLowerCase().includes('alex') ||
            voice.name.toLowerCase().includes('karen') ||
            voice.name.toLowerCase().includes('zira')
          )
        );
        
        // Priority 3: Female voices (generally better for children)
        const femaleVoices = availableVoices.filter(voice => 
          voice.lang.startsWith('en') && (
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('woman')
          )
        );
        
        // Priority 4: Default English voices
        const defaultEnglish = availableVoices.filter(voice => 
          voice.lang.startsWith('en') && voice.default
        );
        
        // Priority 5: Any English voice
        const englishVoices = availableVoices.filter(voice => 
          voice.lang.startsWith('en')
        );
        
        // Return the best available voice
        return neuralVoices[0] || 
               highQualityVoices[0] || 
               femaleVoices[0] || 
               defaultEnglish[0] || 
               englishVoices[0] ||
               availableVoices[0];
      };
      
      setPreferredVoice(findBestVoice());
    };

    // Initial load and handle delayed voice loading
    updateVoices();
    speechSynthesis.addEventListener('voiceschanged', updateVoices);
    
    // Some browsers need a delay for voices to load
    setTimeout(updateVoices, 100);
    setTimeout(updateVoices, 500);
    
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
        rate: 0.7,
        pitch: 1.0,
        volume: 1.0
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
      
      // Enhanced voice configuration for better quality
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Optimized settings for natural speech
      utterance.rate = speechSettings.rate;
      utterance.pitch = speechSettings.pitch;
      utterance.volume = speechSettings.volume;
      
      // Add natural pauses and emphasis
      utterance.lang = 'en-US';
      
      // Add event handlers for better speech quality
      utterance.onstart = () => {
        // Ensure speech synthesis has full focus
        console.debug('Speech started with voice:', preferredVoice?.name || 'default');
      };
      
      utterance.onerror = (event) => {
        console.warn('Speech synthesis error:', event.error);
        // Fallback: try again with default voice
        if (preferredVoice && event.error === 'voice-unavailable') {
          const fallbackUtterance = new SpeechSynthesisUtterance(processedText);
          fallbackUtterance.rate = speechSettings.rate;
          fallbackUtterance.pitch = speechSettings.pitch;
          fallbackUtterance.volume = speechSettings.volume;
          fallbackUtterance.lang = 'en-US';
          speechSynthesis.speak(fallbackUtterance);
        }
      };
      
      // Small delay to ensure voice loading
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 50);
      
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
            repeatUtterance.volume = 1.0;
            repeatUtterance.lang = 'en-US';
            speechSynthesis.speak(repeatUtterance);
          }, 1000);
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

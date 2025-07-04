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
      
      // Enhanced voice selection targeting urban American female voices
      const findBestVoice = () => {
        console.log('Available voices:', availableVoices.map(v => `${v.name} (${v.lang})`));
        
        // Priority 1: Urban American female voices with natural accent
        const urbanAmericanFemale = availableVoices.filter(voice => 
          (voice.lang === 'en-US' || voice.lang.startsWith('en-US')) && (
            voice.name.toLowerCase().includes('kathy') ||
            voice.name.toLowerCase().includes('sandy') ||
            voice.name.toLowerCase().includes('flo') ||
            voice.name.toLowerCase().includes('shelley') ||
            voice.name.toLowerCase().includes('zira') ||
            voice.name.toLowerCase().includes('cortana') ||
            voice.name.toLowerCase().includes('aria') ||
            voice.name.toLowerCase().includes('jenny') ||
            voice.name.toLowerCase().includes('michelle') ||
            voice.name.toLowerCase().includes('tracy') ||
            voice.name.toLowerCase().includes('kimberly') ||
            voice.name.toLowerCase().includes('ashley') ||
            voice.name.toLowerCase().includes('amber') ||
            voice.name.toLowerCase().includes('natasha') ||
            voice.name.toLowerCase().includes('monica') ||
            voice.name.toLowerCase().includes('elizabeth')
          )
        );
        
        // Priority 2: High-quality neural US female voices
        const neuralUSFemale = availableVoices.filter(voice => 
          (voice.lang === 'en-US' || voice.lang.startsWith('en-US')) && (
            voice.name.includes('Neural') ||
            voice.name.includes('Premium') ||
            voice.name.includes('Enhanced') ||
            voice.name.includes('HD') ||
            voice.name.includes('Natural') ||
            voice.name.includes('Wavenet')
          ) && (
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('woman') ||
            !voice.name.toLowerCase().includes('male')
          )
        );
        
        // Priority 3: US English female voices with natural characteristics
        const usEnglishFemale = availableVoices.filter(voice => 
          (voice.lang === 'en-US' || voice.lang.startsWith('en-US')) && (
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('woman') ||
            (voice.name.toLowerCase().includes('samantha') && voice.lang.startsWith('en-US')) ||
            (voice.name.toLowerCase().includes('allison') && voice.lang.startsWith('en-US')) ||
            (voice.name.toLowerCase().includes('ava') && voice.lang.startsWith('en-US')) ||
            (voice.name.toLowerCase().includes('susan') && voice.lang.startsWith('en-US'))
          )
        );
        
        // Priority 4: Any US English female-sounding voice
        const anyUSFemale = availableVoices.filter(voice => 
          (voice.lang === 'en-US' || voice.lang.startsWith('en-US')) &&
          !voice.name.toLowerCase().includes('male') &&
          !voice.name.toLowerCase().includes('man') &&
          !voice.name.toLowerCase().includes('david') &&
          !voice.name.toLowerCase().includes('mark') &&
          !voice.name.toLowerCase().includes('alex')
        );
        
        // Priority 5: Fallback to best available US voice
        const usEnglish = availableVoices.filter(voice => 
          voice.lang === 'en-US' || voice.lang.startsWith('en-US')
        );
        
        // Prioritize voices that tend to have more urban/contemporary sound
        const kathyVoice = availableVoices.find(voice => 
          voice.name.toLowerCase().includes('kathy') && voice.lang.startsWith('en-US'));
        const floVoice = availableVoices.find(voice => 
          voice.name.toLowerCase().includes('flo') && voice.lang.startsWith('en-US'));
        const shelleyVoice = availableVoices.find(voice => 
          voice.name.toLowerCase().includes('shelley') && voice.lang.startsWith('en-US'));
        const sandyVoice = availableVoices.find(voice => 
          voice.name.toLowerCase().includes('sandy') && voice.lang.startsWith('en-US'));
        
        const selected = kathyVoice ||
                        floVoice ||
                        shelleyVoice || 
                        sandyVoice ||
                        urbanAmericanFemale[0] || 
                        neuralUSFemale[0] || 
                        usEnglishFemale[0] || 
                        anyUSFemale[0] || 
                        usEnglish[0] ||
                        availableVoices.find(voice => voice.lang.startsWith('en')) ||
                        availableVoices[0];
        
        console.log('Selected voice:', selected?.name, selected?.lang);
        return selected;
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
    console.log('SPEECH DEBUG - Input text:', text, 'Mode:', mode);
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      let processedText = text;
      let speechSettings = {
        rate: 0.85,
        pitch: 0.95,
        volume: 0.9
      };

      switch (mode) {
        case 'normal':
          // Urban American conversational style - slightly faster with natural rhythm
          speechSettings.rate = 1.1;
          speechSettings.pitch = 0.9;
          speechSettings.volume = 0.9;
          // For single letters, use letter names
          if (text.length === 1 && /^[A-Za-z]$/.test(text)) {
            console.log('Processing letter:', text);
            const letterNames: { [key: string]: string } = {
              'A': 'Letter A', 'B': 'Letter B', 'C': 'Letter C', 'D': 'Letter D', 'E': 'Letter E',
              'F': 'Letter F', 'G': 'Letter G', 'H': 'Letter H', 'I': 'Letter I', 'J': 'Letter J',
              'K': 'Letter K', 'L': 'Letter L', 'M': 'Letter M', 'N': 'Letter N', 'O': 'Letter O',
              'P': 'Letter P', 'Q': 'Letter Q', 'R': 'Letter R', 'S': 'Letter S', 'T': 'Letter T',
              'U': 'Letter U', 'V': 'Letter V', 'W': 'Letter W', 'X': 'Letter X', 
              'Y': 'Letter Y', 'Z': 'Letter Z'
            };
            const upperLetter = text.toUpperCase();
            processedText = letterNames[upperLetter] || text;
            console.log('Letter will be spoken as:', processedText);
            speechSettings.rate = 0.95; // Natural pace for urban American speech
          }
          break;
          
        case 'slow':
          // Deliberate urban teaching pace
          speechSettings.rate = 0.7;
          speechSettings.pitch = 0.9;
          speechSettings.volume = 0.9;
          if (!text.includes(' ')) {
            // For single words, add syllable breaks
            processedText = syllableBreakdown(text);
          } else {
            // For sentences, add natural pauses
            processedText = text.replace(/\s+/g, ' ... ');
          }
          break;
          
        case 'repeat':
          // Urban conversational pace for first pronunciation
          speechSettings.rate = 1.0;
          speechSettings.pitch = 0.9;
          speechSettings.volume = 0.9;
          break;
          
        case 'spell':
          // Spell out each letter with urban rhythm
          speechSettings.rate = 0.8;
          speechSettings.pitch = 0.9;
          speechSettings.volume = 0.9;
          if (!text.includes(' ')) {
            // Convert each letter to its full phonetic name for clarity
            const letterNames: { [key: string]: string } = {
              'A': 'Letter A', 'B': 'Letter B', 'C': 'Letter C', 'D': 'Letter D', 'E': 'Letter E',
              'F': 'Letter F', 'G': 'Letter G', 'H': 'Letter H', 'I': 'Letter I', 'J': 'Letter J',
              'K': 'Letter K', 'L': 'Letter L', 'M': 'Letter M', 'N': 'Letter N', 'O': 'Letter O',
              'P': 'Letter P', 'Q': 'Letter Q', 'R': 'Letter R', 'S': 'Letter S', 'T': 'Letter T',
              'U': 'Letter U', 'V': 'Letter V', 'W': 'Letter W', 'X': 'Letter X', 
              'Y': 'Letter Y', 'Z': 'Letter Z'
            };
            
            const letters = text.split('').map(letter => {
              const upperLetter = letter.toUpperCase();
              return letterNames[upperLetter] || upperLetter;
            }).join(', ');
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
            // Second pronunciation - slower with clear articulation
            const slowText = !text.includes(' ') ? syllableBreakdown(text) : text.replace(/\s+/g, ' ... ');
            const repeatUtterance = new SpeechSynthesisUtterance(slowText);
            if (preferredVoice) repeatUtterance.voice = preferredVoice;
            repeatUtterance.rate = 0.75;
            repeatUtterance.pitch = 0.9;
            repeatUtterance.volume = 0.9;
            repeatUtterance.lang = 'en-US';
            speechSynthesis.speak(repeatUtterance);
          }, 800);
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

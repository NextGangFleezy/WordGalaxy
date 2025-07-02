import { useCallback, useEffect, useState } from 'react';
import { getPhoneticPronunciation, addSentencePauses, syllableBreakdown } from '@/lib/pronunciation';

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

  const speak = useCallback((text: string, options?: { slow?: boolean; repeat?: boolean; phonetic?: boolean }) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      // Process text for better pronunciation
      let processedText = text;
      
      if (options?.phonetic) {
        // Use phonetic pronunciation for individual words
        if (!text.includes(' ')) {
          processedText = getPhoneticPronunciation(text);
        }
      }
      
      // Add pauses for sentences to help comprehension
      if (text.includes(' ') && text.length > 10) {
        processedText = addSentencePauses(text);
      }
      
      const utterance = new SpeechSynthesisUtterance(processedText);
      
      // Use the preferred voice if available
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Enhanced settings for child learning
      utterance.rate = options?.slow ? 0.5 : 0.7; // Even slower for better comprehension
      utterance.pitch = 1.0; // Natural pitch for clearer pronunciation
      utterance.volume = 0.95; // Clear volume
      
      // Adjust rate for sentences vs words
      if (text.includes(' ') && text.length > 10) {
        utterance.rate = options?.slow ? 0.4 : 0.6; // Very slow for sentences
      }
      
      speechSynthesis.speak(utterance);
      
      // Optional repeat for better learning
      if (options?.repeat) {
        utterance.onend = () => {
          setTimeout(() => {
            const repeatUtterance = new SpeechSynthesisUtterance(processedText);
            if (preferredVoice) repeatUtterance.voice = preferredVoice;
            repeatUtterance.rate = utterance.rate;
            repeatUtterance.pitch = utterance.pitch;
            repeatUtterance.volume = utterance.volume;
            speechSynthesis.speak(repeatUtterance);
          }, 1000); // Longer pause before repeat
        };
      }
    }
  }, [preferredVoice]);

  const speakSlow = useCallback((text: string) => {
    speak(text, { slow: true, phonetic: true });
  }, [speak]);

  const speakRepeat = useCallback((text: string) => {
    speak(text, { repeat: true, phonetic: true });
  }, [speak]);

  const speakPhonetic = useCallback((text: string) => {
    speak(text, { phonetic: true, slow: true });
  }, [speak]);

  return { speak, speakSlow, speakRepeat, speakPhonetic, voices, preferredVoice };
}

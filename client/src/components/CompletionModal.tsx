import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface CompletionModalProps {
  isOpen: boolean;
  planetName: string;
  onContinue: () => void;
}

export default function CompletionModal({ isOpen, planetName, onContinue }: CompletionModalProps) {
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset animations when modal opens
      setRocketLaunched(false);
      setShowCelebration(false);
      
      // Play rocket sound effect
      const playRocketSound = () => {
        // Create sound using Web Audio API for rocket blast
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Create a more complex rocket sound
        const createRocketSound = () => {
          const oscillator1 = audioContext.createOscillator();
          const oscillator2 = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator1.connect(gainNode);
          oscillator2.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Main rocket rumble (low frequency)
          oscillator1.frequency.setValueAtTime(80, audioContext.currentTime);
          oscillator1.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 1);
          oscillator1.type = 'sawtooth';
          
          // Rocket blast (higher frequency)
          oscillator2.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator2.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
          oscillator2.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 1);
          oscillator2.type = 'square';
          
          // Volume envelope
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
          gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.5);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
          
          oscillator1.start(audioContext.currentTime);
          oscillator2.start(audioContext.currentTime);
          oscillator1.stop(audioContext.currentTime + 1.5);
          oscillator2.stop(audioContext.currentTime + 1.5);
        };
        
        try {
          createRocketSound();
        } catch (error) {
          console.warn('Audio not supported');
        }
      };

      // Start rocket animation and sound
      const timer1 = setTimeout(() => {
        playRocketSound();
        setRocketLaunched(true);
      }, 500);

      // Show celebration after rocket launches
      const timer2 = setTimeout(() => {
        setShowCelebration(true);
      }, 1500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-lg mx-6 bg-gradient-to-br from-purple-900 via-blue-800 to-black border-4 border-yellow-400 text-center overflow-hidden relative">
        <DialogTitle className="sr-only">Planet Completion Celebration</DialogTitle>
        
        {/* Animated Background Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-white rounded-full animate-pulse ${showCelebration ? 'animate-bounce' : ''}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>

        {/* Rocket Animation */}
        <div className="relative z-10 p-8">
          <div className="relative mb-8 h-32">
            <div 
              className={`text-8xl absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                rocketLaunched 
                  ? '-translate-y-40 scale-75 opacity-0' 
                  : 'translate-y-8'
              }`}
            >
              🚀
            </div>
            
            {/* Rocket Exhaust Animation */}
            <div 
              className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                rocketLaunched 
                  ? '-translate-y-32 opacity-0' 
                  : 'translate-y-16 opacity-100'
              }`}
            >
              <div className="text-4xl animate-pulse">🔥</div>
              <div className="text-2xl animate-bounce">💨</div>
            </div>
            
            {/* Explosion Effect */}
            {showCelebration && (
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-8">
                <div className="text-6xl animate-ping">✨</div>
                <div className="text-4xl animate-bounce absolute top-2 left-2">🌟</div>
                <div className="text-4xl animate-bounce absolute top-2 right-2" style={{animationDelay: '0.2s'}}>⭐</div>
              </div>
            )}
          </div>

          {/* Celebration Text */}
          <div className={`transition-all duration-500 ${showCelebration ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="text-6xl mb-6 animate-bounce">🌟🎉🌟</div>
            <h3 className="text-4xl font-bold text-white mb-4 animate-pulse">
              🎊 You conquered {planetName}! 🎊
            </h3>
            <p className="text-xl text-yellow-300 mb-8 animate-fade-in">
              Outstanding work, Space Explorer! Your rocket has blasted off to the next adventure!
            </p>
            
            {/* Floating Achievement Badges */}
            <div className="flex justify-center space-x-4 mb-8">
              <div className="text-3xl animate-bounce" style={{animationDelay: '0s'}}>🏆</div>
              <div className="text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>🎖️</div>
              <div className="text-3xl animate-bounce" style={{animationDelay: '0.4s'}}>🥇</div>
            </div>
            
            <Button 
              onClick={onContinue}
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-black font-bold text-xl px-10 py-4 rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse"
            >
              🚀 Launch to Next Planet! 🚀
            </Button>
          </div>
        </div>

        {/* Particle Effects */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`absolute text-2xl animate-bounce`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
                }}
              >
                {['🎉', '✨', '🌟', '⭐', '💫'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

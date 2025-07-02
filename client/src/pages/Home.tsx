import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import StarField from '@/components/StarField';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="galaxy-bg min-h-screen overflow-hidden">
      <StarField />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-8 max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-float">
            🌌 Word Galaxy
          </h1>
          <p className="text-2xl md:text-3xl text-yellow-300 font-bold mb-8">
            A Space Explorer Reading Game
          </p>
          <Button 
            onClick={() => setLocation('/planets')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-3xl px-16 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-white"
          >
            🚀 Start Game
          </Button>
        </div>
      </div>
    </div>
  );
}

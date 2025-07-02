import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import StarField from '@/components/StarField';
import { planets } from '@/lib/gameData';
import { useGameState } from '@/hooks/useGameState';

export default function PlanetMap() {
  const [, setLocation] = useLocation();
  const { progress } = useGameState();

  return (
    <div className="galaxy-bg min-h-screen overflow-hidden">
      <StarField />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Choose Your Planet!
          </h2>
          <p className="text-xl text-yellow-300">
            Click on a planet to start learning sight words
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mb-12">
          {planets.map((planet) => {
            const stars = progress[planet.id] || 0;
            
            return (
              <div key={planet.id} className="text-center">
                <Button
                  onClick={() => setLocation(`/game/${planet.id}`)}
                  className={`
                    ${planet.className} w-48 h-48 rounded-full shadow-2xl 
                    transform hover:animate-planet-hover transition-all duration-300 mb-4
                    text-4xl hover:scale-110
                  `}
                >
                  {planet.emoji}
                </Button>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {planet.displayName}
                </h3>
                <p className="text-yellow-300">
                  Level {planets.indexOf(planet) + 1}: {planet.words.join(', ')}
                </p>
                <div className={`font-bold mt-2 ${stars === 4 ? 'text-yellow-400' : 'text-green-400'}`}>
                  ⭐ {stars}/4 stars
                </div>
              </div>
            );
          })}
        </div>
        
        <Button 
          onClick={() => setLocation('/')}
          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold text-xl px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          🏠 Home
        </Button>
      </div>
    </div>
  );
}

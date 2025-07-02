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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mb-12">
          {planets.map((planet) => {
            const stars = progress[planet.id] || 0;
            const totalItems = planet.gameType === 'sentences' ? (planet.sentences?.length || 0) : planet.words.length;
            
            return (
              <div key={planet.id} className="text-center">
                <Button
                  onClick={() => setLocation(`/game/${planet.id}`)}
                  className={`
                    ${planet.className} w-40 h-40 rounded-full shadow-2xl 
                    transform hover:animate-planet-hover transition-all duration-300 mb-4
                    text-4xl hover:scale-110
                  `}
                >
                  {planet.emoji}
                </Button>
                <h3 className="text-xl font-bold text-white mb-2">
                  {planet.displayName}
                </h3>
                <p className="text-blue-200 text-sm mb-2">
                  {planet.description}
                </p>
                <p className="text-yellow-300 text-sm mb-2">
                  Level {planets.indexOf(planet) + 1} • {planet.gameType === 'sentences' ? 'Sentences' : 'Words'}
                </p>
                <div className={`font-bold mt-2 ${stars === totalItems ? 'text-yellow-400' : 'text-green-400'}`}>
                  ⭐ {stars}/{totalItems} stars
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

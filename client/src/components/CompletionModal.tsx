import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CompletionModalProps {
  isOpen: boolean;
  planetName: string;
  onContinue: () => void;
}

export default function CompletionModal({ isOpen, planetName, onContinue }: CompletionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md mx-6 bg-gradient-to-br from-purple-600 to-blue-700 border-4 border-yellow-400 text-center">
        <div className="p-8">
          <div className="text-6xl mb-6">🌟🎉🌟</div>
          <h3 className="text-3xl font-bold text-white mb-4">
            🌟 You cleared {planetName}!
          </h3>
          <p className="text-xl text-yellow-300 mb-8">
            Amazing work, Space Explorer!
          </p>
          <Button 
            onClick={onContinue}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            🚀 Continue Exploring
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

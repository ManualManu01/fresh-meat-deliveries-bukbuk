
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, Clock, Sparkles, Zap } from 'lucide-react';

interface WelcomeBannerProps {
  onQuickOrder: () => void;
}

const WelcomeBanner = ({ onQuickOrder }: WelcomeBannerProps) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl mx-4 mt-6 mb-8 overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 animate-pulse"></div>
      
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-500/25">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome back, {user.name}! 
                </span>
                <span className="ml-2 text-2xl">🚀</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Ready for fresh meat delivered at light speed?
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={onQuickOrder}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 shadow-lg shadow-pink-500/25 transition-all duration-300 hover:scale-105 border-0"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Quick Order
              <Zap className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-200 px-6 py-3 transition-all duration-300 hover:scale-105"
            >
              <Clock className="h-5 w-5 mr-2" />
              Order History
              <Sparkles className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;

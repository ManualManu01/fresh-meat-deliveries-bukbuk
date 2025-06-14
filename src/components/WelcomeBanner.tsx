
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, Clock } from 'lucide-react';

interface WelcomeBannerProps {
  onQuickOrder: () => void;
}

const WelcomeBanner = ({ onQuickOrder }: WelcomeBannerProps) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <User className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.name}! 👋
              </h2>
              <p className="text-gray-600">
                Ready for fresh meat delivered to your door?
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onQuickOrder}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Order
            </Button>
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
              <Clock className="h-4 w-4 mr-2" />
              Order History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;

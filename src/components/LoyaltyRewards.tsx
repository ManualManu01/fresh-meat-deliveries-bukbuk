
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Gift, Star, Zap, Trophy, Coins } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const LoyaltyRewards = () => {
  const { user, isLoggedIn } = useAuth();
  const [points, setPoints] = useState(2450);
  const [tier, setTier] = useState('Gold');
  const [nextTierPoints, setNextTierPoints] = useState(550);

  const rewards = [
    {
      id: 1,
      title: 'Free Delivery',
      description: 'Get free delivery on your next order',
      points: 100,
      icon: Zap,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 2,
      title: '10% Off',
      description: '10% discount on any meat selection',
      points: 250,
      icon: Star,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 3,
      title: 'Premium Cut',
      description: 'Free upgrade to premium cut',
      points: 500,
      icon: Crown,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 4,
      title: 'Mystery Box',
      description: 'Surprise selection of premium meats',
      points: 750,
      icon: Gift,
      color: 'from-cyan-400 to-blue-500'
    }
  ];

  const tierBenefits = {
    Bronze: { multiplier: 1, color: 'from-amber-600 to-yellow-600' },
    Silver: { multiplier: 1.2, color: 'from-gray-400 to-gray-600' },
    Gold: { multiplier: 1.5, color: 'from-yellow-400 to-orange-500' },
    Platinum: { multiplier: 2, color: 'from-purple-400 to-pink-500' }
  };

  if (!isLoggedIn) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl mb-8">
        <CardContent className="p-8 text-center">
          <Trophy className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Join Our Loyalty Program</h3>
          <p className="text-gray-300 mb-6">
            Earn points with every purchase and unlock amazing rewards!
          </p>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/25">
            Login to Start Earning
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl mb-8">
      <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6" />
          </div>
          Loyalty Rewards
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Points Summary */}
          <div className="bg-white/5 rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{points} Points</h3>
                <p className="text-gray-300">Available to redeem</p>
              </div>
              <Coins className="w-12 h-12 text-yellow-400" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Current Tier:</span>
                <Badge className={`bg-gradient-to-r ${tierBenefits[tier].color} text-black font-bold`}>
                  {tier}
                </Badge>
              </div>
              <div className="text-sm text-gray-400">
                {nextTierPoints} points to next tier
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(points / (points + nextTierPoints)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tier Benefits */}
          <div className="bg-white/5 rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Tier Benefits</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">
                  {tierBenefits[tier].multiplier}x Points Multiplier
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300">Priority Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-pink-400" />
                <span className="text-gray-300">Exclusive Rewards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Available Rewards */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Available Rewards</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.map((reward) => {
              const IconComponent = reward.icon;
              const canRedeem = points >= reward.points;
              
              return (
                <Card 
                  key={reward.id}
                  className={`bg-white/5 border transition-all duration-300 hover:scale-105 ${
                    canRedeem 
                      ? 'border-purple-500/40 hover:border-purple-400/60 shadow-lg shadow-purple-500/20' 
                      : 'border-gray-600/40 opacity-60'
                  }`}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-gradient-to-r ${reward.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-white mb-2">{reward.title}</h4>
                    <p className="text-sm text-gray-300 mb-3">{reward.description}</p>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <Coins className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-bold">{reward.points}</span>
                    </div>
                    <Button
                      size="sm"
                      disabled={!canRedeem}
                      className={`w-full ${
                        canRedeem
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25'
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {canRedeem ? 'Redeem' : 'Not Enough Points'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyRewards;

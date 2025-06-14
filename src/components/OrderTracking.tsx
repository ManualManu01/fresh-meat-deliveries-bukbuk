
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, CheckCircle, Truck, MapPin, Phone, User, Calendar, AlertCircle } from 'lucide-react';

interface OrderTrackingProps {
  onBack: () => void;
}

const OrderTracking = ({ onBack }: OrderTrackingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(25);
  const [cancelTimeLeft, setCancelTimeLeft] = useState(20 * 60); // 20 minutes in seconds

  // Mock order data
  const orderData = {
    id: '12345',
    items: [
      { name: 'Chicken Curry Cut', quantity: 1, price: 320 },
      { name: 'Mutton Boneless', quantity: 0.5, price: 410 },
    ],
    total: 730,
    address: '123 Main Street, Block A, Sector 15, Noida, Delhi NCR - 201301',
    phone: '+91 9876543210',
    orderTime: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    estimatedDelivery: new Date(Date.now() + 20 * 60 * 1000) // 20 minutes from now
  };

  const trackingSteps = [
    { 
      id: 0, 
      title: 'Order Confirmed', 
      description: 'Your order has been confirmed and payment processed', 
      time: '2 min ago', 
      icon: CheckCircle,
      color: 'from-green-400 to-emerald-500'
    },
    { 
      id: 1, 
      title: 'Preparing', 
      description: 'Fresh meat is being carefully prepared and packaged', 
      time: '5 min ago', 
      icon: Clock,
      color: 'from-yellow-400 to-orange-500'
    },
    { 
      id: 2, 
      title: 'Out for Delivery', 
      description: 'Your order is on the way with our delivery partner', 
      time: 'In progress', 
      icon: Truck,
      color: 'from-blue-400 to-cyan-500'
    },
    { 
      id: 3, 
      title: 'Delivered', 
      description: 'Order delivered successfully', 
      time: 'Pending', 
      icon: CheckCircle,
      color: 'from-purple-400 to-pink-500'
    },
  ];

  useEffect(() => {
    // Simulate order progression
    const progressTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < trackingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
      
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 15000); // Update every 15 seconds for demo

    // Cancel timer countdown
    const cancelTimer = setInterval(() => {
      setCancelTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(cancelTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const canCancelOrder = cancelTimeLeft > 0 && currentStep < 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="outline"
              onClick={onBack}
              className="mr-4 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Track Your Order
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    Order #{orderData.id}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-white text-lg">Order Items</h3>
                      <div className="space-y-3">
                        {orderData.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-purple-500/20">
                            <div>
                              <span className="text-white font-medium">{item.name}</span>
                              <p className="text-gray-400 text-sm">Quantity: {item.quantity} kg</p>
                            </div>
                            <span className="text-yellow-400 font-bold">₹{item.price}</span>
                          </div>
                        ))}
                        <div className="border-t border-purple-500/20 pt-3 flex justify-between items-center">
                          <span className="font-bold text-white text-lg">Total:</span>
                          <span className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">₹{orderData.total}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-white text-lg">Delivery Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-purple-500/20">
                          <MapPin size={20} className="mt-0.5 text-cyan-400 flex-shrink-0" />
                          <div>
                            <p className="text-white font-medium">Delivery Address</p>
                            <p className="text-gray-300 text-sm">{orderData.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-purple-500/20">
                          <Clock size={20} className="text-green-400" />
                          <div>
                            <p className="text-white font-medium">Estimated Delivery</p>
                            <p className="text-gray-300 text-sm">{estimatedTime} minutes remaining</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-purple-500/20">
                          <Phone size={20} className="text-purple-400" />
                          <div>
                            <p className="text-white font-medium">Contact Number</p>
                            <p className="text-gray-300 text-sm">{orderData.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Progress */}
              <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Order Status</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-8">
                    {trackingSteps.map((step, index) => {
                      const IconComponent = step.icon;
                      const isCompleted = index <= currentStep;
                      const isCurrent = index === currentStep;
                      
                      return (
                        <div key={step.id} className="flex items-start gap-4 relative">
                          <div className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                            isCompleted 
                              ? `bg-gradient-to-r ${step.color} border-transparent shadow-lg` 
                              : isCurrent 
                                ? `bg-gradient-to-r ${step.color} border-transparent animate-pulse shadow-lg`
                                : 'bg-gray-700 border-gray-600 text-gray-500'
                          }`}>
                            <IconComponent size={24} className={isCompleted || isCurrent ? 'text-white' : ''} />
                            {index < trackingSteps.length - 1 && (
                              <div className={`absolute top-12 left-1/2 w-0.5 h-8 -translate-x-1/2 transition-all duration-500 ${
                                isCompleted ? 'bg-gradient-to-b from-purple-500 to-pink-500' : 'bg-gray-600'
                              }`} />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className={`font-semibold text-lg transition-all duration-300 ${
                                isCurrent ? 'text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text' : 'text-white'
                              }`}>
                                {step.title}
                              </h3>
                              {isCurrent && (
                                <Badge className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black animate-pulse">
                                  Current
                                </Badge>
                              )}
                              {isCompleted && index !== currentStep && (
                                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black">
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-300 mb-2">{step.description}</p>
                            <p className="text-sm text-gray-400">{step.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Cancel Order */}
              {canCancelOrder && (
                <Card className="bg-gradient-to-br from-red-900/20 to-pink-900/20 backdrop-blur-md border border-red-500/30 shadow-2xl">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <h3 className="font-semibold mb-3 text-white text-lg">Cancel Order</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        You can cancel this order within 20 minutes of placing it.
                      </p>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-red-400 font-mono">
                          {formatTime(cancelTimeLeft)}
                        </div>
                        <p className="text-xs text-gray-400">Time remaining</p>
                      </div>
                      <Button 
                        variant="destructive"
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-105"
                      >
                        Cancel Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Delivery Person Info */}
              {currentStep >= 2 && (
                <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-white text-lg">Delivery Partner</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white text-lg">Rahul Kumar</p>
                        <p className="text-sm text-gray-400">Delivery Partner</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400">Online</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Delivery Partner
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Live Location */}
              {currentStep >= 2 && currentStep < 3 && (
                <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-white text-lg">Live Tracking</h3>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-48 flex items-center justify-center border border-purple-500/20">
                      <div className="text-center text-gray-400">
                        <MapPin size={48} className="mx-auto mb-3 text-cyan-400 animate-bounce" />
                        <p className="font-medium text-white">Live tracking map</p>
                        <p className="text-sm">Your delivery partner is 2.5 km away</p>
                        <div className="mt-3 flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-cyan-400">Tracking in real-time</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;

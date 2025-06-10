
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, CheckCircle, Truck, MapPin } from 'lucide-react';

interface OrderTrackingProps {
  onBack: () => void;
}

const OrderTracking = ({ onBack }: OrderTrackingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(25);

  // Mock order data
  const orderData = {
    id: '12345',
    items: [
      { name: 'Chicken Curry Cut', quantity: 1, price: 320 },
      { name: 'Mutton Boneless', quantity: 0.5, price: 410 },
    ],
    total: 730,
    address: '123 Main Street, Delhi NCR',
    phone: '+91 9876543210'
  };

  const trackingSteps = [
    { id: 0, title: 'Order Confirmed', description: 'Your order has been confirmed', time: '2 min ago', icon: CheckCircle },
    { id: 1, title: 'Preparing', description: 'Fresh meat is being prepared for you', time: '5 min ago', icon: Clock },
    { id: 2, title: 'Out for Delivery', description: 'Your order is on the way', time: 'In progress', icon: Truck },
    { id: 3, title: 'Delivered', description: 'Order delivered successfully', time: 'Pending', icon: CheckCircle },
  ];

  useEffect(() => {
    // Simulate order progression
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < trackingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
      
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="outline"
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Track Your Order</h1>
          </div>

          {/* Order Summary */}
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <CardTitle>Order #{orderData.id}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{item.price}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 font-bold">
                      Total: ₹{orderData.total}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Delivery Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="mt-0.5 text-gray-600" />
                      <span>{orderData.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-600" />
                      <span>Estimated: {estimatedTime} minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {trackingSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isCompleted = index <= currentStep;
                  const isCurrent = index === currentStep;
                  
                  return (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isCurrent 
                            ? 'bg-blue-500 text-white animate-pulse'
                            : 'bg-gray-200 text-gray-500'
                      }`}>
                        <IconComponent size={20} />
                        {index < trackingSteps.length - 1 && (
                          <div className={`absolute top-10 left-1/2 w-0.5 h-6 -translate-x-1/2 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${isCurrent ? 'text-blue-600' : ''}`}>
                            {step.title}
                          </h3>
                          {isCurrent && (
                            <Badge className="bg-blue-100 text-blue-800">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{step.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Person Info (shown when out for delivery) */}
          {currentStep >= 2 && (
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Delivery Partner</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="font-bold text-gray-600">RK</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Rahul Kumar</p>
                    <p className="text-sm text-gray-600">Delivery Partner</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Live Location (mock) */}
          {currentStep >= 2 && currentStep < 3 && (
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Live Location</h3>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin size={48} className="mx-auto mb-2" />
                    <p>Live tracking map would appear here</p>
                    <p className="text-sm">Your delivery partner is 2.5 km away</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;

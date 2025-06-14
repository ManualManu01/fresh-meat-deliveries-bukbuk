
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, CheckCircle, Truck, MapPin, Phone, User, Calendar, AlertCircle, ShoppingBag, Star, Package, ChefHat, Route } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

interface OrderTrackingProps {
  onBack: () => void;
}

const OrderTracking = ({ onBack }: OrderTrackingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(25);
  const [cancelTimeLeft, setCancelTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [progressValue, setProgressValue] = useState(25);
  const { cart, getCartTotal, getCartItemsCount } = useCart();
  const { user } = useAuth();

  // Get order details from localStorage or use cart data
  const getOrderDetails = () => {
    const savedOrder = localStorage.getItem('currentOrder');
    if (savedOrder) {
      return JSON.parse(savedOrder);
    }
    
    const tempOrderData = localStorage.getItem('tempOrderData');
    const orderData = tempOrderData ? JSON.parse(tempOrderData) : {};
    
    return {
      id: Math.random().toString(36).substr(2, 5).toUpperCase(),
      items: cart,
      itemCount: getCartItemsCount(),
      total: getCartTotal(),
      address: orderData.address || user?.address || '123 Main Street, Block A, Sector 15, Noida, Delhi NCR - 201301',
      phone: orderData.phone || user?.phone || '+91 9876543210',
      orderTime: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      estimatedDelivery: new Date(Date.now() + 20 * 60 * 1000), // 20 minutes from now
      deliveryPartner: {
        name: 'Rahul Kumar',
        phone: '+91 9876543210',
        rating: 4.8,
        deliveries: 245,
        vehicleNumber: 'DL 01 AB 1234'
      },
      preparation: {
        chef: 'Master Chef Arjun',
        preparationTime: '12-15 minutes',
        specialInstructions: 'Extra fresh, premium cuts'
      }
    };
  };

  const orderData = getOrderDetails();

  // Generate order summary text
  const getOrderSummary = () => {
    const itemCount = orderData.itemCount;
    if (itemCount === 0) return "No items in order yet";
    
    if (itemCount === 1) {
      const item = orderData.items[0];
      return `You ordered 1 item – ${item.name} x ${item.quantity}`;
    }
    
    const itemsList = orderData.items.map(item => `${item.name} x ${item.quantity}`).join(', ');
    return `You ordered ${itemCount} items – ${itemsList}`;
  };

  const trackingSteps = [
    { 
      id: 0, 
      title: 'Order Confirmed', 
      description: 'Your order has been confirmed and payment processed successfully', 
      time: '3 min ago', 
      icon: CheckCircle,
      color: 'from-green-400 to-emerald-500',
      details: 'Payment verified • Order #' + orderData.id + ' created • Notification sent'
    },
    { 
      id: 1, 
      title: 'Preparing Your Order', 
      description: 'Our expert chef is carefully preparing your fresh meat with premium quality standards', 
      time: '2 min ago', 
      icon: ChefHat,
      color: 'from-yellow-400 to-orange-500',
      details: `Chef: ${orderData.preparation?.chef} • Est. ${orderData.preparation?.preparationTime} • ${orderData.preparation?.specialInstructions}`
    },
    { 
      id: 2, 
      title: 'Out for Delivery', 
      description: 'Your order is packed and on the way with our trusted delivery partner', 
      time: 'In progress', 
      icon: Truck,
      color: 'from-blue-400 to-cyan-500',
      details: `Partner: ${orderData.deliveryPartner?.name} • Vehicle: ${orderData.deliveryPartner?.vehicleNumber} • Distance: 2.5 km`
    },
    { 
      id: 3, 
      title: 'Delivered', 
      description: 'Order delivered successfully and fresh meat ready to cook!', 
      time: 'Pending', 
      icon: CheckCircle,
      color: 'from-purple-400 to-pink-500',
      details: 'Contactless delivery • Photo confirmation • Freshness guaranteed'
    },
  ];

  useEffect(() => {
    // Simulate order progression
    const progressTimer = setInterval(() => {
      setCurrentStep(prev => {
        const newStep = prev < trackingSteps.length - 1 ? prev + 1 : prev;
        // Update progress bar
        setProgressValue((newStep + 1) * 25);
        return newStep;
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
          />
        ))}
        <span className="text-sm text-gray-300 ml-1">{rating}</span>
      </div>
    );
  };

  // If cart is empty and no saved order, show different UI
  if (orderData.itemCount === 0 && !localStorage.getItem('currentOrder')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
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

            <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl">
              <CardContent className="p-12 text-center">
                <ShoppingBag className="w-24 h-24 text-purple-400 mx-auto mb-6 opacity-50" />
                <h2 className="text-2xl font-bold text-white mb-4">No Order to Track</h2>
                <p className="text-gray-300 mb-6">You don't have any items in your cart yet. Add some fresh meat to your cart to start tracking your order!</p>
                <Button
                  onClick={onBack}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                >
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
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

          {/* Order Progress Bar */}
          <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Order Progress</h3>
                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black">
                  {Math.round(progressValue)}% Complete
                </Badge>
              </div>
              <Progress value={progressValue} className="h-3 mb-2" />
              <div className="flex justify-between text-sm text-gray-300">
                <span>Order Confirmed</span>
                <span>Preparing</span>
                <span>Out for Delivery</span>
                <span>Delivered</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                    Order #{orderData.id}
                    <Badge className="bg-white/20 text-white ml-auto">
                      {trackingSteps[currentStep]?.title}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-white text-lg flex items-center gap-2">
                        <ShoppingBag size={20} className="text-purple-400" />
                        Order Items ({orderData.itemCount})
                      </h3>
                      <div className="space-y-3">
                        {orderData.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-purple-500/20">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">{item.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                              <span className="text-white font-medium block">{item.name}</span>
                              <p className="text-gray-400 text-sm">Quantity: {item.quantity} {item.unit}</p>
                              <p className="text-gray-400 text-sm">Price per {item.unit}: ₹{item.price}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Badge className="bg-green-500/20 text-green-400 text-xs">Fresh</Badge>
                                <Badge className="bg-blue-500/20 text-blue-400 text-xs">Premium Cut</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-yellow-400 font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                        <div className="border-t border-purple-500/20 pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Subtotal:</span>
                            <span className="text-white">₹{orderData.total.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Delivery:</span>
                            <span className="text-green-400">Free</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">GST (5%):</span>
                            <span className="text-white">₹{(orderData.total * 0.05).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center border-t border-purple-500/20 pt-2">
                            <span className="font-bold text-white text-xl">Total:</span>
                            <span className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">₹{(orderData.total * 1.05).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <p className="text-purple-300 text-sm font-medium">{getOrderSummary()}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-white text-lg flex items-center gap-2">
                        <Truck size={20} className="text-cyan-400" />
                        Delivery Details
                      </h3>
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
                            <p className="text-xs text-gray-400">Expected: {orderData.estimatedDelivery?.toLocaleTimeString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-purple-500/20">
                          <Phone size={20} className="text-purple-400" />
                          <div>
                            <p className="text-white font-medium">Contact Number</p>
                            <p className="text-gray-300 text-sm">{orderData.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-purple-500/20">
                          <Calendar size={20} className="text-yellow-400" />
                          <div>
                            <p className="text-white font-medium">Order Placed</p>
                            <p className="text-gray-300 text-sm">{orderData.orderTime?.toLocaleString()}</p>
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
                  <CardTitle className="text-white text-xl flex items-center gap-2">
                    <Route size={24} className="text-purple-400" />
                    Order Status Timeline
                  </CardTitle>
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
                                  In Progress
                                </Badge>
                              )}
                              {isCompleted && index !== currentStep && (
                                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black">
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-300 mb-2">{step.description}</p>
                            <p className="text-sm text-purple-300 mb-2">{step.details}</p>
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
                        <p className="font-medium text-white text-lg">{orderData.deliveryPartner?.name}</p>
                        <p className="text-sm text-gray-400">Delivery Partner</p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(orderData.deliveryPartner?.rating || 4.8)}
                          <span className="text-xs text-gray-400">({orderData.deliveryPartner?.deliveries} deliveries)</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400">En Route</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 p-3 bg-white/5 rounded-lg border border-purple-500/20">
                      <p className="text-sm text-gray-300">Vehicle: {orderData.deliveryPartner?.vehicleNumber}</p>
                      <p className="text-sm text-gray-300">Distance: 2.5 km away</p>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105 mb-2"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call {orderData.deliveryPartner?.name}
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                    >
                      Message Partner
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Live Location */}
              {currentStep >= 2 && currentStep < 3 && (
                <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-white text-lg">Live Tracking</h3>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-48 flex items-center justify-center border border-purple-500/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10"></div>
                      <div className="text-center text-gray-400 relative z-10">
                        <MapPin size={48} className="mx-auto mb-3 text-cyan-400 animate-bounce" />
                        <p className="font-medium text-white">Live tracking map</p>
                        <p className="text-sm">Your delivery partner is 2.5 km away</p>
                        <div className="mt-3 flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-cyan-400">Tracking in real-time</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-white/5 p-2 rounded text-center">
                        <p className="text-gray-400">ETA</p>
                        <p className="text-white font-bold">{estimatedTime} min</p>
                      </div>
                      <div className="bg-white/5 p-2 rounded text-center">
                        <p className="text-gray-400">Speed</p>
                        <p className="text-white font-bold">25 km/h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Completed */}
              {currentStep >= 3 && (
                <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/30 shadow-2xl">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-3 text-white text-lg">Order Delivered!</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Thank you for choosing BukBuk! Your fresh meat has been delivered successfully.
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105 mb-2"
                    >
                      Rate Your Experience
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                    >
                      Reorder Same Items
                    </Button>
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

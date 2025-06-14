
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Package, MapPin, Phone, Star, CheckCircle, Truck, ChefHat, AlertCircle } from 'lucide-react';
import { useUserOrders, Order } from '@/hooks/useUserOrders';
import { SoundEffects } from '@/utils/soundEffects';

interface OrderHistoryProps {
  onViewOrder?: (order: Order) => void;
}

const OrderHistory = ({ onViewOrder }: OrderHistoryProps) => {
  const { orders, currentOrder } = useUserOrders();

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'preparing':
        return <ChefHat className="w-4 h-4 text-yellow-500" />;
      case 'out_for_delivery':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400';
      case 'preparing':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'out_for_delivery':
        return 'bg-blue-500/20 text-blue-400';
      case 'delivered':
        return 'bg-green-600/20 text-green-300';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatStatus = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const allOrders = currentOrder ? [currentOrder, ...orders.filter(o => o.id !== currentOrder.id)] : orders;

  if (allOrders.length === 0) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl">
        <CardContent className="p-12 text-center">
          <Package className="w-24 h-24 text-purple-400 mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl font-bold text-white mb-4">No Orders Yet</h2>
          <p className="text-gray-300 mb-6">You haven't placed any orders yet. Start shopping to see your order history here!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-8 h-8 text-purple-400" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Order History
        </h2>
        <Badge className="bg-purple-500/20 text-purple-300">
          {allOrders.length} {allOrders.length === 1 ? 'Order' : 'Orders'}
        </Badge>
      </div>

      <div className="grid gap-6">
        {allOrders.map((order) => (
          <Card key={order.id} className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="text-lg">Order #{order.orderId}</p>
                    <p className="text-sm text-gray-200">{order.orderTime.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(order.status)} mb-2`}>
                    {formatStatus(order.status)}
                  </Badge>
                  {order.id === currentOrder?.id && (
                    <Badge className="bg-white/20 text-white block">
                      Current Order
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-white text-lg flex items-center gap-2">
                    <Package size={20} className="text-purple-400" />
                    Items ({order.items.reduce((sum, item) => sum + item.quantity, 0)})
                  </h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm bg-white/5 p-2 rounded">
                        <span className="text-gray-300">{item.name} x {item.quantity}</span>
                        <span className="text-yellow-400">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-purple-500/20 pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        ₹{(order.total * 1.05).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-white text-lg flex items-center gap-2">
                    <MapPin size={20} className="text-cyan-400" />
                    Delivery Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="mt-0.5 text-cyan-400 flex-shrink-0" />
                      <p className="text-gray-300">{order.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-purple-400" />
                      <p className="text-gray-300">{order.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-green-400" />
                      <p className="text-gray-300">
                        Ordered: {order.orderTime.toLocaleString()}
                      </p>
                    </div>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <div className="flex items-center gap-2">
                        <Truck size={16} className="text-yellow-400" />
                        <p className="text-gray-300">
                          ETA: {order.estimatedDelivery.toLocaleTimeString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                {onViewOrder && (
                  <Button
                    onClick={() => {
                      SoundEffects.playClickSound();
                      onViewOrder(order);
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                  >
                    View Details
                  </Button>
                )}
                
                {order.status === 'delivered' && (
                  <Button
                    variant="outline"
                    onClick={() => SoundEffects.playSuccessSound()}
                    className="border-green-500/50 text-green-300 hover:bg-green-500/10 flex items-center gap-2"
                  >
                    <Star size={16} />
                    Rate Order
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => SoundEffects.playClickSound()}
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                >
                  Reorder
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useUserOrders } from '@/hooks/useUserOrders';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

interface OrderConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    items: any[];
    total: number;
    address: string;
    phone: string;
    orderTime: Date;
  } | null;
}

const OrderConfirmationModal = ({ open, onClose, orderData }: OrderConfirmationModalProps) => {
  const { clearCart } = useCart();
  const { user } = useAuth();
  const { updateOrderStatus } = useUserOrders();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [canCancel, setCanCancel] = useState(true);

  useEffect(() => {
    if (open && orderData) {
      setTimeLeft(20 * 60);
      setCanCancel(true);
      
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setCanCancel(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [open, orderData]);

  if (!orderData) return null;

  const orderedItems = orderData.items.filter(item => item.quantity > 0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCancelOrder = () => {
    if (orderData) {
      updateOrderStatus(orderData.orderId, 'cancelled');
      toast({
        title: "Order Cancelled",
        description: `Order #${orderData.orderId} has been cancelled successfully.`,
        className: "border-yellow-500 bg-yellow-50 text-yellow-800",
      });
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-green-600 flex items-center justify-center gap-2">
            <CheckCircle className="h-8 w-8 animate-pulse" />
            Order Confirmed!
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Your order has been placed successfully and will be delivered soon
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg mb-4 border border-green-200">
              <p className="text-lg font-semibold text-green-800">
                Order ID: #{orderData.orderId}
              </p>
              <p className="text-green-600">
                Estimated delivery: 30 minutes
              </p>
              <p className="text-sm text-green-600 mt-1">
                Placed at: {orderData.orderTime.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Order Details:</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 border">
              {orderedItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">₹{orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p><strong>Delivery Address:</strong> {orderData.address}</p>
            <p><strong>Phone:</strong> {orderData.phone}</p>
            {user && <p><strong>Customer:</strong> {user.name}</p>}
          </div>

          {canCancel ? (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">
                  Cancel within: <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </span>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                Orders can be cancelled within 20 minutes of placing. No exchanges or returns allowed after cancellation period expires.
              </p>
              <Button
                variant="outline"
                onClick={handleCancelOrder}
                className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all hover-scale"
                soundEffect="click"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel Order
              </Button>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-600 text-center font-medium">
                ⏰ Cancellation period has expired - No exchanges or returns allowed
              </p>
            </div>
          )}

          <Button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all hover-scale"
            soundEffect="success"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmationModal;

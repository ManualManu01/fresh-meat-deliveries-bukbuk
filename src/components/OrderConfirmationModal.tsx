
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
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
  } | null;
}

const OrderConfirmationModal = ({ open, onClose, orderData }: OrderConfirmationModalProps) => {
  const { clearCart } = useCart();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [canCancel, setCanCancel] = useState(true);

  useEffect(() => {
    if (open && orderData) {
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

  // Filter items to only show those with quantity > 0
  const orderedItems = orderData.items.filter(item => item.quantity > 0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCancelOrder = () => {
    clearCart();
    onClose();
    // Here you would typically call an API to cancel the order
  };

  const handleClose = () => {
    clearCart();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-green-600 flex items-center justify-center gap-2">
            <CheckCircle className="h-8 w-8" />
            Order Confirmed!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold text-green-800">
                Order ID: #{orderData.orderId}
              </p>
              <p className="text-green-600">
                Estimated delivery: 30 minutes
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Order Details:</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              {orderedItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">₹{orderData.total}</span>
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
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">
                  Cancel within: {formatTime(timeLeft)}
                </span>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                Orders can be cancelled within 20 minutes of placing. No exchanges or returns allowed after cancellation period expires.
              </p>
              <Button
                variant="outline"
                onClick={handleCancelOrder}
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel Order
              </Button>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-center">
                Cancellation period has expired - No exchanges or returns allowed
              </p>
            </div>
          )}

          <Button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmationModal;

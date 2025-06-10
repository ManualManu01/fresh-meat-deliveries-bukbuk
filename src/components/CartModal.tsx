
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

interface CartItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  total: number;
}

const CartModal = ({ open, onClose, cart, onRemoveItem, onUpdateQuantity, total }: CartModalProps) => {
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();

  const handleQuantityChange = (id: number, change: number) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change);
      if (newQuantity === 0) {
        onRemoveItem(id);
      } else {
        onUpdateQuantity(id, newQuantity);
      }
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600 flex items-center justify-between">
              Shopping Cart
              <Badge variant="secondary">{cart.length} items</Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Your cart is empty</p>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="mt-4"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        ₹{item.price} per {item.unit}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus size={12} />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus size={12} />
                      </Button>
                      <div className="ml-4 flex items-center space-x-2">
                        <span className="font-bold">₹{item.price * item.quantity}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total: ₹{total}</span>
                    {total >= 500 && (
                      <Badge className="bg-green-100 text-green-800">
                        Free Delivery
                      </Badge>
                    )}
                  </div>
                  {total < 500 && (
                    <p className="text-sm text-gray-600 mb-4">
                      Add ₹{500 - total} more for free delivery
                    </p>
                  )}
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <PaymentModal
        open={showPayment}
        onClose={() => setShowPayment(false)}
        cart={cart}
        total={total}
        onSuccess={() => {
          setShowPayment(false);
          onClose();
        }}
      />
    </>
  );
};

export default CartModal;

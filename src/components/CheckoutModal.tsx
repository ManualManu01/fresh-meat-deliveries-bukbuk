
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useUserOrders } from '@/hooks/useUserOrders';
import { validateAddress, validatePhoneNumber, formatPhoneNumber } from '@/utils/validationUtils';
import { MapPin, Phone, CreditCard, Smartphone, Banknote } from 'lucide-react';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onOrderComplete: (orderData: any) => void;
}

const CheckoutModal = ({ open, onClose, onOrderComplete }: CheckoutModalProps) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useUserOrders();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    address: user?.address || '',
    phone: user?.phone || '',
    paymentMethod: 'cod',
  });
  
  const [errors, setErrors] = useState({
    address: '',
    phone: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
      
      // Clear error when user starts typing
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error when user starts typing
      if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const addressValidation = validateAddress(formData.address);
    const phoneValidation = validatePhoneNumber(formData.phone);
    
    setErrors({
      address: addressValidation.isValid ? '' : addressValidation.message,
      phone: phoneValidation.isValid ? '' : phoneValidation.message,
    });
    
    return addressValidation.isValid && phoneValidation.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Make sure all required fields are filled correctly.",
        variant: "destructive",
      });
      return;
    }
    
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Filter items with quantity > 0
      const orderedItems = cart.filter(item => item.quantity > 0);
      
      if (orderedItems.length === 0) {
        toast({
          title: "No items to order",
          description: "Please add items to your cart.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      const orderId = 'BK' + Date.now().toString().slice(-6);
      const orderTime = new Date();
      const estimatedDelivery = new Date(orderTime.getTime() + 30 * 60 * 1000); // 30 minutes from now
      
      // Convert cart items to order items format
      const orderItems = orderedItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        unit: item.unit || 'kg',
        quantity: item.quantity
      }));
      
      const orderData = {
        orderId,
        items: orderItems,
        total: getCartTotal(),
        address: formData.address,
        phone: formData.phone,
        orderTime,
        estimatedDelivery,
        status: 'confirmed' as const,
        deliveryPartner: {
          name: 'Rajesh Kumar',
          phone: '+91 98765 43210',
          rating: 4.8,
          deliveries: 1250,
          vehicleNumber: 'KA 01 AB 1234'
        }
      };
      
      // Simulate order processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add order to user orders
      addOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      onOrderComplete(orderData);
      onClose();
      
      toast({
        title: "Order placed successfully!",
        description: `Order #${orderData.orderId} will be delivered in 30 minutes.`,
      });
      
    } catch (error) {
      console.error('Order processing error:', error);
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = getCartTotal();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-red-600">
            Complete Your Order
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Delivery Address *
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete delivery address"
                className={errors.address ? 'border-red-500' : ''}
                required
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="XXX-XXX-XXXX"
                className={errors.phone ? 'border-red-500' : ''}
                maxLength={12}
                required
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
              <p className="text-xs text-gray-500">Format: XXX-XXX-XXXX</p>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Payment Method</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                    <Banknote className="h-4 w-4" />
                    Cash on Delivery
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="h-4 w-4" />
                    UPI Payment
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Order Summary</h3>
            {cart.filter(item => item.quantity > 0).map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-green-600">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50"
            soundEffect="success"
          >
            {isSubmitting ? 'Processing...' : `Place Order - ₹${total.toFixed(2)}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;

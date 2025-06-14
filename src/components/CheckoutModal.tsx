
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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

  // Update form data when user changes
  useState(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        address: user.address || prev.address,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
      
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
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
      const estimatedDelivery = new Date(orderTime.getTime() + 30 * 60 * 1000);
      
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
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addOrder(orderData);
      clearCart();
      
      onOrderComplete(orderData);
      onClose();
      
      toast({
        title: "🎉 Order placed successfully!",
        description: `Order #${orderData.orderId} will be delivered in 30 minutes.`,
        className: "border-green-500 bg-green-50 text-green-800",
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
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-red-600">
            Complete Your Order
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Please fill in your delivery details to complete the order
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2 font-medium">
                <MapPin className="h-4 w-4" />
                Delivery Address *
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete delivery address"
                className={`transition-all hover-scale ${errors.address ? 'border-red-500 focus:border-red-500' : 'focus:border-red-500'}`}
                required
              />
              {errors.address && (
                <p className="text-sm text-red-500 animate-fade-in">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 font-medium">
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
                className={`transition-all hover-scale ${errors.phone ? 'border-red-500 focus:border-red-500' : 'focus:border-red-500'}`}
                maxLength={12}
                required
              />
              {errors.phone && (
                <p className="text-sm text-red-500 animate-fade-in">{errors.phone}</p>
              )}
              <p className="text-xs text-gray-500">Format: XXX-XXX-XXXX</p>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Payment Method</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 hover-scale transition-all">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                    <Banknote className="h-4 w-4" />
                    Cash on Delivery
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 hover-scale transition-all">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="h-4 w-4" />
                    UPI Payment
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 hover-scale transition-all">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg space-y-2 border">
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
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 transition-all hover-scale"
            soundEffect="success"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              `Place Order - ₹${total.toFixed(2)}`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;

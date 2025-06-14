
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, RotateCcw, ShoppingCart, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const QuickReorder = () => {
  const { user, isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Mock previous orders data
  const previousOrders = [
    {
      id: 1,
      date: '2024-06-10',
      items: [
        { id: 1, name: 'Chicken Curry Cut', price: 320, quantity: 1 },
        { id: 2, name: 'Mutton Boneless', price: 820, quantity: 0.5 }
      ],
      total: 730,
      status: 'delivered'
    },
    {
      id: 2,
      date: '2024-06-08',
      items: [
        { id: 3, name: 'Chicken Breast', price: 420, quantity: 1 },
        { id: 9, name: 'Seekh Kabab', price: 380, quantity: 0.5 }
      ],
      total: 610,
      status: 'delivered'
    },
    {
      id: 3,
      date: '2024-06-05',
      items: [
        { id: 10, name: 'Chicken Tikka', price: 450, quantity: 1 }
      ],
      total: 450,
      status: 'delivered'
    }
  ];

  const handleReorderAll = (order: any) => {
    order.items.forEach((item: any) => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart(item);
      }
    });
    toast({
      title: "Order Added to Cart! 🛒",
      description: `All items from order #${order.id} have been added to your cart`,
    });
  };

  const handleAddSingleItem = (item: any) => {
    addToCart(item);
    toast({
      title: "Item Added! 🍖",
      description: `${item.name} has been added to your cart`,
    });
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl mb-8">
      <CardHeader className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <RotateCcw className="w-6 h-6" />
          </div>
          Quick Reorder
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {previousOrders.map((order, index) => (
            <Card 
              key={order.id} 
              className="bg-white/5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">Order #{order.id}</h3>
                      <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black">
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock size={14} />
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      ₹{order.total}
                    </div>
                    <div className="text-sm text-gray-400">{order.items.length} items</div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-6">
                  {order.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-200"
                    >
                      <div className="flex-1">
                        <span className="text-white font-medium">{item.name}</span>
                        <div className="text-sm text-gray-400">
                          {item.quantity} kg × ₹{item.price}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-yellow-400 font-bold">
                          ₹{item.price * item.quantity}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleAddSingleItem(item)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 border-0"
                        >
                          <Plus size={14} className="mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reorder Button */}
                <Button
                  onClick={() => handleReorderAll(order)}
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 border-0"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Reorder All Items
                  <RotateCcw className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}

          {previousOrders.length === 0 && (
            <div className="text-center py-8">
              <RotateCcw className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Previous Orders</h3>
              <p className="text-gray-400">Your order history will appear here once you make your first purchase.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickReorder;

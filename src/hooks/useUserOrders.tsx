
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderId: string;
  items: OrderItem[];
  total: number;
  address: string;
  phone: string;
  orderTime: Date;
  estimatedDelivery: Date;
  status: 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryPartner?: {
    name: string;
    phone: string;
    rating: number;
    deliveries: number;
    vehicleNumber: string;
  };
}

interface UserOrdersContextType {
  orders: Order[];
  currentOrder: Order | null;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getCurrentOrder: () => Order | null;
  getOrderHistory: () => Order[];
  clearCurrentOrder: () => void;
}

const UserOrdersContext = createContext<UserOrdersContextType | undefined>(undefined);

export const UserOrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const { user } = useAuth();

  // Load orders from localStorage on mount and when user changes
  useEffect(() => {
    const userKey = user?.email || 'guest';
    const savedOrders = localStorage.getItem(`userOrders_${userKey}`);
    const savedCurrentOrder = localStorage.getItem(`currentOrder_${userKey}`);
    
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          orderTime: new Date(order.orderTime),
          estimatedDelivery: new Date(order.estimatedDelivery)
        }));
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Error parsing saved orders:', error);
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
    
    if (savedCurrentOrder) {
      try {
        const parsedCurrentOrder = JSON.parse(savedCurrentOrder);
        parsedCurrentOrder.orderTime = new Date(parsedCurrentOrder.orderTime);
        parsedCurrentOrder.estimatedDelivery = new Date(parsedCurrentOrder.estimatedDelivery);
        setCurrentOrder(parsedCurrentOrder);
      } catch (error) {
        console.error('Error parsing current order:', error);
        setCurrentOrder(null);
      }
    } else {
      setCurrentOrder(null);
    }
  }, [user]);

  // Save to localStorage whenever orders change
  useEffect(() => {
    const userKey = user?.email || 'guest';
    if (orders.length >= 0) {
      localStorage.setItem(`userOrders_${userKey}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  useEffect(() => {
    const userKey = user?.email || 'guest';
    if (currentOrder) {
      localStorage.setItem(`currentOrder_${userKey}`, JSON.stringify(currentOrder));
    } else {
      localStorage.removeItem(`currentOrder_${userKey}`);
    }
  }, [currentOrder, user]);

  const addOrder = (orderData: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    
    console.log('Order added:', newOrder);
    
    // Send email notification (placeholder for actual implementation)
    console.log('Email notification would be sent to ajdhh334@gmail.com for order:', newOrder.orderId);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.orderId === orderId ? { ...order, status } : order
      )
    );
    
    if (currentOrder && currentOrder.orderId === orderId) {
      const updatedOrder = { ...currentOrder, status };
      setCurrentOrder(updatedOrder);
    }
    
    console.log(`Order ${orderId} status updated to:`, status);
  };

  const getCurrentOrder = () => {
    return currentOrder;
  };

  const getOrderHistory = () => {
    return orders.filter(order => order.status === 'delivered' || order.status === 'cancelled');
  };

  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <UserOrdersContext.Provider value={{
      orders,
      currentOrder,
      addOrder,
      updateOrderStatus,
      getCurrentOrder,
      getOrderHistory,
      clearCurrentOrder
    }}>
      {children}
    </UserOrdersContext.Provider>
  );
};

export const useUserOrders = () => {
  const context = useContext(UserOrdersContext);
  if (context === undefined) {
    throw new Error('useUserOrders must be used within a UserOrdersProvider');
  }
  return context;
};

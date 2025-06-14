
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

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('userOrders');
    const savedCurrentOrder = localStorage.getItem('currentOrder');
    
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        orderTime: new Date(order.orderTime),
        estimatedDelivery: new Date(order.estimatedDelivery)
      }));
      setOrders(parsedOrders);
    }
    
    if (savedCurrentOrder) {
      const parsedCurrentOrder = JSON.parse(savedCurrentOrder);
      parsedCurrentOrder.orderTime = new Date(parsedCurrentOrder.orderTime);
      parsedCurrentOrder.estimatedDelivery = new Date(parsedCurrentOrder.estimatedDelivery);
      setCurrentOrder(parsedCurrentOrder);
    }
  }, []);

  // Save to localStorage whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('userOrders', JSON.stringify(orders));
    }
  }, [orders]);

  useEffect(() => {
    if (currentOrder) {
      localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
    }
  }, [currentOrder]);

  const addOrder = (orderData: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    
    console.log('Order added:', newOrder);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.orderId === orderId ? { ...order, status } : order
      )
    );
    
    if (currentOrder && currentOrder.orderId === orderId) {
      setCurrentOrder(prev => prev ? { ...prev, status } : null);
      localStorage.setItem('currentOrder', JSON.stringify({ ...currentOrder, status }));
    }
  };

  const getCurrentOrder = () => {
    return currentOrder;
  };

  const getOrderHistory = () => {
    return orders.filter(order => order.id !== currentOrder?.id);
  };

  const clearCurrentOrder = () => {
    setCurrentOrder(null);
    localStorage.removeItem('currentOrder');
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

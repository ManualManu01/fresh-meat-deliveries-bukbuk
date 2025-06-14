
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface OrderData {
  phone?: string;
  address?: string;
  items: any[];
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 I'm your AI assistant. I can help you place orders quickly! What would you like to order today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [orderData, setOrderData] = useState<OrderData>({ items: [] });
  const [currentStep, setCurrentStep] = useState('greeting'); // greeting, phone, address, confirmation
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, isLoggedIn } = useAuth();
  const { cart, addToCart } = useCart();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isBot: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, false);
    const userInput = inputValue.toLowerCase();
    setInputValue('');

    setTimeout(() => {
      if (currentStep === 'greeting') {
        addMessage("Great choice! 🍖 To process your order, I'll need a few details. First, could you please provide your phone number?", true);
        setCurrentStep('phone');
      } else if (currentStep === 'phone') {
        if (validatePhone(inputValue)) {
          setOrderData(prev => ({ ...prev, phone: inputValue }));
          addMessage("Perfect! ✅ Now, please provide your delivery address:", true);
          setCurrentStep('address');
        } else {
          addMessage("Please provide a valid phone number (at least 10 digits). For example: +91 9876543210", true);
        }
      } else if (currentStep === 'address') {
        if (inputValue.trim().length > 10) {
          setOrderData(prev => ({ ...prev, address: inputValue }));
          addMessage(`Excellent! 🚀 Here's your order summary:
          
📱 Phone: ${orderData.phone}
📍 Address: ${inputValue}
🛒 Items: Ready to add your selected items

Would you like me to help you add items to your cart? Just say "yes" and I'll guide you to our menu!`, true);
          setCurrentStep('confirmation');
        } else {
          addMessage("Please provide a complete delivery address with landmark details for accurate delivery.", true);
        }
      } else if (currentStep === 'confirmation') {
        if (userInput.includes('yes') || userInput.includes('menu') || userInput.includes('order')) {
          addMessage("🎉 Perfect! I'm redirecting you to our menu. You can add items to your cart and checkout with the details you provided!", true);
          
          // Store user details in localStorage for checkout
          localStorage.setItem('tempOrderData', JSON.stringify({
            phone: orderData.phone,
            address: orderData.address
          }));
          
          toast({
            title: "Details Saved! 🎯",
            description: "Your phone and address are saved for quick checkout!",
          });
        } else {
          addMessage("No problem! Feel free to ask me anything else or say 'menu' when you're ready to order! 😊", true);
        }
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white rounded-full w-16 h-16 shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-110 animate-pulse border-0"
        >
          <div className="relative">
            <MessageCircle size={24} />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin" />
          </div>
        </Button>
      )}

      {isOpen && (
        <Card className="w-96 h-[500px] bg-black/20 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/25 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">AI Assistant</h3>
                <p className="text-xs text-gray-200">Online • Ready to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Messages */}
          <CardContent className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-900/50 to-black/50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white'
                        : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white ml-auto'
                    } backdrop-blur-sm shadow-lg`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs text-gray-300 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Input */}
          <div className="p-4 bg-black/30 backdrop-blur-sm border-t border-purple-500/20">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/25 rounded-xl"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 border-0"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIAssistant;

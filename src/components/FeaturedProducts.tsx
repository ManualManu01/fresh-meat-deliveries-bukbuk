
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Zap, Flame } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  const featuredItems = [
    {
      id: 1,
      name: 'Premium Chicken Breast',
      price: 420,
      unit: 'kg',
      originalPrice: 480,
      description: 'Fresh, boneless chicken breast - perfect for protein lovers',
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1588347818131-c6c3d7b6b4aa?w=400&h=300&fit=crop',
      badge: 'BESTSELLER',
      discount: '15% OFF'
    },
    {
      id: 2,
      name: 'Mutton Curry Cut',
      price: 680,
      unit: 'kg',
      originalPrice: 750,
      description: 'Fresh mutton pieces with bone - ideal for curries',
      rating: 4.6,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
      badge: 'POPULAR',
      discount: '10% OFF'
    },
    {
      id: 3,
      name: 'Chicken Tikka (Marinated)',
      price: 450,
      unit: 'kg',
      originalPrice: 500,
      description: 'Pre-marinated chicken tikka - ready to cook',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
      badge: 'HOT',
      discount: '12% OFF'
    }
  ];

  const handleAddToCart = (item: any) => {
    if (!isLoggedIn) {
      toast({
        title: "Please login first! 🔐",
        description: "You need to login to add items to cart",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(item);
    toast({
      title: "Added to cart! 🛒",
      description: `${item.name} has been added to your cart`,
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
          />
        ))}
        <span className="text-sm text-gray-300 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Featured Products
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Handpicked premium meat selections with unbeatable freshness and quality
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group bg-white/5 backdrop-blur-md border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 overflow-hidden shadow-2xl hover:shadow-purple-500/20 relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge 
                  className={`${
                    item.badge === 'BESTSELLER' 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                      : item.badge === 'POPULAR'
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : 'bg-gradient-to-r from-red-400 to-pink-500'
                  } text-black font-bold px-3 py-1 shadow-lg`}
                >
                  {item.badge === 'HOT' && <Flame className="w-3 h-3 mr-1" />}
                  {item.badge === 'BESTSELLER' && <Star className="w-3 h-3 mr-1" />}
                  {item.badge === 'POPULAR' && <Zap className="w-3 h-3 mr-1" />}
                  {item.badge}
                </Badge>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-2 py-1 text-xs animate-pulse">
                  {item.discount}
                </Badge>
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500"></div>
              </div>

              <CardContent className="p-6 relative">
                {/* Product Info */}
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {item.name}
                </h3>
                
                <p className="text-gray-300 mb-3 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  {renderStars(item.rating)}
                  <span className="text-xs text-gray-400">({item.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      ₹{item.price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{item.originalPrice}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">/{item.unit}</span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold py-3 shadow-lg shadow-pink-500/25 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/40 border-0 group"
                >
                  <ShoppingCart className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Add to Cart
                  <Zap className="ml-2 h-4 w-4 group-hover:animate-pulse" />
                </Button>
              </CardContent>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

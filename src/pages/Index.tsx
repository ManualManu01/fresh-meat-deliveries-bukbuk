import { useState, useEffect } from 'react';
import { Utensils, Clock, Star, Truck, Phone, Mail, MapPin, Search, Filter, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import LoginModal from '@/components/LoginModal';
import CartModal from '@/components/CartModal';
import ProfilePage from '@/components/ProfilePage';
import OrderTracking from '@/components/OrderTracking';
import WelcomeBanner from '@/components/WelcomeBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import AIAssistant from '@/components/AIAssistant';
import ProductSearch from '@/components/ProductSearch';
import LoyaltyRewards from '@/components/LoyaltyRewards';
import QuickReorder from '@/components/QuickReorder';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import InstallPrompt from '@/components/InstallPrompt';
import InstallButton from '@/components/InstallButton';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('chicken');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: '',
    selectedCategory: 'all',
    priceRange: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const { toast } = useToast();
  const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  const menuItems = {
    chicken: [
      { 
        id: 1, 
        name: 'Whole Chicken', 
        price: 280, 
        unit: 'kg', 
        description: 'Fresh whole chicken, perfect for family meals', 
        rating: 4.5, 
        reviews: 120,
        image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&h=300&fit=crop'
      },
      { 
        id: 2, 
        name: 'Chicken Curry Cut', 
        price: 320, 
        unit: 'kg', 
        description: 'Pre-cut chicken pieces for easy cooking', 
        rating: 4.7, 
        reviews: 95,
        image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop'
      },
      { 
        id: 3, 
        name: 'Chicken Breast', 
        price: 420, 
        unit: 'kg', 
        description: 'Boneless chicken breast, high protein', 
        rating: 4.8, 
        reviews: 87,
        image: 'https://images.unsplash.com/photo-1588347818131-c6c3d7b6b4aa?w=400&h=300&fit=crop'
      },
      { 
        id: 4, 
        name: 'Chicken Wings', 
        price: 380, 
        unit: 'kg', 
        description: 'Fresh chicken wings for BBQ and grilling', 
        rating: 4.6, 
        reviews: 65,
        image: 'https://images.unsplash.com/photo-1527477396-1741a5b93ca3?w=400&h=300&fit=crop'
      },
    ],
    mutton: [
      { 
        id: 5, 
        name: 'Mutton Curry Cut', 
        price: 680, 
        unit: 'kg', 
        description: 'Fresh mutton pieces with bone', 
        rating: 4.4, 
        reviews: 78,
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop'
      },
      { 
        id: 6, 
        name: 'Mutton Boneless', 
        price: 820, 
        unit: 'kg', 
        description: 'Premium boneless mutton pieces', 
        rating: 4.6, 
        reviews: 92,
        image: 'https://images.unsplash.com/photo-1588347818131-c6c3d7b6b4aa?w=400&h=300&fit=crop'
      },
      { 
        id: 7, 
        name: 'Mutton Keema', 
        price: 720, 
        unit: 'kg', 
        description: 'Fresh minced mutton', 
        rating: 4.5, 
        reviews: 56,
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop'
      },
      { 
        id: 8, 
        name: 'Mutton Chops', 
        price: 750, 
        unit: 'kg', 
        description: 'Tender mutton chops for special occasions', 
        rating: 4.7, 
        reviews: 43,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'
      },
    ],
    kabab: [
      { 
        id: 9, 
        name: 'Seekh Kabab', 
        price: 380, 
        unit: 'kg', 
        description: 'Spiced minced meat on skewers', 
        rating: 4.6, 
        reviews: 134,
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop'
      },
      { 
        id: 10, 
        name: 'Chicken Tikka', 
        price: 450, 
        unit: 'kg', 
        description: 'Marinated chicken pieces', 
        rating: 4.8, 
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop'
      },
      { 
        id: 11, 
        name: 'Shami Kabab', 
        price: 32, 
        unit: 'piece', 
        description: 'Traditional spiced patties', 
        rating: 4.5, 
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop'
      },
      { 
        id: 12, 
        name: 'Galouti Kabab', 
        price: 45, 
        unit: 'piece', 
        description: 'Melt-in-mouth Lucknowi specialty', 
        rating: 4.9, 
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
      },
    ],
  };

  const getFilteredItems = () => {
    let items = filters.selectedCategory === 'all' 
      ? Object.values(menuItems).flat() 
      : menuItems[filters.selectedCategory] || [];

    // Search filter
    if (filters.searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(p => 
        p === '+' ? Infinity : parseInt(p)
      );
      items = items.filter(item => {
        if (max === undefined) return item.price >= min;
        return item.price >= min && item.price <= max;
      });
    }

    // Sort items
    items.sort((a, b) => {
      let aValue = a[filters.sortBy];
      let bValue = b[filters.sortBy];
      
      if (filters.sortBy === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return items;
  };

  const filteredItems = getFilteredItems();

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      toast({
        title: "Please login",
        description: "You need to login to add items to cart",
        variant: "destructive",
      });
      setShowLoginModal(true);
      return;
    }
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const handleFilterChange = (newFilters) => {
    setIsLoading(true);
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-current drop-shadow-sm' : 'text-gray-500'}`}
          />
        ))}
        <span className="text-sm text-gray-300 ml-1">{rating}</span>
      </div>
    );
  };

  const handleQuickOrder = () => {
    setCurrentPage('menu');
  };

  if (currentPage === 'profile') {
    return <ProfilePage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'tracking') {
    return <OrderTracking onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-purple-500/20 shadow-2xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-500/25">
              <Utensils className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              BukBuk
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={currentPage === 'home' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('home')}
              className={currentPage === 'home' 
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/25 border-0' 
                : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-200'
              }
            >
              Home
            </Button>
            <Button
              variant={currentPage === 'menu' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('menu')}
              className={currentPage === 'menu' 
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/25 border-0' 
                : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-200'
              }
            >
              Menu
            </Button>
            <InstallButton />
            {isLoggedIn && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage('profile')}
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-200"
                >
                  Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage('tracking')}
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-200"
                >
                  Track Order
                </Button>
                <Button
                  onClick={() => setShowCartModal(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 relative shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-2">
                    Cart
                    {getCartItemsCount() > 0 && (
                      <Badge className="bg-yellow-400 text-black ml-1 animate-pulse">
                        {getCartItemsCount()}
                      </Badge>
                    )}
                  </div>
                </Button>
              </>
            )}
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                onClick={logout}
                className="border-red-500/50 text-red-300 hover:bg-red-500/10 hover:border-red-400 hover:text-red-200"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => setShowLoginModal(true)}
                className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white font-semibold shadow-lg shadow-pink-500/25 transition-all duration-300 hover:scale-105"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Welcome Banner for logged in users */}
      {isLoggedIn && currentPage === 'home' && (
        <WelcomeBanner onQuickOrder={handleQuickOrder} />
      )}

      {/* HOME PAGE */}
      {currentPage === 'home' && (
        <>
          {/* Hero Section */}
          <section className="relative overflow-hidden py-20">
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="animate-fade-in">
                <h1 className="text-6xl md:text-8xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                    Fresh Meat,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    Delivered Fast
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Experience the future of meat delivery with premium quality, lightning-fast service, and cutting-edge technology
                </p>
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-6 py-3 text-lg shadow-lg shadow-green-500/25 border-0">
                    <Clock className="mr-2" size={20} />
                    30 Min Delivery
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-black px-6 py-3 text-lg shadow-lg shadow-blue-500/25 border-0">
                    <Star className="mr-2" size={20} />
                    Premium Quality
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 text-lg shadow-lg shadow-purple-500/25 border-0">
                    <Truck className="mr-2" size={20} />
                    Free Delivery
                  </Badge>
                </div>
                <Button
                  onClick={() => isLoggedIn ? setCurrentPage('menu') : setShowLoginModal(true)}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white text-2xl px-12 py-6 rounded-full shadow-2xl shadow-pink-500/50 transition-all duration-300 hover:scale-110 hover:shadow-pink-500/75 animate-pulse border-0 font-bold"
                  size="lg"
                >
                  <Zap className="mr-3" size={28} />
                  Order Now
                  <Sparkles className="ml-3" size={28} />
                </Button>
              </div>
            </div>
          </section>

          {/* Quick Reorder Section for logged in users */}
          {isLoggedIn && <QuickReorder />}

          {/* Loyalty Rewards Section */}
          <LoyaltyRewards />

          {/* Featured Products Section */}
          <FeaturedProducts />

          {/* Features Section */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Why Choose BukBuk?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-purple-500/20">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/25">
                      <Star className="text-3xl text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Premium Quality</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Fresh, halal-certified meat sourced from trusted suppliers with the highest quality standards and advanced preservation technology.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-cyan-500/20">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/25">
                      <Clock className="text-3xl text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Lightning Fast</h3>
                    <p className="text-gray-300 leading-relaxed">
                      AI-powered logistics and drone delivery technology ensures your fresh meat arrives within 30 minutes of ordering.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-md border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-pink-500/20">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                      <Truck className="text-3xl text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Smart Delivery</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Free contactless delivery with real-time tracking, temperature monitoring, and secure packaging for ultimate freshness.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 backdrop-blur-sm border-y border-purple-500/20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Contact Us
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-full px-6 py-3 border border-purple-500/20">
                  <Phone size={24} className="text-green-400" />
                  <span className="text-white font-medium">+91 9876543210</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-full px-6 py-3 border border-purple-500/20">
                  <Mail size={24} className="text-blue-400" />
                  <span className="text-white font-medium">order@bukbuk.com</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-full px-6 py-3 border border-purple-500/20">
                  <MapPin size={24} className="text-purple-400" />
                  <span className="text-white font-medium">Delhi NCR</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* MENU PAGE */}
      {currentPage === 'menu' && (
        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Fresh Meat Menu
          </h1>

          {/* Advanced Product Search */}
          <ProductSearch 
            onFilterChange={handleFilterChange}
            categories={Object.keys(menuItems)}
          />

          {/* Menu Categories */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/5 backdrop-blur-md rounded-full p-2 flex space-x-2 border border-purple-500/20">
              <Button
                onClick={() => handleFilterChange({ selectedCategory: 'all' })}
                variant={filters.selectedCategory === 'all' ? "default" : "ghost"}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-semibold ${
                  filters.selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25'
                    : 'text-purple-300 hover:bg-purple-500/20 hover:text-white'
                }`}
              >
                All
              </Button>
              {Object.keys(menuItems).map((category) => (
                <Button
                  key={category}
                  onClick={() => handleFilterChange({ selectedCategory: category })}
                  variant={filters.selectedCategory === category ? "default" : "ghost"}
                  className={`px-6 py-3 rounded-full transition-all duration-300 font-semibold ${
                    filters.selectedCategory === category
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25'
                      : 'text-purple-300 hover:bg-purple-500/20 hover:text-white'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="py-16">
              <LoadingSpinner 
                size="lg" 
                type="meat" 
                message="Finding the freshest meat for you..." 
              />
            </div>
          )}

          {/* Menu Items */}
          {!isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="bg-white/5 backdrop-blur-md border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 overflow-hidden shadow-2xl hover:shadow-purple-500/20">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{item.name}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{item.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      {renderStars(item.rating)}
                      <span className="text-sm text-gray-400">({item.reviews} reviews)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        ₹{item.price}/{item.unit}
                      </span>
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/25 transition-all duration-300 hover:scale-105 border-0"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No items found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => handleFilterChange({
                  searchQuery: '',
                  selectedCategory: 'all',
                  priceRange: 'all',
                  sortBy: 'name',
                  sortOrder: 'asc'
                })}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* AI Assistant */}
      <AIAssistant />

      {/* Modals */}
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <CartModal 
        open={showCartModal} 
        onClose={() => setShowCartModal(false)}
        cart={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={getCartTotal()}
      />
      
      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
};

export default Index;

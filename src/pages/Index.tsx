import { useState, useEffect } from 'react';
import { Utensils, Clock, Star, Truck, Phone, Mail, MapPin, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import LoginModal from '@/components/LoginModal';
import CartModal from '@/components/CartModal';
import ProfilePage from '@/components/ProfilePage';
import OrderTracking from '@/components/OrderTracking';
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

  const filteredItems = menuItems[currentCategory]?.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  if (currentPage === 'profile') {
    return <ProfilePage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'tracking') {
    return <OrderTracking onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Utensils className="text-2xl text-red-600" />
            <h1 className="text-2xl font-bold text-red-600">BukBuk</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={currentPage === 'home' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('home')}
              className={currentPage === 'home' ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              Home
            </Button>
            <Button
              variant={currentPage === 'menu' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('menu')}
              className={currentPage === 'menu' ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              Menu
            </Button>
            <InstallButton />
            {isLoggedIn && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage('profile')}
                >
                  Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage('tracking')}
                >
                  Track Order
                </Button>
                <Button
                  onClick={() => setShowCartModal(true)}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 relative"
                >
                  <div className="flex items-center gap-2">
                    Cart
                    {getCartItemsCount() > 0 && (
                      <Badge className="bg-white text-red-600 ml-1">
                        {getCartItemsCount()}
                      </Badge>
                    )}
                  </div>
                </Button>
              </>
            )}
            {isLoggedIn ? (
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => setShowLoginModal(true)}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* HOME PAGE */}
      {currentPage === 'home' && (
        <>
          {/* Hero Section */}
          <section className="relative overflow-hidden py-20">
            <div className="container mx-auto px-4 text-center">
              <div className="animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-6">
                  BukBuk
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8">
                  Fresh Chicken, Mutton & Kabab Delivered to Your Door
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg">
                    <Clock className="mr-2" size={16} />
                    30 Min Delivery
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-lg">
                    <Star className="mr-2" size={16} />
                    Premium Quality
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-lg">
                    <Truck className="mr-2" size={16} />
                    Free Delivery
                  </Badge>
                </div>
                <Button
                  onClick={() => isLoggedIn ? setCurrentPage('menu') : setShowLoginModal(true)}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-xl px-8 py-4 rounded-full shadow-2xl"
                  size="lg"
                >
                  Order Now
                </Button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-white/50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose BukBuk?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <Star className="text-2xl text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
                    <p className="text-gray-600">
                      Fresh, halal-certified meat sourced from trusted suppliers with the highest quality standards.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Clock className="text-2xl text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Fast Delivery</h3>
                    <p className="text-gray-600">
                      Get your fresh meat delivered within 30 minutes to your doorstep with our express delivery service.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Truck className="text-2xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Free Delivery</h3>
                    <p className="text-gray-600">
                      Enjoy free delivery on all orders above ₹500. No hidden charges, just fresh meat at your door.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-2">
                  <Phone size={20} />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={20} />
                  <span>order@bukbuk.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>Delhi NCR</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* MENU PAGE */}
      {currentPage === 'menu' && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Fresh Meat Menu
          </h1>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                placeholder="Search for meat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>
          </div>

          {/* Menu Categories */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/50 rounded-full p-1 flex space-x-1">
              {Object.keys(menuItems).map((category) => (
                <Button
                  key={category}
                  onClick={() => setCurrentCategory(category)}
                  variant={currentCategory === category ? "default" : "ghost"}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    currentCategory === category
                      ? 'bg-red-500 text-white'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    {renderStars(item.rating)}
                    <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">₹{item.price}/{item.unit}</span>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

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

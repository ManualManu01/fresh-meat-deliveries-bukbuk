
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductSearchProps {
  onFilterChange: (filters: any) => void;
  categories: string[];
}

const ProductSearch = ({ onFilterChange, categories }: ProductSearchProps) => {
  const [localFilters, setLocalFilters] = useState({
    searchQuery: '',
    selectedCategory: 'all',
    priceRange: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Only call onFilterChange when localFilters actually change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(localFilters);
    }, 300); // Debounce the filter changes

    return () => clearTimeout(timeoutId);
  }, [localFilters, onFilterChange]);

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      searchQuery: '',
      selectedCategory: 'all',
      priceRange: 'all',
      sortBy: 'name',
      sortOrder: 'asc'
    };
    setLocalFilters(clearedFilters);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl mb-8">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search for meat products..."
              value={localFilters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="pl-10 bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant={showAdvancedFilters ? "default" : "outline"}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={showAdvancedFilters 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-0' 
                : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10'
              }
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Advanced Filters
            </Button>
            
            {/* Clear Filters Button */}
            {(localFilters.searchQuery || localFilters.selectedCategory !== 'all' || localFilters.priceRange !== 'all') && (
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg border border-purple-500/20">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <Select value={localFilters.selectedCategory} onValueChange={(value) => handleFilterChange('selectedCategory', value)}>
                  <SelectTrigger className="bg-white/10 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                <Select value={localFilters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                  <SelectTrigger className="bg-white/10 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-300">₹0 - ₹300</SelectItem>
                    <SelectItem value="300-500">₹300 - ₹500</SelectItem>
                    <SelectItem value="500-700">₹500 - ₹700</SelectItem>
                    <SelectItem value="700+">₹700+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                <Select value={localFilters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                  <SelectTrigger className="bg-white/10 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
                <Select value={localFilters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value)}>
                  <SelectTrigger className="bg-white/10 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {(localFilters.searchQuery || localFilters.selectedCategory !== 'all' || localFilters.priceRange !== 'all') && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-400">Active filters:</span>
              {localFilters.searchQuery && (
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                  Search: {localFilters.searchQuery}
                </Badge>
              )}
              {localFilters.selectedCategory !== 'all' && (
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                  Category: {localFilters.selectedCategory}
                </Badge>
              )}
              {localFilters.priceRange !== 'all' && (
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                  Price: ₹{localFilters.priceRange}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSearch;

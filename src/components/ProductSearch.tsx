
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, SortAsc, SortDesc, X } from 'lucide-react';

interface ProductSearchProps {
  onFilterChange: (filters: any) => void;
  categories: string[];
}

const ProductSearch = ({ onFilterChange, categories }: ProductSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹300', value: '0-300' },
    { label: '₹300 - ₹500', value: '300-500' },
    { label: '₹500 - ₹700', value: '500-700' },
    { label: 'Above ₹700', value: '700+' }
  ];

  const sortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'Rating', value: 'rating' },
    { label: 'Popularity', value: 'reviews' }
  ];

  useEffect(() => {
    onFilterChange({
      searchQuery,
      selectedCategory,
      priceRange,
      sortBy,
      sortOrder
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy, sortOrder, onFilterChange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange('all');
    setSortBy('name');
    setSortOrder('asc');
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-2xl mb-8">
      <CardContent className="p-6">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-purple-400" size={20} />
            <Input
              placeholder="Search for fresh meat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 backdrop-blur-md border border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/25"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400"
          >
            <Filter size={16} />
            Filters
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="space-y-4 border-t border-purple-500/20 pt-6 animate-fade-in">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white/5 border border-purple-500/30 text-white rounded-md px-3 py-2 focus:border-purple-400 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-white/5 border border-purple-500/30 text-white rounded-md px-3 py-2 focus:border-purple-400 focus:outline-none"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white/5 border border-purple-500/30 text-white rounded-md px-3 py-2 focus:border-purple-400 focus:outline-none"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400"
                >
                  {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                  <span className="ml-2">{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                </Button>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2 border-red-500/50 text-red-300 hover:bg-red-500/10 hover:border-red-400"
              >
                <X size={16} />
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductSearch;

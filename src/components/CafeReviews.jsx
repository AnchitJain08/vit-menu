import React, { useState, useEffect } from 'react';
import { FaStar, FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import { IoTimeOutline, IoClose, IoSearchOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

const getCafeData = (restaurantName) => {
  switch(restaurantName) {
    case "Under Belly Cafe":
      return {
        rating: 4.3,
        totalReviews: 1432,
        distribution: [
          { stars: 5, count: 800 },
          { stars: 4, count: 400 },
          { stars: 3, count: 150 },
          { stars: 2, count: 52 },
          { stars: 1, count: 30 }
        ],
        recentReviews: [
          {
            id: 1,
            user: "Rahul S.",
            rating: 5,
            date: "2 days ago",
            dish: "Paneer Tikka Pizza",
            comment: "Amazing pizza! The paneer was perfectly spiced and service was quick.",
            isVeg: true
          },
          {
            id: 2,
            user: "Priya M.",
            rating: 4,
            date: "1 week ago",
            dish: "Schezwan Noodles",
            comment: "Good variety of options. Loved the Chinese section. Portions could be bigger.",
            isVeg: true
          }
        ]
      };

    case "Mayuri Restaurant":
      return {
        rating: 4.5,
        totalReviews: 2156,
        distribution: [
          { stars: 5, count: 1200 },
          { stars: 4, count: 600 },
          { stars: 3, count: 250 },
          { stars: 2, count: 80 },
          { stars: 1, count: 26 }
        ],
        recentReviews: [
          {
            id: 1,
            user: "Aditya K.",
            rating: 5,
            date: "1 day ago",
            dish: "Tandoori Roti",
            comment: "Best tandoori items on campus! Fresh and hot rotis every time.",
            isVeg: true
          },
          {
            id: 2,
            user: "Sneha R.",
            rating: 4,
            date: "3 days ago",
            dish: "Veg Manchurian",
            comment: "The Indo-Chinese dishes are really good. Quick service too!",
            isVeg: true
          }
        ]
      };

    case "CRCL Cafe":
      return {
        rating: 4.1,
        totalReviews: 987,
        distribution: [
          { stars: 5, count: 400 },
          { stars: 4, count: 350 },
          { stars: 3, count: 180 },
          { stars: 2, count: 40 },
          { stars: 1, count: 17 }
        ],
        recentReviews: [
          {
            id: 1,
            user: "Vikram S.",
            rating: 5,
            date: "4 days ago",
            dish: "Masala Dosa",
            comment: "The South Indian items are authentic. Loved the sambar!",
            isVeg: true
          },
          {
            id: 2,
            user: "Meera P.",
            rating: 4,
            date: "1 week ago",
            dish: "Chicken Biryani",
            comment: "Good portion size and taste. Could be a bit spicier.",
            isVeg: false
          }
        ]
      };

    default:
      return {
        rating: 0,
        totalReviews: 0,
        distribution: [],
        recentReviews: []
      };
  }
};

const CafeReviews = ({ restaurantName, restaurantPath }) => {
  const location = useLocation();
  const menuItems = location.state?.menuItems || [];
  const [activeTab, setActiveTab] = useState('recent');
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    dish: '',
    comment: '',
    isVeg: true
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check system theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }

    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setTheme(e.matches ? 'dark' : 'light');
    });
  }, []);

  // Get initial cafe data
  const initialReviews = getCafeData(restaurantName);
  
  // Add state for managing reviews
  const [reviewsList, setReviewsList] = useState(initialReviews.recentReviews);

  // Filter reviews based on search term
  const filteredReviews = reviewsList.filter(review => 
    review.dish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    // Create new review object
    const newReviewObj = {
      id: Date.now(),
      user: "You",
      rating: newReview.rating,
      date: "Just now",
      dish: newReview.dish,
      comment: newReview.comment,
      isVeg: newReview.isVeg
    };

    // Add new review to the top of the list
    setReviewsList(prevReviews => [newReviewObj, ...prevReviews]);
    
    // Close modal and reset form
    setIsAddingReview(false);
    setNewReview({ rating: 0, dish: '', comment: '', isVeg: true });
  };

  const handleDishSearch = (value) => {
    setNewReview(prev => ({ ...prev, dish: value }));
    if (value.trim()) {
      const filtered = menuItems.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDishes(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredDishes([]);
      setShowSuggestions(false);
    }
  };

  const selectDish = (dish) => {
    setNewReview(prev => ({ 
      ...prev, 
      dish: dish.name,
      isVeg: dish.isVeg 
    }));
    setShowSuggestions(false);
  };

  const handleSearchInput = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = menuItems.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered);
      setShowSearchSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSearchSuggestions(false);
    }
  };

  const selectSearchItem = (item) => {
    setSearchTerm(item.name);
    setShowSearchSuggestions(false);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#121212]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-[#1C1C1E] text-white' : 'bg-white text-gray-900 shadow-sm'}`}>
        <div className="container mx-auto px-4">
          <div className="py-6">
            {/* Back Button and Title */}
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={() => navigate(restaurantPath)}
                className={`p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors duration-200`}
              >
                <FaArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">{restaurantName}</h1>
            </div>
            
            {/* Rating Summary */}
            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-bold">{initialReviews.rating}</div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(initialReviews.rating) ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} mt-1`}>
                  {initialReviews.totalReviews} reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => handleSearchInput(e.target.value)}
              onFocus={() => searchTerm && setShowSearchSuggestions(true)}
              className={`w-full h-12 pl-12 pr-4 ${
                theme === 'dark' 
                  ? 'bg-[#2C2C2E] border-[#3A3A3C] text-white placeholder-gray-400' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              } rounded-xl border focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200`}
            />
            <IoSearchOutline className={`absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </div>

        {/* Write Review Button */}
        <button
          onClick={() => setIsAddingReview(true)}
          className={`w-full mb-6 py-3 ${
            theme === 'dark' 
              ? 'bg-[#2C2C2E] text-white hover:bg-[#3A3A3C]' 
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          } rounded-xl transition-colors duration-200 font-medium`}
        >
          Write a Review
        </button>

        {/* Rating Distribution */}
        <div className={`${theme === 'dark' ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm'} rounded-xl p-6 mb-6`}>
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Rating Distribution</h2>
          <div className="space-y-3">
            {initialReviews.distribution.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-20">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stars}</span>
                  <FaStar className="w-4 h-4 text-yellow-400" />
                </div>
                <div className={`flex-1 h-2 ${theme === 'dark' ? 'bg-[#3A3A3C]' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div 
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${(count / initialReviews.totalReviews) * 100}%` }}
                  />
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} w-16 text-right`}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className={`${theme === 'dark' ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm'} rounded-xl overflow-hidden`}>
          {/* Tabs */}
          <div className={`flex border-b ${theme === 'dark' ? 'border-[#3A3A3C]' : 'border-gray-200'}`}>
            {['recent', 'highest', 'lowest'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200
                          ${activeTab === tab 
                            ? `${theme === 'dark' ? 'text-white' : 'text-gray-900'} border-b-2 border-current` 
                            : `${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Reviews */}
          <div className={`divide-y ${theme === 'dark' ? 'divide-[#3A3A3C]' : 'divide-gray-200'}`}>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <div key={review.id} className={`p-4 ${theme === 'dark' ? 'hover:bg-[#3A3A3C]' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                  <div className="flex items-start gap-4">
                    <FaUserCircle className={`w-10 h-10 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} truncate`}>{review.user}</h3>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1`}>{review.dish}</div>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm mb-2`}>{review.comment}</p>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                        <IoTimeOutline className="w-4 h-4" />
                        <span>{review.date}</span>
                        {review.isVeg && (
                          <span className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={`p-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                No reviews found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      {isAddingReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${theme === 'dark' ? 'bg-[#2C2C2E]' : 'bg-white'} rounded-2xl w-full max-w-lg shadow-xl`}>
            <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-[#3A3A3C]' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Write a Review</h3>
              <button 
                onClick={() => setIsAddingReview(false)}
                className={`p-2 ${theme === 'dark' ? 'hover:bg-[#3A3A3C]' : 'hover:bg-gray-100'} rounded-full transition-colors`}
              >
                <IoClose className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="p-6 space-y-6">
              {/* Rating Selection */}
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <FaStar 
                        className={`w-8 h-8 ${
                          star <= newReview.rating ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-600' : 'text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Dish Selection with Suggestions */}
              <div className="relative">
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'} mb-2`}>
                  What did you order?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newReview.dish}
                    onChange={(e) => handleDishSearch(e.target.value)}
                    onFocus={() => newReview.dish && setShowSuggestions(true)}
                    placeholder="Enter dish name"
                    className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 ${
                      theme === 'dark' 
                        ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white placeholder-gray-400' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <IoSearchOutline className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredDishes.length > 0 && (
                  <div className={`absolute z-10 w-full mt-1 ${
                    theme === 'dark' 
                      ? 'bg-[#2C2C2E] border-[#3A3A3C]' 
                      : 'bg-white border-gray-200'
                  } rounded-lg shadow-lg border max-h-48 overflow-y-auto`}>
                    {filteredDishes.map((dish, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectDish(dish)}
                        className={`w-full px-4 py-2 text-left ${
                          theme === 'dark' 
                            ? 'hover:bg-[#3A3A3C] text-white' 
                            : 'hover:bg-gray-50 text-gray-900'
                        } flex items-center gap-2`}
                      >
                        <span className={`w-2 h-2 rounded-full ${dish.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span>{dish.name}</span>
                        <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm ml-auto`}>{dish.price}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Review Text */}
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Tell us about your experience..."
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'bg-[#3A3A3C] border-[#4A4A4C] text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Veg/Non-veg Toggle */}
              <div className="flex items-center gap-2">
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Is this a veg dish?</label>
                <button
                  type="button"
                  onClick={() => setNewReview(prev => ({ ...prev, isVeg: !prev.isVeg }))}
                  className={`w-4 h-4 rounded-full ${newReview.isVeg ? 'bg-green-500' : 'bg-red-500'}`}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingReview(false)}
                  className={`px-4 py-2 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:bg-[#3A3A3C]' 
                      : 'text-gray-600 hover:bg-gray-100'
                  } rounded-lg transition-colors duration-200`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } rounded-lg transition-colors duration-200`}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CafeReviews;
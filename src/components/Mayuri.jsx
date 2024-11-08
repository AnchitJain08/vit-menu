import React, { useState, useEffect } from 'react';
import { useVegMode } from '../context/VegModeContext';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCafeData } from '../utils/cafeData';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import QuantityControl from './QuantityControl';
import MobileMenu from './MobileMenu';
import { IoRestaurantOutline } from 'react-icons/io5';
import { useVariantModal } from '../context/VariantModalContext';

const Mayuri = ({ isExpanded, isMobile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isVegMode, setIsVegMode } = useVegMode();
  const navigate = useNavigate();
  const location = useLocation();
  const cafeData = getCafeData("Mayuri Cafe");
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [itemQuantities, setItemQuantities] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { showModal } = useVariantModal();

  useEffect(() => {
    // Store the current cafe route when component mounts
    localStorage.setItem('lastVisitedCafe', location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add this useEffect to sync with cart
  useEffect(() => {
    // Initialize quantities from cart
    const quantities = {};
    cart.forEach(item => {
      quantities[item.name] = item.quantity;
    });
    setItemQuantities(quantities);
  }, [cart]);

  const menu = {
    freshItems: {
      title: "Fresh Items",
      items: [
        { name: "Fresh Lime Water", price: "₹60", isVeg: true },
        { name: "Fresh Lime Soda", price: "₹80", isVeg: true },
        { name: "Fresh Fruits Salad", price: "₹80", isVeg: true }
      ]
    },
    mainCourse: {
      title: "Main Course",
      items: [
        { name: "Kadhai Paneer", price: "₹130", isVeg: true },
        { name: "Butter Paneer Masala", price: "₹140", isVeg: true },
        { name: "Paneer Lababdar", price: "₹150", isVeg: true }
      ]
    },
    pizza: {
      title: "Pizza",
      items: [
        { name: "Cheese Corn Pizza", price: "₹130", isVeg: true },
        { name: "Farm House Pizza", price: "₹150", isVeg: true },
        { name: "Tandoori Paneer Pizza", price: "₹180", isVeg: true }
      ]
    },
    breads: {
      title: "Breads",
      items: [
        { name: "Tandoori Roti", price: "₹20", isVeg: true },
        { name: "Tandoori Butter Roti", price: "₹25", isVeg: true },
        { name: "Naan", price: "₹25", isVeg: true },
        { name: "Butter Naan", price: "₹30", isVeg: true },
        { name: "Stuffed Kulcha", price: "₹40", isVeg: true },
        { name: "Butter Garlic Naan", price: "₹40", isVeg: true },
        { name: "Tandoori Paratha", price: "₹40", isVeg: true },
        { name: "Stuffed Kulcha with Butter", price: "₹45", isVeg: true }
      ]
    },
    chinese: {
      title: "Chinese",
      items: [
        { name: "Veg. Manchurian", price: "₹100", isVeg: true },
        { name: "Fried Rice", price: "₹110", isVeg: true },
        { name: "Veg. Hakka Noodles", price: "₹110", isVeg: true },
        { name: "Veg. Schezwan Noodles", price: "₹120", isVeg: true },
        { name: "Chilli Paneer", price: "₹130", isVeg: true }
      ]
    },
    tandoori: {
      title: "Tandoori",
      items: [
        { name: "Soya Masala Tikka", price: "₹120", isVeg: true },
        { name: "Soya Malai Tikka", price: "₹130", isVeg: true },
        { name: "Paneer Tikka Masala", price: "₹140", isVeg: true },
        { name: "Paneer Malai Tikka", price: "₹150", isVeg: true }
      ]
    },
    pasta: {
      title: "Pasta",
      items: [
        { name: "Arrabiata Pasta (Red)", price: "₹130", isVeg: true },
        { name: "Alfredo Pasta (White)", price: "₹150", isVeg: true }
      ]
    }
  };
  const scrollToSection = (sectionTitle) => {
    const element = document.getElementById(sectionTitle.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredMenu = Object.entries(menu).reduce((acc, [key, section]) => {
    const filteredItems = section.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVegMode = isVegMode ? item.isVeg : true;
      return matchesSearch && matchesVegMode;
    });
    
    if (filteredItems.length > 0) {
      acc[key] = {
        ...section,
        items: filteredItems
      };
    }
    return acc;
  }, {});

  // Flatten menu items for search
  const allMenuItems = Object.values(menu).reduce((items, section) => {
    return [...items, ...section.items];
  }, []);

  const handleReviewClick = () => {
    navigate('/mayuri/reviews', { 
      state: { menuItems: allMenuItems }
    });
  };

  const addGST = (price) => {
    const basePrice = parseInt(price.replace(/[^0-9]/g, ''));
    const withGST = basePrice * 1.05;
    return Math.round(withGST);
  };

  const handleAddToCart = (item) => {
    const priceWithGST = addGST(item.price);
    addToCart({ 
      ...item, 
      price: priceWithGST,
      restaurant: "Mayuri Cafe",
      originalPrice: item.price
    });
    setItemQuantities(prev => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1
    }));
  };

  const handleQuantityChange = (item, newQuantity, currentQuantity) => {
    if (newQuantity === 0) {
      const { [item.name]: _, ...rest } = itemQuantities;
      setItemQuantities(rest);
      const itemId = `${item.name}-${item.selectedVariant || 'default'}-Mayuri Cafe`;
      removeFromCart(itemId);
    } else if (newQuantity > currentQuantity) {
      if (item.withFries || item.large || item.fullKg) {
        showModal(item, handleVariantSelect);
      } else {
        setItemQuantities(prev => ({
          ...prev,
          [item.name]: newQuantity
        }));
        const itemId = `${item.name}-${item.selectedVariant || 'default'}-Mayuri Cafe`;
        updateQuantity(itemId, newQuantity);
      }
    } else {
      setItemQuantities(prev => ({
        ...prev,
        [item.name]: newQuantity
      }));
      const itemId = `${item.name}-${item.selectedVariant || 'default'}-Mayuri Cafe`;
      updateQuantity(itemId, newQuantity);
    }
  };

  // Add this function to get total items in cart
  const getItemCount = () => {
    return Object.values(itemQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  const handleVariantSelect = (itemWithVariant) => {
    // Make sure price is a number by removing ₹ symbol if present
    const parsedItem = {
      ...itemWithVariant,
      price: typeof itemWithVariant.price === 'string' ? 
        parseInt(itemWithVariant.price.replace('₹', '')) : 
        itemWithVariant.price
    };
    
    addToCart({ 
      ...parsedItem, 
      restaurant: "Mayuri Cafe"
    });
    setItemQuantities(prev => ({
      ...prev,
      [itemWithVariant.name]: (prev[itemWithVariant.name] || 0) + 1
    }));
  };

  return (
    <div className="p-2 md:p-4 bg-white dark:bg-[#121212]">
      {/* Fixed Header - Always visible */}
      <div className="fixed top-0 right-0 bg-white dark:bg-dark-header z-50
                     border-b border-gray-200 dark:border-dark-border
                     transition-all duration-300
                     md:left-16 lg:left-[var(--sidebar-width)]"
        style={{ 
          '--sidebar-width': isExpanded ? '256px' : '64px',
          left: isMobile ? '0' : undefined 
        }}
      >
        <div className="flex items-center justify-between px-4 py-2.5">
          {/* Restaurant Name - Always left aligned */}
          <div className="flex-1">
            <h2 className={`text-base font-medium text-gray-900 dark:text-white
                         ${isMobile ? 'ml-20' : 'ml-6'}
                         transition-opacity duration-300
                         ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
              Mayuri Cafe
            </h2>
          </div>

          {/* Controls - Always right aligned */}
          <div className="flex items-center gap-3">
            {/* VEG Toggle Button */}
            <button
              onClick={() => setIsVegMode(!isVegMode)}
              className={`h-8 px-3 flex items-center rounded-lg
                        transition-all duration-200 backdrop-blur-sm border text-sm font-medium
                        ${isVegMode 
                          ? 'bg-green-500/20 text-green-500 border-green-500/30' 
                          : 'bg-gray-200/20 text-gray-700 dark:text-gray-200 border-gray-300/30'}`}
            >
              <span className="font-medium">VEG</span>
              <div className={`ml-1.5 w-2 h-2 rounded-full 
                ${isVegMode 
                  ? 'bg-green-500' 
                  : 'bg-gray-500'}`} />
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="h-8 w-8 flex items-center justify-center bg-gray-200 
                       text-gray-700 rounded-lg border border-gray-300 relative"
            >
              <FaShoppingCart className="w-3.5 h-3.5" />
              <AnimatePresence mode="wait">
                {getItemCount() > 0 && (
                  <motion.span
                    key={getItemCount()}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 
                             text-white rounded-full text-xs flex items-center 
                             justify-center font-medium"
                  >
                    {getItemCount()}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-0">
        {/* Pure Veg Tag and Restaurant Title */}
        <div className="space-y-1">
          {/* Pure Veg Tag */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 rounded-full text-green-700 text-sm font-medium w-fit">
            <svg 
              stroke="currentColor" 
              fill="currentColor" 
              strokeWidth="0" 
              viewBox="0 0 512 512" 
              className="w-3.5 h-3.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="32" 
                d="M321.89 171.42C233 114 141 155.22 56 65.22c-19.8-21-8.3 235.5 98.1 332.7 77.79 71 197.9 63.08 238.4-5.92s18.28-163.17-70.61-220.58zM173 253c86 81 175 129 292 147"
              />
            </svg>
            <span>Pure Veg</span>
          </div>

          {/* Restaurant Title and Rating */}
          <div className="flex items-start justify-between">
            <h1 className={`text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight 
                         font-[system-ui] transition-opacity duration-300
                         ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
              Mayuri Restaurant
            </h1>
            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReviewClick}
                  className="bg-green-700 text-white text-sm px-1.5 py-0.5 rounded hover:bg-green-600"
                >
                  {cafeData.rating} ★
                </button>
              </div>
              <span className="text-gray-500 text-[11px]">
                {(cafeData.totalReviews/1000).toFixed(1)}K ratings
              </span>
            </div>
          </div>

          {/* GST Disclaimer */}
          <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
            <span className="text-sm">All prices are exclusive of 5% GST</span>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-3 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-3">
            {Object.entries(searchTerm || isVegMode ? filteredMenu : menu).map(([key, section]) => {
              // Count number of items
              const itemCount = section.items.length;
              
              // Dynamic grid layout based on item count
              let gridClass = 'space-y-1.5'; // Default for very small sections
              let columnSpan = '';

              if (itemCount <= 5) {
                gridClass = 'space-y-1.5';
                columnSpan = 'md:col-span-1';
              } else if (itemCount <= 12) {
                gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5';
                columnSpan = 'md:col-span-2 lg:col-span-3';
              } else {
                gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5';
                columnSpan = 'md:col-span-2 lg:col-span-3';
              }

              return (
                <div 
                  key={key}
                  id={section.title.toLowerCase().replace(/\s+/g, '-')}
                  className={`space-y-2 ${columnSpan}`}
                >
                  {/* Section Title */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 px-2">
                    {section.title}
                  </h3>

                  {/* Section Content */}
                  <div className="bg-gray-100 dark:bg-dark-section rounded-lg overflow-hidden">
                    <div className={`p-3 ${gridClass}`}>
                      {section.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 
                                                  hover:bg-gray-200 dark:hover:bg-dark-hover rounded 
                                                  transition-all duration-200">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}/>
                              <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{item.name}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-gray-600 dark:text-gray-400">{item.price}</span>
                            </div>
                          </div>
                          <AnimatePresence mode="wait">
                            {itemQuantities[item.name] ? (
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                              >
                                <QuantityControl
                                  quantity={itemQuantities[item.name]}
                                  onIncrease={() => handleQuantityChange(
                                    item, 
                                    itemQuantities[item.name] + 1, 
                                    itemQuantities[item.name]
                                  )}
                                  onDecrease={() => handleQuantityChange(
                                    item, 
                                    itemQuantities[item.name] - 1, 
                                    itemQuantities[item.name]
                                  )}
                                />
                              </motion.div>
                            ) : (
                              <button
                                onClick={() => handleAddToCart(item)}
                                className="h-7 w-[88px] flex items-center justify-center bg-red-500/20 
                                         backdrop-blur-sm border border-red-500/30 text-red-500 
                                         rounded-lg hover:bg-red-500/30 active:bg-red-500/40 
                                         transition-colors duration-200 text-sm font-medium shadow-sm"
                              >
                                Add
                              </button>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 right-0 bg-gray-100 dark:bg-dark-header border-t border-gray-200/50 dark:border-dark-border z-30 rounded-t-md
                  transition-all duration-300
                  md:left-16 lg:left-[var(--sidebar-width)]"
           style={{ 
             '--sidebar-width': isExpanded ? '256px' : '64px',
             left: isMobile ? '0' : undefined 
           }}
      >
        <div className="flex items-center justify-between px-2 py-1.5">
          {/* Search Bar - Takes more space */}
          <div className="flex-1 mx-2">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-8 px-3 bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-md
                       text-gray-700 dark:text-gray-200 text-sm focus:outline-none"
            />
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="h-8 px-4 flex items-center justify-center gap-2 bg-white dark:bg-dark-card 
                     border border-gray-300 dark:border-dark-border rounded-md text-gray-700 dark:text-gray-200 text-sm shrink-0 ml-2"
          >
            <span>Menu</span>
            <IoRestaurantOutline className="w-4 h-4" />
          </button>
        </div>
        
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>

      {/* Bottom spacer */}
      <div className="h-[calc(3.5rem+env(safe-area-inset-bottom,0px))]" />

      {/* Menu Modal */}
      <MobileMenu 
        sections={Object.values(menu).map(section => section.title)}
        onSectionClick={scrollToSection}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default Mayuri;
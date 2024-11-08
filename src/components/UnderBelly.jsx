import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import MobileMenu from './MobileMenu';
import { useVegMode } from '../context/VegModeContext';
import { getCafeData } from '../utils/cafeData';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import QuantityControl from './QuantityControl';
import { useVariantModal } from '../context/VariantModalContext';
import { IoRestaurantOutline } from 'react-icons/io5';

const UnderBelly = ({ isExpanded, isMobile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isVegMode, setIsVegMode } = useVegMode();
  const navigate = useNavigate();
  const location = useLocation();
  const cafeData = getCafeData("Under Belly Cafe");
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
      setIsScrolled(scrollPosition > 100); // Show after 100px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to get total quantity of an item from cart
  const getTotalQuantityFromCart = (itemName) => {
    return cart.reduce((total, cartItem) => {
      if (cartItem.name === itemName && cartItem.restaurant === "Under Belly Cafe") {
        return total + cartItem.quantity;
      }
      return total;
    }, 0);
  };

  // Update itemQuantities state based on cart
  useEffect(() => {
    const newQuantities = {};
    cart.forEach(item => {
      if (item.restaurant === "Under Belly Cafe") {
        newQuantities[item.name] = (newQuantities[item.name] || 0) + item.quantity;
      }
    });
    setItemQuantities(newQuantities);
  }, [cart]);

  const menu = {
    tandoori: {
      title: "TANDOORI",
      items: [
        { name: "PANEER KULCHA (2 PC)", price: "₹130", isVeg: true },
        { name: "TANDOORI ROTI", price: "₹30", isVeg: true },
        { name: "TANDOORI BUTTER ROTI", price: "₹35", isVeg: true },
        { name: "TANDOORI ALOO PARATHA (2 PC)", price: "₹100", isVeg: true },
        { name: "TANDOORI LACHHA PARATHA", price: "₹47", isVeg: true },
        { name: "BUTTER NAAN", price: "₹42", isVeg: true },
        { name: "NAAN", price: "₹37", isVeg: true },
        { name: "GARLIC NAAN", price: "₹45", isVeg: true }
      ]
    },
    sandwiches: {
      title: "SANDWICH VEG & NON VEG",
      items: [
        { name: "DOUBLE CHEESE SANDWICH", price: "₹89", withFries: "₹137", isVeg: true },
        { name: "SWEET CORN SANDWICH", price: "₹89", withFries: "₹126", isVeg: true },
        { name: "PANEER TIKKA SANDWICH", price: "₹100", withFries: "₹152", isVeg: true },
        { name: "CHICKEN TIKKA SANDWICH", price: "₹121", withFries: "₹163", isVeg: false },
        { name: "MUSHROOM CHEESE SANDWICH", price: "₹100", withFries: "₹152", isVeg: true },
        { name: "CLASSIC CHICKEN CLUB SANDWICH", price: "₹121", withFries: "₹152", isVeg: false },
        { name: "CHEESE MAYO GRILLED CHICKEN SANDWICH", price: "₹110", withFries: "₹152", isVeg: false },
        { name: "BOMBAY GRILLED SANDWICH", price: "₹68", withFries: "₹137", isVeg: true },
        { name: "VEG CHEESE BURGER", price: "₹95", withFries: "₹152", isVeg: true },
        { name: "CHICKEN BURGER", price: "₹116", withFries: "₹163", isVeg: false },
        { name: "VEG WRAP", price: "₹95", withFries: "₹147", isVeg: true },
        { name: "CHICKEN WRAP", price: "₹121", withFries: "₹158", isVeg: false },
        { name: "PANEER WRAP", price: "₹100", withFries: "₹152", isVeg: true }
      ]
    },
    indianGravy: {
      title: "INDIAN GRAVY",
      items: [
        { name: "PANEER BUTTER MASALA", price: "₹158", isVeg: true },
        { name: "KADAI PANEER MASALA", price: "₹147", isVeg: true },
        { name: "PANEER TIKKA MASALA", price: "₹158", isVeg: true },
        { name: "SHAHI PANEER MASALA", price: "₹147", isVeg: true },
        { name: "CHICKEN TIKKA MASALA", price: "₹168", isVeg: false },
        { name: "SCHEZWAN CHICKEN GRAVY", price: "₹168", isVeg: false },
        { name: "DAL MAKHANI", price: "₹150", isVeg: true },
        { name: "DAL TADKA", price: "₹130", isVeg: true },
        { name: "KADAI SABZI", price: "₹140", isVeg: true },
        { name: "PUNJABI CHICKEN MASALA", price: "₹168", isVeg: false },
        { name: "HYDERABADI CHICKEN MASALA", price: "₹168", isVeg: false },
        { name: "BUTTER CHICKEN MASALA", price: "₹168", isVeg: false },
        { name: "CHICKEN LABABDAR", price: "₹168", isVeg: false },
        { name: "DHANYA MURGA ADRAKI MASALA", price: "₹168", isVeg: false },
        { name: "CHICKEN KEEMA MASALA", price: "₹168", isVeg: false },
        { name: "DAHI MURUGA", price: "₹169", isVeg: false }
      ]
    },
    southIndian: {
      title: "SOUTH INDIAN",
      items: [
        { name: "MASALA DOSA", price: "₹80", isVeg: true },
        { name: "BUTTER MASALA DOSA", price: "₹90", isVeg: true },
        { name: "PLAIN DOSA", price: "₹70", isVeg: true },
        { name: "GHEE DOSA", price: "₹79", isVeg: true },
        { name: "BUTTER DOSA", price: "₹80", isVeg: true },
        { name: "CHILLY GARLIC PANEER DOSA", price: "₹116", isVeg: true },
        { name: "GHEE SAMBAR IDLY (3)", price: "₹60", isVeg: true },
        { name: "PAPER MASALA DOSA", price: "₹70", isVeg: true },
        { name: "PANEER KHEEMA DOSA", price: "₹105", isVeg: true },
        { name: "CHEESE MASALA DOSA", price: "₹100", isVeg: true },
        { name: "CHILLY CHEESE GARLIC DOSA", price: "₹130", isVeg: true },
        { name: "ONION CHEESE MASALA DOSA", price: "₹100", isVeg: true }
      ]
    }
    ,
    vegStarters: {
      title: "VEG STARTERS",
      items: [
        { name: "CLASSIC FRENCH FRIES", price: "₹95", isVeg: true },
        { name: "MASALA FRENCH FRIES", price: "₹105", isVeg: true },
        { name: "VEG CHEESE FINGERS", price: "₹115", isVeg: true },
        { name: "PANEER TIKKA", price: "₹158", isVeg: true },
        { name: "PANEER MALAI TIKKA", price: "₹158", isVeg: true },
        { name: "CHILLY PANEER DRY", price: "₹130", isVeg: true },
        { name: "CHILLY PANEER GRAVY", price: "131", isVeg: true },
        { name: "VEG MANCHURIAN", price: "₹137", isVeg: true },
        { name: "MUSHROOM CHILLY", price: "₹137", isVeg: true },
        { name: "PANEER 65", price: "₹140", isVeg: true },
        { name: "MUSHROOM 65", price: "₹140", isVeg: true },
        { name: "HONEY CHILLY POTATO", price: "₹140", isVeg: true }
      ]
    },
    nonVegStarters: {
      title: "NON VEG STARTERS",
      items: [
        { name: "CHICKEN NUGGETS", price: "₹152", isVeg: false },
        { name: "CHICKEN WINGS", price: "₹152", isVeg: false },
        { name: "CHICKEN TIKKA", price: "₹168", isVeg: false },
        { name: "CHICKEN MALAI TIKKA", price: "₹168", isVeg: false },
        { name: "TANDOORI CHICKEN HALF", price: "₹210", isVeg: false },
        { name: "TANDOORI CHICKEN FULL", price: "₹399", isVeg: false },
        { name: "CHILLY CHICKEN DRY", price: "₹140", isVeg: false },
        { name: "CHILLY CHICKEN GRAVY", price: "₹150", isVeg: false },
        { name: "DRAGON CHICKEN", price: "₹152", isVeg: false },
        { name: "CHICKEN 65", price: "₹152", isVeg: false }
      ]
    },
    chinese: {
      title: "CHINESE",
      items: [
        { name: "VEG NOODLES", price: "₹130", isVeg: true },
        { name: "VEG FRIED RICE", price: "₹130", isVeg: true },
        { name: "CHICKEN NOODLES", price: "₹142", isVeg: false },
        { name: "CHICKEN FRIED RICE", price: "₹142", isVeg: false },
        { name: "SCHEZWAN VEG NOODLES", price: "₹131", isVeg: true },
        { name: "SCHEZWAN VEG FRIED RICE", price: "₹131", isVeg: true },
        { name: "SCHEZWAN CHICKEN FRIED RICE", price: "₹152", isVeg: false },
        { name: "EGG FRIED RICE", price: "₹142", isVeg: false },
        { name: "PANEER FRICE RICE", price: "₹160", isVeg: true },
        { name: "SCHEZWAN CHICKEN NOODLES", price: "₹152", isVeg: false }
      ]
    }
    ,
    pizza: {
      title: "PIZZA",
      items: [
        { name: "SWEET CORN PIZZA", price: "₹200", isVeg: true },
        { name: "UB SPECIAL PIZZA", price: "₹200", isVeg: true },
        { name: "PANEER TIKKA PIZZA", price: "₹200", isVeg: true },
        { name: "VEG SUPREME PIZZA", price: "₹200", isVeg: true },
        { name: "CLASSIC MARGHERITA PIZZA", price: "₹200", isVeg: true },
        { name: "UB SPECIAL NON VEG PIZZA", price: "₹230", isVeg: false },
        { name: "CHICKEN TIKKA PIZZA", price: "₹230", isVeg: false },
        { name: "JALAPENO CHICKEN PIZZA", price: "₹230", isVeg: false }
      ]
    },
    pasta: {
      title: "PASTA",
      items: [
        { name: "PENNE ALFREDO PASTA", price: "₹105", large: "₹168", isVeg: true },
        { name: "PENNE ARABIATA", price: "₹105", large: "₹168", isVeg: true },
        { name: "PINK SAUCE PASTA", price: "₹105", large: "₹168", isVeg: true },
        { name: "BASIL SAUCE PASTA", price: "₹105", large: "₹168", isVeg: true },
        { name: "PENNE ALFREDO CHICKEN", price: "₹127", large: "₹179", isVeg: false },
        { name: "PENNE ARABIATA CHICKEN", price: "₹127", large: "₹179", isVeg: false },
        { name: "PINK SAUCE CHICKEN PASTA", price: "₹127", large: "₹179", isVeg: false },
        { name: "BASIL SAUCE CHICKEN PASTA", price: "₹127", large: "₹179", isVeg: false }
      ]
    },
    coldBeverages: {
      title: "COLD BEVERAGES",
      items: [
        { name: "BUTTERSCOTCH MILKSHAKE", price: "₹50", large: "₹90", isVeg: true },
        { name: "VANILLA MILKSHAKE", price: "₹50", large: "₹90", isVeg: true },
        { name: "CHOCOLATE MILKSHAKE", price: "₹50", large: "₹90", isVeg: true },
        { name: "OREO MILKSHAKE", price: "₹60", large: "₹98", isVeg: true },
        { name: "KITKAT MILKSHAKE", price: "₹60", large: "₹95", isVeg: true },
        { name: "COLD COFFEE", price: "₹50", large: "₹80", isVeg: true },
        { name: "NUTELLA MILKSHAKE", price: "₹60", large: "₹90", isVeg: true }
      ]
    },
    freshJuices: {
      title: "FRESH JUICE",
      items: [
        { name: "ORANGE JUICE", price: "₹70", isVeg: true },
        { name: "SWEET LIME JUICE", price: "₹70", isVeg: true },
        { name: "PINEAPPLE JUICE", price: "₹70", isVeg: true },
        { name: "MANGO JUICE", price: "₹70", isVeg: true },
        { name: "LEMON ICE TEA", price: "₹42", large: "₹63", isVeg: true },
        { name: "LIME MINT COOLER", price: "₹42", large: "₹63", isVeg: true }
      ]
    },
    bakery: {
      title: "BAKERY ITEMS",
      items: [
        { name: "VEG PLAIT", price: "₹42", isVeg: true },
        { name: "VEG SUB ROLL", price: "₹42", isVeg: true },
        { name: "VEG TURNOVER", price: "₹32", isVeg: true },
        { name: "CHILLY CHEESE PLAIT", price: "₹53", isVeg: true },
        { name: "PANEER PIZZA BUN", price: "₹47", isVeg: true },
        { name: "VEG CRISPY ROLL", price: "₹42", isVeg: true },
        { name: "CHICKEN TURNOVER", price: "₹42", isVeg: false },
        { name: "CHICKEN PIZZA BUN", price: "₹53", isVeg: false },
        { name: "CHICKEN SUB ROLL", price: "₹53", isVeg: false }
      ]
    },
    hotBeverages: {
      title: "HOT BEVERAGES",
      items: [
        { name: "GINGER TEA", price: "₹15", isVeg: true },
        { name: "COFFEE", price: "₹15", isVeg: true },
        { name: "HOT CHOCOLATE", price: "₹40", isVeg: true },
        { name: "BLACK COFFE", price: "₹30", isVeg: true }
      ]
    },
    eggVarieties: {
      title: "EGG VARIETIES",
      items: [
        { name: "BREAD OMELETTE", price: "₹63", isVeg: false },
        { name: "MASALA OMELETTE", price: "₹37", isVeg: false },
        { name: "CHEESE OMELETTE", price: "₹53", isVeg: false },
        { name: "EGG BHURII", price: "₹37", isVeg: false }
      ]
    },
    soyaChaap: {
      title: "SOYA CHAAP",
      items: [
        { name: "TANDOORI SOYA CHAAP", price: "₹150", isVeg: true },
        { name: "ACHARI SOYA CHAAP", price: "₹150", isVeg: true },
        { name: "MALAI SOYA CHAAP", price: "₹160", isVeg: true }
      ]
    },
    momos: {
      title: "MOMOS",
      items: [
        { name: "VEG MOMOS", price: "₹105", isVeg: true },
        { name: "PANEER MOMOS", price: "₹126", isVeg: true },
        { name: "CHICKEN MOMOS", price: "₹137", isVeg: false }
      ]
    },
    nachos: {
      title: "NACHOS",
      items: [
        { name: "VEG MIXED NACHOS", price: "₹100", isVeg: true },
        { name: "CHICKEN NACHOS", price: "₹121", isVeg: false }
      ]
    },
    pastry: {
      title: "PASTRY",
      items: [
        { name: "OREO PASTRY", price: "₹80", isVeg: true },
        { name: "KITKAT PASTRY", price: "₹80", isVeg: true },
        { name: "CHOCO TRUFFLE", price: "₹80", isVeg: true },
        { name: "BLUE BERRY", price: "₹80", isVeg: true },
        { name: "SWISS ROLL", price: "₹74", isVeg: true },
        { name: "WALNUT BROWNIE", price: "₹74", isVeg: true },
        { name: "CHOCO DOUGNUT", price: "₹42", isVeg: true },
        { name: "PINEAPPLE PASTRY", price: "₹80", isVeg: true },
        { name: "STRABERY PASTRY", price: "₹80", isVeg: true },
        { name: "REDVELVET PASTRY", price: "₹80", isVeg: true },
        { name: "BUTTERSCOTCH PASTRY", price: "₹80", isVeg: true }
      ]
    },
    birthdayCake: {
      title: "BIRTHDAY CAKE",
      items: [
        { name: "CHOCO TRUFFLE (500g)", price: "₹500", isVeg: true },
        { name: "CHOCO TRUFFLE (1kg)", price: "₹950", isVeg: true },
        { name: "KITKAT CAKE (500g)", price: "₹550", isVeg: true },
        { name: "KITKAT CAKE (1kg)", price: "₹1000", isVeg: true },
        { name: "OREO CAKE (500g)", price: "₹550", isVeg: true },
        { name: "OREO CAKE (1kg)", price: "₹1000", isVeg: true },
        { name: "CHOCOLATE CAKE (500g)", price: "₹500", isVeg: true },
        { name: "CHOCOLATE CAKE (1kg)", price: "₹900", isVeg: true },
        { name: "BUTTERSCOTCH CAKE (500g)", price: "₹500", isVeg: true },
        { name: "BUTTERSCOTCH CAKE (1kg)", price: "₹800", isVeg: true },
        { name: "STRAWBERRY CAKE (500g)", price: "₹450", isVeg: true },
        { name: "STRAWBERRY CAKE (1kg)", price: "₹900", isVeg: true },
        { name: "PINEAPPLE CAKE (500g)", price: "₹450", isVeg: true },
        { name: "PINEAPPLE CAKE (1kg)", price: "₹900", isVeg: true }
      ]
    }
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

  const allMenuItems = Object.values(menu).reduce((items, section) => {
    return [...items, ...section.items];
  }, []);

  const handleReviewClick = () => {
    navigate('/underbelly/reviews', { 
      state: { menuItems: allMenuItems }
    });
  };

  const handleVariantSelect = (itemWithVariant) => {
    const parsedItem = {
      ...itemWithVariant,
      price: typeof itemWithVariant.price === 'string' ? 
        parseInt(itemWithVariant.price.replace('₹', '')) : 
        itemWithVariant.price,
      restaurant: "Under Belly Cafe"
    };
    
    addToCart(parsedItem);
  };

  const handleAddToCart = (item) => {
    const basePrice = parseInt(item.price.replace(/[^0-9]/g, ''));
    addToCart({ 
      ...item, 
      price: basePrice,
      restaurant: "Under Belly Cafe",
      originalPrice: item.price
    });
    setItemQuantities(prev => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1
    }));
  };

  const handleQuantityChange = (item, newQuantity, currentQuantity) => {
    const totalInCart = getTotalQuantityFromCart(item.name);

    if (newQuantity === 0) {
      // Remove all variants of this item from cart
      const cartItems = cart.filter(cartItem => 
        cartItem.name === item.name && cartItem.restaurant === "Under Belly Cafe"
      );
      cartItems.forEach(cartItem => {
        const itemId = `${cartItem.name}-${cartItem.selectedVariant || 'default'}-Under Belly Cafe`;
        removeFromCart(itemId);
      });
    } else if (newQuantity > totalInCart) {
      // Adding item
      if (item.withFries || item.large || item.fullKg) {
        showModal(item, handleVariantSelect);
      } else {
        const parsedPrice = parseInt(item.price.replace('₹', ''));
        const cartItem = { 
          ...item, 
          price: parsedPrice,
          restaurant: "Under Belly Cafe",
          selectedVariant: 'default'
        };
        addToCart(cartItem);
      }
    } else {
      // Decreasing quantity - remove the most recent variant
      const cartItems = cart.filter(cartItem => 
        cartItem.name === item.name && cartItem.restaurant === "Under Belly Cafe"
      );
      if (cartItems.length > 0) {
        const itemToRemove = cartItems[cartItems.length - 1];
        const itemId = `${itemToRemove.name}-${itemToRemove.selectedVariant || 'default'}-Under Belly Cafe`;
        removeFromCart(itemId);
      }
    }
  };

  const getItemCount = () => {
    return Object.values(itemQuantities).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="p-2 md:p-4 bg-white dark:bg-[#121212]">
      {/* Fixed Header */}
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
          <div className="flex-1">
            <h2 className={`text-base font-medium text-gray-900 dark:text-gray-100
                         ${isMobile ? 'ml-20' : 'ml-6'}
                         transition-opacity duration-300
                         ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
              Under Belly Cafe
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
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
                            ${isVegMode ? 'bg-green-500' : 'bg-gray-500'}`} />
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
        <div className="space-y-1">
          <div className="flex items-start justify-between">
            <h1 className={`text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight 
                         font-[system-ui] transition-opacity duration-300
                         ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
              Under Belly Cafe
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
            <span className="text-sm">All prices are inclusive of 5% GST</span>
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
                <div key={key} id={section.title.toLowerCase().replace(/\s+/g, '-')} className={`space-y-2 ${columnSpan}`}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 px-2">
                    {section.title}
                  </h3>

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

export default UnderBelly;
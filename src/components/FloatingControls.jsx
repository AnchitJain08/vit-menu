import React from 'react';
import { useVegMode } from '../context/VegModeContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingControls = () => {
  const { isVegMode, setIsVegMode } = useVegMode();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getItemCount();

  return (
    <div className="fixed top-4 right-4 flex items-center gap-3 z-[70]">
      {/* Veg Toggle */}
      <button
        onClick={() => setIsVegMode(!isVegMode)}
        className={`h-11 flex items-center px-4 rounded-full shadow-sm
                   transition-all duration-200 
                   ${isVegMode 
                     ? 'bg-green-500 text-white' 
                     : 'bg-white text-gray-700'}`}
        aria-label={isVegMode ? 'Switch to all food' : 'Switch to veg only'}
      >
        <span className="text-sm font-medium">VEG</span>
        <div className={`ml-2 w-4 h-4 rounded-full border-2 
                      ${isVegMode ? 'border-white bg-green-500' : 'border-gray-400'}`} />
      </button>

      {/* Cart Button */}
      <button
        onClick={() => navigate('/cart')}
        className="w-11 h-11 flex items-center justify-center bg-gray-800 
                   text-white rounded-full shadow-sm hover:bg-gray-700 
                   active:bg-gray-900 transition-colors duration-200"
        aria-label="Shopping cart"
      >
        <div className="relative">
          <FaShoppingCart className="w-6 h-6" />
          <AnimatePresence mode="wait">
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 
                         text-white rounded-full text-xs flex items-center 
                         justify-center font-medium"
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
};

export default FloatingControls; 
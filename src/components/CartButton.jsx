import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartButton = () => {
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getItemCount();

  return (
    <button
      onClick={() => navigate('/cart')}
      className="fixed top-4 right-20 z-50 p-2 bg-dark-card text-gray-200 
                rounded-full shadow-lg hover:bg-dark-hover 
                border border-dark-border transition-colors duration-200"
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
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white 
                       rounded-full text-xs flex items-center justify-center"
            >
              {itemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};

export default CartButton; 
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus, FaDownload, FaChevronDown, FaFilePdf, FaFileImage, FaFileExport } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { downloadCartAsImage } from '../utils/cartImage';
import { Switch, Menu } from '@headlessui/react';
import { IoChevronBack } from 'react-icons/io5';

const AnimatedPrice = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => `₹${latest.toFixed(2)}`);
  
  React.useEffect(() => {
    const animation = animate(count, value, { duration: 0.5 });
    return animation.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

const CountingNumber = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));
  
  React.useEffect(() => {
    const animation = animate(count, value, { duration: 0.3 });
    return animation.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

const ReceiptFormatMenu = ({ onGenerate, isGenerating }) => {
  const formats = [
    { 
      id: 'pdf', 
      label: 'PDF Document', 
      icon: <FaFilePdf className="w-4 h-4 text-red-500 dark:text-red-400" />
    },
    { 
      id: 'png', 
      label: 'PNG Image', 
      icon: <FaFileImage className="w-4 h-4 text-blue-500 dark:text-blue-400" />
    },
    { 
      id: 'webp', 
      label: 'WebP Image', 
      icon: <FaFileImage className="w-4 h-4 text-purple-500 dark:text-purple-400" />
    },
    { 
      id: 'jpeg', 
      label: 'JPEG Image', 
      icon: <FaFileExport className="w-4 h-4 text-green-500 dark:text-green-400" />
    }
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        disabled={isGenerating}
        className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg 
                  hover:bg-gray-700 dark:hover:bg-gray-600 
                  transition-colors duration-200 flex items-center gap-2 
                  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaDownload className="w-4 h-4" />
        <span>{isGenerating ? 'Generating...' : 'Receipt'}</span>
        <FaChevronDown className="w-3 h-3" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-dark-card 
                           rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50">
        <div className="py-1">
          {formats.map((format) => (
            <Menu.Item key={format.id}>
              {({ active }) => (
                <button
                  onClick={() => onGenerate(format.id)}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-dark-hover' : ''
                  } flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  {format.icon}
                  {format.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showSeparateTotals, setShowSeparateTotals] = useState(false);

  const getVariantLabel = (item) => {
    if (!item.selectedVariant || item.selectedVariant === 'default') return '';
    return ` (${item.selectedVariant})`;
  };

  const getUniqueRestaurants = () => {
    const restaurants = new Set(cart.map(item => item.restaurant));
    return restaurants.size;
  };

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-4xl mx-auto text-center"
      >
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-8">
          <motion.h2 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100"
          >
            Your cart is empty
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some delicious items to your cart!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const lastVisitedCafe = localStorage.getItem('lastVisitedCafe') || '/underbelly';
              navigate(lastVisitedCafe);
            }}
            className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg 
                     hover:bg-gray-700 dark:hover:bg-gray-600 
                     transition-colors duration-200"
          >
            Browse Menu
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const handleGenerateReceipt = (format) => {
    setIsGeneratingPDF(true);
    downloadCartAsImage(cart, getCartTotal(), format, showSeparateTotals)
      .finally(() => setIsGeneratingPDF(false));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-white dark:bg-[#121212]"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="h-8 w-8 flex items-center justify-center 
                     bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-200 
                     rounded-lg border border-gray-200 dark:border-dark-border"
          >
            <IoChevronBack className="w-3.5 h-3.5" />
          </button>
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          >
            Your Cart
          </motion.h2>
        </div>
        
        <div className="flex gap-3">
          <ReceiptFormatMenu 
            onGenerate={handleGenerateReceipt}
            isGenerating={isGeneratingPDF}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg 
                     hover:bg-red-700 dark:hover:bg-red-600 
                     transition-colors duration-200"
          >
            Clear Cart
          </motion.button>
        </div>
      </div>

      <motion.div 
        className="bg-white dark:bg-dark-section rounded-xl shadow-md overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="p-4 hover:bg-gray-50 dark:hover:bg-dark-hover 
                        transition-colors duration-200 border-b 
                        border-gray-200 dark:border-dark-border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {getVariantLabel(item)}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.restaurant}</p>
                    <p className="text-gray-700 dark:text-gray-200 mt-1 font-mono">
                      <AnimatedPrice value={item.price * item.quantity} />
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <motion.div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-[1rem] hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full 
                               text-gray-600 dark:text-gray-300 transition-colors duration-200"
                    >
                      <FaMinus className="w-[1rem] h-[1rem]" />
                    </motion.button>
                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-8 text-center text-gray-900 dark:text-gray-100"
                    >
                      <CountingNumber value={item.quantity} />
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-[1rem] hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full 
                               text-gray-600 dark:text-gray-300 transition-colors duration-200"
                    >
                      <FaPlus className="w-[1rem] h-[1rem]" />
                    </motion.button>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="p-[1rem] text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 
                             rounded-full transition-colors duration-200"
                  >
                    <FaTrash className="w-[1rem] h-[1rem]" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div 
          className="bg-gray-50 dark:bg-dark-section p-6"
        >
          {/* Bill Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Bill Details</h3>
            {getUniqueRestaurants() > 1 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">Show cafe-wise totals</span>
                <Switch
                  checked={showSeparateTotals}
                  onChange={setShowSeparateTotals}
                  className={`${
                    showSeparateTotals ? 'bg-gray-800 dark:bg-gray-700' : 'bg-gray-400 dark:bg-gray-600'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
                >
                  <span className="sr-only">Show cafe-wise totals</span>
                  <span
                    className={`${
                      showSeparateTotals ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
                  />
                </Switch>
              </div>
            )}
          </div>

          {/* Cafe-wise Subtotals */}
          <AnimatePresence mode="wait">
            {showSeparateTotals && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 mb-6"
              >
                {Object.entries(
                  cart.reduce((acc, item) => {
                    acc[item.restaurant] = (acc[item.restaurant] || 0) + (item.price * item.quantity);
                    return acc;
                  }, {})
                ).map(([restaurant, total]) => (
                  <div key={restaurant} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-dark-border">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                      <span className="text-gray-700 dark:text-gray-300">{restaurant}</span>
                    </div>
                    <span className="font-mono text-gray-900 dark:text-gray-100">
                      <AnimatedPrice value={total} />
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bill Summary */}
          <div className="space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium text-gray-900 dark:text-gray-100">Total Amount</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">All prices are final</p>
              </div>
              <span className="text-xl font-bold font-mono text-gray-900 dark:text-gray-100">
                <AnimatedPrice 
                  value={cart.reduce((total, item) => 
                    total + (item.price * item.quantity), 
                    0
                  )} 
                />
              </span>
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Note: All prices are final
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
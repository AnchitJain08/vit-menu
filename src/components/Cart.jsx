import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus, FaDownload, FaChevronDown, FaFilePdf, FaFileImage, FaFileExport } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
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

const CafeTotals = ({ cart }) => {
  const cafeTotals = cart.reduce((acc, item) => {
    const cafe = item.restaurant;
    if (!acc[cafe]) acc[cafe] = 0;
    acc[cafe] += item.price * item.quantity;
    return acc;
  }, {});

  const uniqueCafes = Object.keys(cafeTotals).length;
  
  if (uniqueCafes <= 1) return null;

  return (
    <div className="space-y-2">
      {Object.entries(cafeTotals).map(([cafe, total]) => (
        <div key={cafe} className="flex justify-between items-center">
          <span className="text-gray-600">{cafe}</span>
          <span className="font-mono">
            <AnimatedPrice value={total} />
          </span>
        </div>
      ))}
    </div>
  );
};

const ReceiptFormatMenu = ({ onGenerate, isGenerating }) => {
  const formats = [
    { 
      id: 'pdf', 
      label: 'PDF Document', 
      icon: <FaFilePdf className="w-4 h-4 text-red-500" />
    },
    { 
      id: 'png', 
      label: 'PNG Image', 
      icon: <FaFileImage className="w-4 h-4 text-blue-500" />
    },
    { 
      id: 'webp', 
      label: 'WebP Image', 
      icon: <FaFileImage className="w-4 h-4 text-purple-500" />
    },
    { 
      id: 'jpeg', 
      label: 'JPEG Image', 
      icon: <FaFileExport className="w-4 h-4 text-green-500" />
    }
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        disabled={isGenerating}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 
                  transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
      >
        <FaDownload className="w-4 h-4" />
        <span>{isGenerating ? 'Generating...' : 'Receipt'}</span>
        <FaChevronDown className="w-3 h-3" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg 
                           ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="py-1">
          {formats.map((format) => (
            <Menu.Item key={format.id}>
              {({ active }) => (
                <button
                  onClick={() => onGenerate(format.id)}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700`}
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
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal 
  } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showSeparateTotals, setShowSeparateTotals] = useState(false);

  const getVariantLabel = (item) => {
    if (!item.selectedVariant) return '';
    return ` (${item.selectedVariant})`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      x: -300,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleGenerateReceipt = (format) => {
    setIsGeneratingPDF(true);
    downloadCartAsImage(cart, getCartTotal(), format, showSeparateTotals)
      .finally(() => setIsGeneratingPDF(false));
  };

  const getUniqueCafesCount = () => {
    const uniqueCafes = new Set(cart.map(item => item.restaurant));
    return uniqueCafes.size;
  };

  const getLastCafeRoute = () => {
    const lastItem = cart[cart.length - 1];
    if (!lastItem) return '/';

    const cafeRoutes = {
      "Under Belly Cafe": "/underbelly",
      "CRCL Cafe": "/crcl",
      "Mayuri Cafe": "/mayuri"
    };

    return cafeRoutes[lastItem.restaurant] || '/';
  };

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-4xl mx-auto text-center"
      >
        <div className="bg-white rounded-xl shadow-md p-8">
          <motion.h2 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold mb-4"
          >
            Your cart is empty
          </motion.h2>
          <p className="text-gray-600 mb-6">Add some delicious items to your cart!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const lastVisitedCafe = localStorage.getItem('lastVisitedCafe') || '/underbelly';
              navigate(lastVisitedCafe);
            }}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 
                     transition-colors duration-200"
          >
            Browse Menu
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-[1rem] max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-[1.5rem]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="h-[2rem] w-[2rem] flex items-center justify-center bg-gray-200 
                      text-gray-700 rounded-lg border border-gray-300"
          >
            <IoChevronBack className="w-[0.875rem] h-[0.875rem]" />
          </button>
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold"
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
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                     transition-colors duration-200"
          >
            Clear Cart
          </motion.button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              exit="exit"
              layout
              className="p-4 hover:bg-gray-50 transition-colors duration-200 border-b"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className="font-medium">
                      {item.name}
                      <span className="text-gray-500 text-sm">
                        {getVariantLabel(item)}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500">{item.restaurant}</p>
                    <p className="text-gray-700 mt-1 font-mono">
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
                      className="p-[1rem] hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <FaMinus className="w-[1rem] h-[1rem]" />
                    </motion.button>
                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-8 text-center"
                    >
                      <CountingNumber value={item.quantity} />
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-[1rem] hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <FaPlus className="w-[1rem] h-[1rem]" />
                    </motion.button>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="p-[1rem] text-red-600 hover:bg-red-50 rounded-full 
                             transition-colors duration-200"
                  >
                    <FaTrash className="w-[1rem] h-[1rem]" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 p-4"
        >
          {getUniqueCafesCount() > 1 && (
            <div className="flex items-center justify-end gap-3 mb-4">
              <span className="text-sm text-gray-600">Show cafe-wise totals</span>
              <Switch
                checked={showSeparateTotals}
                onChange={setShowSeparateTotals}
                className={`${
                  showSeparateTotals ? 'bg-gray-800' : 'bg-gray-400'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
              >
                <span
                  className={`${
                    showSeparateTotals ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
                />
              </Switch>
            </div>
          )}

          <AnimatePresence mode="wait">
            {showSeparateTotals ? (
              <motion.div
                key="separate"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <CafeTotals cart={cart} />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-medium">Total Amount</span>
            <span className="text-xl font-bold font-mono">
              <AnimatedPrice value={getCartTotal()} />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cart; 
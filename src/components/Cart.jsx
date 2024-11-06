import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { downloadCartAsImage } from '../utils/cartImage';

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

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal 
  } = useCart();
  const navigate = useNavigate();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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
            onClick={() => navigate('/')}
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
      className="p-4 max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold"
        >
          Your Cart
        </motion.h2>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsGeneratingPDF(true);
              downloadCartAsImage(cart, getCartTotal())
                .finally(() => setIsGeneratingPDF(false));
            }}
            disabled={isGeneratingPDF}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 
                     transition-colors duration-200 flex items-center gap-2"
          >
            <FaDownload className="w-4 h-4" />
            <span>{isGeneratingPDF ? 'Generating...' : 'Download'}</span>
          </motion.button>
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
                  <span className={`w-3 h-3 rounded-full mt-1.5 
                                ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
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
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <FaMinus className="w-4 h-4" />
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
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <FaPlus className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full 
                             transition-colors duration-200"
                  >
                    <FaTrash className="w-4 h-4" />
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
          <div className="flex justify-between items-center">
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
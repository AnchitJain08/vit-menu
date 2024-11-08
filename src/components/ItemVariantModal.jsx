import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const ItemVariantModal = ({ item, isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  let variants = [];
  
  // Handle cake variants (fullKg)
  if (item.fullKg) {
    variants = [
      { name: '500g', price: item.price },
      { name: '1kg', price: item.fullKg }
    ];
  }
  // Handle size variants
  else if (item.large) {
    variants = [
      { name: 'Regular', price: item.price },
      { name: 'Large', price: item.large }
    ];
  }
  // Handle "with fries" variants
  else if (item.withFries) {
    variants = [
      { name: 'Without Fries', price: item.price },
      { name: 'With Fries', price: item.withFries }
    ];
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-4 right-4 bottom-20 md:left-1/2 md:right-auto md:bottom-auto 
                     md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[320px]
                     bg-white dark:bg-dark-card rounded-xl shadow-xl overflow-hidden z-50
                     border border-gray-200 dark:border-dark-border"
          >
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full 
                                 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
              >
                <IoClose className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select your preference</p>
              {variants.map((variant, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    const price = parseInt(variant.price.replace('₹', ''));
                    onSelect({ 
                      ...item, 
                      selectedVariant: variant.name, 
                      price: price 
                    });
                    onClose();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-between p-3 rounded-lg
                           bg-white dark:bg-dark-section border border-gray-200 dark:border-dark-border 
                           hover:bg-gray-50 dark:hover:bg-dark-hover transition-all duration-200"
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100">{variant.name}</span>
                  <span className="text-gray-700 dark:text-gray-300">{variant.price}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ItemVariantModal; 
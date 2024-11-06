import React from 'react';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';

const ItemVariantModal = ({ item, onClose, onSelect }) => {
  const getVariants = () => {
    if (item.withFries) {
      return [
        { label: 'Without Fries', price: item.price },
        { label: 'With Fries', price: item.withFries }
      ];
    }
    if (item.large) {
      return [
        { label: 'Regular', price: item.price },
        { label: 'Large', price: item.large }
      ];
    }
    return [];
  };

  const variants = getVariants();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-500">
                {item.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Variants */}
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-600 mb-4">Select your preference</p>
          {variants.map((variant, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect({ ...item, selectedVariant: variant.label, price: variant.price })}
              className="w-full flex items-center justify-between p-3 rounded-lg border
                       hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="font-medium">{variant.label}</span>
              <span className="text-gray-700">{variant.price}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ItemVariantModal; 
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const QuantityControl = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onDecrease}
        className="p-1 hover:bg-gray-700 rounded-full transition-colors duration-200"
      >
        <FaMinus className="w-2.5 h-2.5" />
      </button>
      <AnimatePresence mode="wait">
        <motion.span
          key={quantity}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="w-4 text-center text-sm font-medium"
        >
          {quantity}
        </motion.span>
      </AnimatePresence>
      <button
        onClick={onIncrease}
        className="p-1 hover:bg-gray-700 rounded-full transition-colors duration-200"
      >
        <FaPlus className="w-2.5 h-2.5" />
      </button>
    </div>
  );
};

export default QuantityControl; 
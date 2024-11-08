import React, { createContext, useContext, useState } from 'react';
import ItemVariantModal from '../components/ItemVariantModal';
import { motion, AnimatePresence } from 'framer-motion';

const VariantModalContext = createContext();

export const VariantModalProvider = ({ children }) => {
  const [modalItem, setModalItem] = useState(null);
  const [onSelect, setOnSelect] = useState(null);

  const showModal = (item, selectCallback) => {
    setModalItem(item);
    setOnSelect(() => selectCallback);
  };

  const hideModal = () => {
    setModalItem(null);
    setOnSelect(null);
  };

  return (
    <VariantModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={hideModal}
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-50 
                     flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-white dark:bg-dark-card 
                       rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-dark-border"
            >
              <div className="p-4 border-b border-gray-200 dark:border-dark-border backdrop-blur-md bg-white/50 dark:bg-dark-section/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{modalItem.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full 
                                   ${modalItem.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {modalItem.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3 bg-white dark:bg-dark-section">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select your preference</p>
                {modalItem.withFries ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onSelect({ ...modalItem, selectedVariant: 'Without Fries', price: modalItem.price });
                        hideModal();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-lg
                               bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border
                               hover:bg-gray-50 dark:hover:bg-dark-hover transition-all duration-200"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">Without Fries</span>
                      <span className="text-gray-700 dark:text-gray-300">{modalItem.price}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onSelect({ ...modalItem, selectedVariant: 'With Fries', price: modalItem.withFries });
                        hideModal();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-lg
                               bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border
                               hover:bg-gray-50 dark:hover:bg-dark-hover transition-all duration-200"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">With Fries</span>
                      <span className="text-gray-700 dark:text-gray-300">{modalItem.withFries}</span>
                    </motion.button>
                  </>
                ) : modalItem.large ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onSelect({ ...modalItem, selectedVariant: 'Regular', price: modalItem.price });
                        hideModal();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-lg
                               bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border
                               hover:bg-gray-50 dark:hover:bg-dark-hover transition-all duration-200"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">Regular</span>
                      <span className="text-gray-700 dark:text-gray-300">{modalItem.price}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onSelect({ ...modalItem, selectedVariant: 'Large', price: modalItem.large });
                        hideModal();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-lg
                               bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border
                               hover:bg-gray-50 dark:hover:bg-dark-hover transition-all duration-200"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">Large</span>
                      <span className="text-gray-700 dark:text-gray-300">{modalItem.large}</span>
                    </motion.button>
                  </>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </VariantModalContext.Provider>
  );
};

export const useVariantModal = () => useContext(VariantModalContext);
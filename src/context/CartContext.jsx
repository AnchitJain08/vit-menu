import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Helper function to extract price value
  const extractPrice = (priceString) => {
    if (typeof priceString === 'number') return priceString;
    if (!priceString) return 0;
    
    // Extract number from string (e.g., "₹150" becomes 150)
    const match = priceString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Generate unique ID for cart items
  const generateItemId = (item) => {
    const variant = item.selectedVariant || 'default';
    return `${item.name}-${variant}-${item.restaurant}`;
  };

  const addToCart = (item, quantity = 1) => {
    setCart(prevCart => {
      const itemId = generateItemId(item);
      const existingItem = prevCart.find(cartItem => generateItemId(cartItem) === itemId);

      if (existingItem) {
        return prevCart.map(cartItem =>
          generateItemId(cartItem) === itemId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return [...prevCart, { 
        ...item, 
        id: itemId,
        quantity,
        price: extractPrice(item.price)
      }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => generateItemId(item) !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => prevCart.map(item =>
      generateItemId(item) === itemId
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
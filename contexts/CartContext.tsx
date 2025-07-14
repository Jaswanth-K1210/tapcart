import React, { createContext, useState, ReactNode } from 'react';

export type Item = {
  id: string;
  name: string;
  price: number;
};

type CartContextType = {
  cartItems: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Item[]>([
    {
      id: 'bluff1',
      name: 'Bluff Demo Product',
      price: 99,
    },
  ]);

  const addItem = (item: Item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

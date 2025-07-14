import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react';

export type Item = {
  id: string;
  name: string;
  price: number;
};

type CartContextType = {
  cartItems: Item[];
  addItem: (item: Item) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext); // ✅ EXPORT THIS

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Item[]>([
    {
      id: '1',
      name: 'Cola 500ml',
      price: 45,
    },
  ]);

  const addItem = (item: Item) => {
    setCartItems(prev => [...prev, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

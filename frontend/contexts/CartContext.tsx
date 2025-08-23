import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

// Updated to match backend data structure
export type Item = {
  _id: string;        // Changed from 'id' to '_id' to match backend
  productId?: string; // Added productId to match backend
  name: string;
  price: number;
  quantity?: number;  // Added quantity for cart items
};

type CartContextType = {
  cartItems: Item[];
  addItem: (item: Item) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  isLoading: boolean;
  total: number;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  isLoading: false,
  total: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  // Load cart from backend when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      // Clear cart when user logs out
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      const cart = await cartService.getCart();
      // Transform backend cart items to frontend format
      const transformedItems = cart.items.map(item => ({
        _id: item.product._id,
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));
      setCartItems(transformedItems);
    } catch (error) {
      console.error('Error loading cart:', error);
      // Keep local cart if API fails
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (item: Item) => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        // Add to backend
        await cartService.addToCart({
          productId: item._id,
          quantity: item.quantity || 1,
        });
        // Reload cart from backend
        await loadCart();
      } else {
        // Add to local cart if not authenticated
        setCartItems(prev => [...prev, { ...item, quantity: item.quantity || 1 }]);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Fallback to local cart
      setCartItems(prev => [...prev, { ...item, quantity: item.quantity || 1 }]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        await cartService.updateCartItem(productId, quantity);
        await loadCart();
      } else {
        // Update local cart
        setCartItems(prev => 
          prev.map(item => 
            item._id === productId || item.productId === productId 
              ? { ...item, quantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        await cartService.removeFromCart(productId);
        await loadCart();
      } else {
        // Remove from local cart
        setCartItems(prev => 
          prev.filter(item => item._id !== productId && item.productId !== productId)
        );
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        await cartService.clearCart();
      }
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      // Clear local cart anyway
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addItem, 
      clearCart, 
      updateQuantity, 
      removeItem, 
      isLoading, 
      total 
    }}>
      {children}
    </CartContext.Provider>
  );
};

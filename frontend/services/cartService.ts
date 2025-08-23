import api from '../config/api';
import { Product } from './productService';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
}

export const cartService = {
  // Get user's cart
  getCart: async (): Promise<Cart> => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (itemData: AddToCartData): Promise<Cart> => {
    try {
      const response = await api.post('/cart/add', itemData);
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItem: async (productId: string, quantity: number): Promise<Cart> => {
    try {
      const response = await api.put('/cart/update', { productId, quantity });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (productId: string): Promise<Cart> => {
    try {
      const response = await api.delete(`/cart/remove/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async (): Promise<void> => {
    try {
      await api.delete('/cart/clear');
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },
};

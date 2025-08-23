import api from '../config/api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  nfcTag?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get product by NFC tag
  getProductByNFC: async (nfcTag: string): Promise<Product> => {
    try {
      const response = await api.get(`/products/nfc/${nfcTag}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product by NFC:', error);
      throw error;
    }
  },

  // Create new product (admin only)
  createProduct: async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product (admin only)
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product (admin only)
  deleteProduct: async (id: string): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

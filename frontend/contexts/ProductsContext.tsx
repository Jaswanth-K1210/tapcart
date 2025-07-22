import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { productService, Product } from '../services/productService';

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductByNFC: (nfcTag: string) => Promise<Product | null>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const productsData = await productService.getAllProducts();
      setProducts(productsData);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProducts = async () => {
    await loadProducts();
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product._id === id);
  };

  const getProductByNFC = async (nfcTag: string): Promise<Product | null> => {
    try {
      const product = await productService.getProductByNFC(nfcTag);
      return product;
    } catch (error) {
      console.error('Error fetching product by NFC:', error);
      return null;
    }
  };

  const value: ProductsContextType = {
    products,
    isLoading,
    error,
    refreshProducts,
    getProductById,
    getProductByNFC,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

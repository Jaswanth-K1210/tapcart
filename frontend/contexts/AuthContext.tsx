import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, User, LoginData, RegisterData } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (loginData: LoginData) => Promise<void>;
  register: (registerData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored token on app start
  useEffect(() => {
    checkStoredToken();
  }, []);

  const checkStoredToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        // You might want to validate the token with the backend here
        // For now, we'll just set it and try to get user profile
        try {
          const userProfile = await authService.getProfile();
          setUser(userProfile);
        } catch (error) {
          // Token might be invalid, clear it
          await AsyncStorage.removeItem('authToken');
          setToken(null);
        }
      }
    } catch (error) {
      console.error('Error checking stored token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (loginData: LoginData) => {
    try {
      setIsLoading(true);
      const response = await authService.login(loginData);
      
      // Store token
      await AsyncStorage.setItem('authToken', response.token);
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(registerData);
      
      // Store token
      await AsyncStorage.setItem('authToken', response.token);
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // Clear stored token
      await AsyncStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

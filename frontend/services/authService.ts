import api from '../config/api';

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  // Login user
  login: async (loginData: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', loginData);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Register user
  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', registerData);
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};

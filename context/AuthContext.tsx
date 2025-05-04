import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';

// Define the shape of our auth state
type AuthState = {
  isAuthenticated: boolean;
  user: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    recoveryPhone?: string;
  } | null;
  token: string | null;
};

// Define the shape of our context
type AuthContextType = {
  authState: AuthState;
  login: (phoneNumber: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<AuthState['user']>) => void;
  setToken: (token: string) => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  authState: { isAuthenticated: false, user: null, token: null },
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  setToken: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap our app with
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  // Load auth state from storage on mount
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        // In a real app, this would fetch from AsyncStorage or another persistence mechanism
        // For demo purposes, we're just using the default state
      } catch (error) {
        console.error('Failed to load auth state', error);
      }
    };

    loadAuthState();
  }, []);

  // Handle login
  const login = (phoneNumber: string) => {
    // In a real app, this would make an API call and store the token
    setAuthState(prev => ({
      ...prev,
      user: { ...prev.user, phoneNumber },
    }));
  };

  // Handle logout
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    // Redirect to the login screen
    router.replace('/');
  };

  // Update user data
  const updateUser = (userData: Partial<AuthState['user']>) => {
    setAuthState(prev => ({
      ...prev,
      user: { ...prev.user, ...userData } as AuthState['user'],
    }));
  };

  // Set authentication token
  const setToken = (token: string) => {
    setAuthState(prev => ({
      ...prev,
      isAuthenticated: true,
      token,
    }));
  };

  // Provide the context to the app
  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        updateUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

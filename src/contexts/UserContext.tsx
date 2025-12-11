import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface UserContextType {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage or default to false
  const [isSignedIn, setIsSignedInState] = useState<boolean>(() => {
    const stored = localStorage.getItem('isSignedIn');
    return stored === 'true';
  });

  // Update localStorage whenever isSignedIn changes
  useEffect(() => {
    localStorage.setItem('isSignedIn', String(isSignedIn));
  }, [isSignedIn]);

  const setIsSignedIn = (value: boolean) => {
    setIsSignedInState(value);
  };

  return (
    <UserContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

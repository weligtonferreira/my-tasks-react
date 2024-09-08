import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { UserProps } from '../../dto/IUserProps';

interface AuthContextProps {
  user: UserProps | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function validateTokenAndLoadUser() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const { sub, name }: UserProps = jwtDecode(token);

        setUser({ userId: sub as string, name, token });
      } catch (error) {
        console.error('Invalid token', error);

        localStorage.removeItem('token');

        setUser(null);
      }
    }

    setIsLoading(false);
  }

  function login(token: string) {
    const { sub, name }: UserProps = jwtDecode(token);

    localStorage.setItem('token', token);

    setUser({ userId: sub as string, name, token });
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  useEffect(() => {
    validateTokenAndLoadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

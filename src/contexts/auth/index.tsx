import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

import { IAuthUserProps } from '../../dto/IAuthUserProps';

interface AuthContextProps {
  user: IAuthUserProps | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IAuthUserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function validateTokenAndLoadUser() {
    const token = Cookies.get('token');

    if (token) {
      try {
        const { sub, name }: IAuthUserProps = jwtDecode(token);

        setUser({ userId: sub as string, name, token });
      } catch (error) {
        console.error('Invalid token', error);

        Cookies.remove('token');

        setUser(null);
      }
    }

    setIsLoading(false);
  }

  function login(token: string) {
    const { sub, name }: IAuthUserProps = jwtDecode(token);

    Cookies.set('token', token);

    setUser({ userId: sub as string, name, token });
  }

  function logout() {
    Cookies.remove('token');
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

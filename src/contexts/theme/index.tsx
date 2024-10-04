import { createContext, useState } from 'react';

interface ThemeContextProps {
  theme: string;
  setTheme: (value: string) => void;
  toggleThemeColor: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeColor = localStorage.getItem('theme');
  const [theme, setTheme] = useState(themeColor || 'light');

  function toggleThemeColor() {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

import React from 'react';
import useStore from '../store/useStore';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-xl flex items-center justify-center bg-card border border-muted hover:border-accent hover:text-accent transition-colors"
      aria-label="Toggle theme"
      title="Toggle Dark/Light Mode"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-accent" />}
    </button>
  );
};

export default ThemeToggle;

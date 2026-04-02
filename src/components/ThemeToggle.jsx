import React from 'react';
import useStore from '../store/useStore';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <button 
      onClick={toggleTheme}
      className="p-3 ml-2 rounded-full glass-layer border border-glass-border hover:bg-glass-hover transition-all active:scale-95"
      aria-label="Toggle theme"
      title="Toggle Dark/Light Mode"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-accent" />}
    </button>
  );
};

export default ThemeToggle;

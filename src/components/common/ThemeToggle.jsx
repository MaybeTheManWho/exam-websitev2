import React from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleLanguage}
        className={`p-2 rounded-full ${
          darkMode
            ? 'text-gray-300 hover:bg-gray-700'
            : 'text-gray-600 hover:bg-gray-100'
        } transition-colors duration-200`}
        aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      >
        <Languages className="h-5 w-5" />
      </button>
      
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-full ${
          darkMode
            ? 'text-yellow-300 hover:bg-gray-700'
            : 'text-gray-600 hover:bg-gray-100'
        } transition-colors duration-200`}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default ThemeToggle;
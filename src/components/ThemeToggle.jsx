import React, { useState, useEffect, createContext, useContext } from "react";
import { Sun, Moon } from "lucide-react";

// Create a theme context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Load the theme from localStorage on mount

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Save the theme in localStorage when the darkMode state changes

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {darkMode ? (
        <Sun className="text-yellow-200" />
      ) : (
        <Moon className="text-gray-300" />
      )}
    </button>
  );
};

export default ThemeToggle;

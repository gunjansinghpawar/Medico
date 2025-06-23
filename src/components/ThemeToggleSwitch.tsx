"use client";

import React, { useEffect, useState } from "react";

const ThemeToggleSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex items-center space-x-2 text-xs sm:text-sm">
      <div
        onClick={toggleTheme}
        className={`w-12 h-6 sm:w-14 sm:h-7 flex items-center px-0.5 sm:px-1 rounded-full cursor-pointer transition-all duration-300
        ${isDarkMode ? "bg-slate-700" : "bg-blue-200"}`}
      >
        <div
          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md transform duration-300 flex items-center justify-center text-xs sm:text-sm
          ${isDarkMode ? "translate-x-6 sm:translate-x-7 bg-white text-slate-800" : "translate-x-0 bg-yellow-400 text-white"}`}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </div>
      </div>
      <span className="font-medium transition-colors duration-300">
        {isDarkMode ? "Dark" : "Light"}
      </span>
    </div>
  );
};

export default ThemeToggleSwitch;

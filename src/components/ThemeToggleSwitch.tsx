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
      // No theme saved, use system preference
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
    <div className="flex items-center space-x-3">
      <div
        onClick={toggleTheme}
        className={`w-16 h-9 flex items-center px-1 rounded-full cursor-pointer transition-all duration-300
        ${isDarkMode ? "bg-slate-700" : "bg-blue-200"}`}
      >
        <div
          className={`w-7 h-7 rounded-full shadow-md transform duration-300 flex items-center justify-center text-base
          ${isDarkMode ? "translate-x-7 bg-white text-slate-800" : "translate-x-0 bg-yellow-400 text-white"}`}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </div>
      </div>
      <span className="text-sm font-medium transition-colors duration-300">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </span>
    </div>
  );
};

export default ThemeToggleSwitch;

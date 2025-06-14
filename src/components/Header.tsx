"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Stethoscope } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const navItems = [
    {
      label: "Features",
      href: "#features",
      subItems: [
        { label: "Symptom Checker", href: "#symptom" },
        { label: "Voice Support", href: "#voice" },
      ],
    },
    {
      label: "Technology",
      href: "#technology",
      subItems: [
        { label: "Frontend", href: "#frontend" },
        { label: "Backend", href: "#backend" },
        { label: "ML Models", href: "#models" },
      ],
    },
    { label: "Team", href: "#team" },
    {
      label: "Blogs",
      href: "#blogs",
      subItems: [
        { label: "Latest", href: "#latest" },
        { label: "Trending", href: "#trending" },
      ],
    },
    { label: "News", href: "#news" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "backdrop-blur-md shadow-md" : ""
        }`}
      style={{
        background: "rgb(var(--background) / 0.85)",
        color: "rgb(var(--foreground))",
        borderBottom: "1px solid rgb(var(--border))",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl shadow-md">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:animate-pulse transition">
              Medico<span className="text-base ml-1 text-muted-foreground font-medium">AI</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium leading-none">
              Medical Healthbot
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item, idx) => (
            <div key={idx} className="relative group">
              <a
                href={item.href}
                className="relative text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:text-primary transition group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all group-hover:w-full"></span>
              </a>

              {item.subItems && (
                <div
                  className="absolute left-0 mt-2 w-56 rounded-xl border border-[rgb(var(--border))] shadow-lg
                  bg-white dark:bg-[rgb(var(--muted))]
                  dark:border-[rgba(255,255,255,0.15)]
                  dark:shadow-[0_4px_20px_rgba(0,180,255,0.2)]
                  opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50"
                >
                  <ul className="py-2">
                    {item.subItems.map((subItem, sIdx) => (
                      <li key={sIdx}>
                        <a
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-foreground hover:text-white hover:bg-gradient-to-r from-blue-600 to-green-600 rounded transition"
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Auth Buttons */}
          <a
            href="/login"
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:border-blue-500 text-blue-600 hover:text-white hover:bg-gradient-to-r from-blue-600 to-green-600 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90 transition shadow-sm"
          >
            Sign Up
          </a>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            title="Toggle Theme"
            className={`ml-3 relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-md group
              ${isDarkMode
                ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                : "bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 text-white"
              }`}
          >
            <span className="absolute inset-0 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-all duration-300" />
            {isDarkMode ? <Sun size={20} className="z-10" /> : <Moon size={20} className="z-10" />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-muted transition"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3">
          {navItems.map((item, idx) => (
            <div key={idx}>
              <a
                href={item.href}
                className="block font-medium text-muted-foreground hover:text-primary transition"
              >
                {item.label}
              </a>
              {item.subItems && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.subItems.map((subItem, sIdx) => (
                    <a
                      key={sIdx}
                      href={subItem.href}
                      className="block text-sm text-muted-foreground hover:text-primary transition"
                    >
                      ↳ {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Auth Buttons */}
          <a
            href="/login"
            className="block px-4 py-2 rounded-md text-sm border border-border hover:border-blue-500 text-blue-600 hover:text-white hover:bg-gradient-to-r from-blue-600 to-green-600 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="block px-4 py-2 rounded-md text-sm bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90 transition"
          >
            Sign Up
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-full mt-2 px-4 py-2 rounded-md text-sm text-center hover:bg-muted transition"
          >
            {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

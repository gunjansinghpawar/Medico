"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Stethoscope, ChevronDown } from "lucide-react";
import ThemeToggleSwitch from "./ThemeToggleSwitch";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "hidden"; // cleanup on unmount
    };
  }, [isMobileMenuOpen]);

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
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
              Medico
              <span className="text-base ml-1 text-muted-foreground font-medium">
                AI
              </span>
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
                <div className="absolute left-0 mt-2 w-56 rounded-xl border border-border shadow-lg bg-background dark:bg-muted opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
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
          <ThemeToggleSwitch />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggleSwitch />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-muted transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
            <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-opacity-95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out overflow-x-hidden ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        style={{
          background: "rgb(var(--background) / 0.95)",
          color: "rgb(var(--foreground))",
        }}
>

        {/* Top bar with close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl shadow-md">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:animate-pulse transition">
                Medico
                <span className="text-base ml-1 text-muted-foreground font-medium">
                  AI
                </span>
              </h1>
              <p className="text-sm text-muted-foreground font-medium leading-none">
                Medical Healthbot
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-md hover:bg-muted transition"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu content */}
        <div className="flex-1 px-4 py-6 overflow-y-auto space-y-6 max-w-full">
          {navItems.map((item, idx) => (
            <div key={idx}>
              <button
                className="w-full flex justify-between items-center font-semibold text-lg text-foreground hover:text-primary"
                onClick={() => toggleDropdown(idx)}
              >
                {item.label}
                {item.subItems && (
                  <ChevronDown
                    className={`transform transition ${openDropdowns.includes(idx) ? "rotate-180" : ""
                      }`}
                  />
                )}
              </button>
              {item.subItems && openDropdowns.includes(idx) && (
                <ul className="pl-4 mt-2 space-y-2">
                  {item.subItems.map((subItem, sIdx) => (
                    <li key={sIdx}>
                      <a
                        href={subItem.href}
                        className="block text-sm transition text-foreground hover:text-primary"
                      >
                        ↳ {subItem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

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
        </div>
      </div>
    </header>
  );
};

export default Header;

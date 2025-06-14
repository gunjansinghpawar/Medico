"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun, User, LogIn } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Blog", href: "/blog" },
  { label: "News", href: "/news" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", prefersDark);
    setIsDark(prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowHeader(currentScroll < lastScrollY || currentScroll < 10);
      setLastScrollY(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-transform duration-300 shadow-md bg-background/70 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          🩺 <span className="text-foreground">Medico</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center justify-center flex-1 space-x-6 text-sm text-muted-foreground">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-primary transition-colors duration-300 font-medium"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded-md text-foreground hover:text-primary transition"
          >
            <LogIn className="inline mr-1" size={16} />
            Login
          </Link>

          <Link
            href="/signup"
            className="text-sm px-4 py-2 rounded-md bg-primary text-foreground hover:opacity-90 transition"
          >
            <User className="inline mr-1" size={16} />
            Sign Up
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden transition-all duration-300 bg-background border-t border-muted px-6 py-4 space-y-4 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setIsOpen(false)}
            className="block text-sm text-muted-foreground hover:text-primary"
          >
            {label}
          </Link>
        ))}

        <div className="flex flex-col gap-2 pt-4 border-t border-muted">
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className="w-fit flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-muted transition"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>

          <Link href="/login" className="text-sm px-3 py-2 rounded-md hover:text-primary">
            <LogIn className="inline mr-1" size={16} />
            Login
          </Link>

          <Link
            href="/signup"
            className="text-sm px-3 py-2 rounded-md bg-primary text-white hover:opacity-90 transition"
          >
            <User className="inline mr-1" size={16} />
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

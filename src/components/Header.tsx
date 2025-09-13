"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Stethoscope, User } from "lucide-react";
import ThemeToggleSwitch from "./ThemeToggleSwitch";
import { useAuth } from '../contexts/AuthContext';
import Link from "next/link";
interface UserProfile {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    location: string;
    avatar: string;
    joinDate: string;
    lastActive: string;
    healthScore: number;
    consultations: number;
    preferences: {
        notifications: boolean;
        dataSharing: boolean;
        reminders: boolean;
    };
}
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserProfile | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (isAuthenticated) {
        try {
          const res = await fetch("/api/auth/me");
          if (!res.ok) throw new Error("Failed to fetch user details");
          const data = await res.json();
          setUserDetails(data);
        } catch (err) {
          console.error("User fetch error:", err);
        }
      }
    };

    fetchUserDetails();
  }, [isAuthenticated]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Chatbot", href: "/chat" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/teams" },
    { label: "Blogs", href: "/blog" },
    {
      label: "News",
      href: "/news",
      subItems: [
        { label: "Press Releases", href: "/news/press-releases" },
        { label: "Media Coverage", href: "/news/media-coverage" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];

  const displayName = userDetails?.firstname || user?.name || "Profile";

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md shadow-md" : ""
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
              <span className="text-base ml-1 text-muted-foreground font-medium">AI</span>
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
              <Link
                href={item.href}
                className="relative text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:text-primary transition group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all group-hover:w-full"></span>
              </Link>
              {item.subItems && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl border border-border shadow-lg bg-background dark:bg-muted opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                  <ul className="py-2">
                    {item.subItems.map((subItem, sIdx) => (
                      <li key={sIdx}>
                        <Link
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-foreground hover:text-white hover:bg-gradient-to-r from-blue-600 to-green-600 rounded transition"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 border-2 rounded-full text-sm font-semibold text-foreground hover:text-white hover:bg-black transition"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">{displayName}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:border-blue-500 text-blue-600 hover:text-white hover:bg-gradient-to-r from-blue-600 to-green-600 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90 transition shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
          <ThemeToggleSwitch />
        </nav>

        {/* Mobile Menu Toggle */}
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
        className={`fixed w-full min-h-[100vh] inset-0 z-40 flex flex-col justify-between bg-opacity-95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
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
                <span className="text-base ml-1 text-muted-foreground font-medium">AI</span>
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

        {/* Mobile Nav Items */}
        <div className="flex-1 px-4 py-6 overflow-y-auto space-y-6 max-w-full">
          {navItems.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <Link
                className="block font-semibold text-lg text-foreground hover:text-primary transition"
                href={item.href}
              >
                {item.label}
              </Link>

              {item.subItems && (
                <ul className="pl-4 space-y-2">
                  {item.subItems.map((subItem, sIdx) => (
                    <li key={sIdx}>
                      <Link
                        href={subItem.href}
                        className="block text-sm text-muted-foreground hover:text-primary transition"
                      >
                        ↳ {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-foreground hover:text-white hover:bg-gradient-to-r from-blue-600 to-green-600 transition"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">{displayName}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:border-blue-500 text-blue-600 hover:text-white hover:bg-gradient-to-r from-blue-600 to-green-600 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90 transition shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

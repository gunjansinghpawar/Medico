"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // Optional: Lucide icon

const GoToTop = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    setVisible(scrollY > 200); // Show if scrolled down more than 200px
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 cursor-pointer right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-500 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
        bg-gradient-to-r from-blue-600 to-green-600 text-white hover:bg-blue-700
      `}
      aria-label="Go to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default GoToTop;

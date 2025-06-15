"use client";

import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Stethoscope,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 group mb-5">
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
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering individuals with intelligent health guidance through
              advanced AI technology. Your trusted companion for better health
              decisions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Product</h4>
            <ul className="space-y-3 text-gray-400">
              {["How It Works", "Features", "Pricing", "API Documentation", "Integrations"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-gray-400">
              {["About Us", "Careers", "Press", "Blog", "Partners"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-gray-400">
              {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "HIPAA Compliance"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-4 h-4 text-green-400" />
              <span>© 2025 HealthBot AI. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6">
              {["Privacy", "Terms", "Cookies", "Accessibility"].map((item) => (
                <a key={item} href="#" className="hover:text-white transition">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

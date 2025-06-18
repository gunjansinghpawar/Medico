"use client";

import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Stethoscope,
} from "lucide-react";

const footerLinks = {
  product: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "API Documentation", href: "/docs/api" },
    { name: "Integrations", href: "/integrations" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
    { name: "Partners", href: "/partners" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "HIPAA Compliance", href: "/hipaa" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
  { icon: Instagram, href: "https://instagram.com" },
];

const policyLinks = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Cookies", href: "/cookies" },
  { name: "Accessibility", href: "/accessibility" },
];

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
              Empowering individuals with intelligent health guidance through advanced AI technology. Your trusted companion for better health decisions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-lg font-bold mb-6 capitalize">{section}</h4>
              <ul className="space-y-3 text-gray-400">
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <a href={href} className="hover:text-white transition">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-4 h-4 text-green-400" />
              <span>© 2025 HealthBot AI. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6">
              {policyLinks.map(({ name, href }) => (
                <a key={name} href={href} className="hover:text-white transition">
                  {name}
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

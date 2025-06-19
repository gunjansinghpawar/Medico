'use client';

import React from 'react';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

const policyLinks = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Cookies', href: '/cookies' },
  { name: 'Accessibility', href: '/accessibility' },
];

const AuthFooter = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 my-12 pt-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-muted-foreground">
        {/* Left Side: Logo + Copyright */}
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-4 h-4 text-green-500" />
          <span>© 2025 HealthBot AI. All rights reserved.</span>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center md:justify-end">
          {policyLinks.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className="hover:text-foreground transition-colors duration-200"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;

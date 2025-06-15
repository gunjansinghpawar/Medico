"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface HideOnRoutesProps {
  hideOn: string[]; // Routes to hide on (prefix match)
  children: React.ReactNode;
}

const HideOnRoutes: React.FC<HideOnRoutesProps> = ({ hideOn, children }) => {
  const pathname = usePathname();

  const isHidden = hideOn.some((prefix) => pathname.startsWith(prefix));

  return isHidden ? null : <>{children}</>;
};

export default HideOnRoutes;

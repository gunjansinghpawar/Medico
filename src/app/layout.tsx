// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HideOnRoutes from "@/middleware/ConditionalChatInput";
import ChatInputForHomepage from "@/components/ChatInputForHomepage";
import GoToTop from "@/components/GoToTop";
import CookieConsent from "@/components/CookieComponent";
import { CookieProvider } from "@/context/CookieContext";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Medico HealthBot 🩺",
  description: "An AI chatbot giving health suggestions in Hinglish & other languages.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground transition-colors duration-200`}
      >
        <CookieProvider>
          <HideOnRoutes hideOn={["/chat", "/signup", "/login"]}>
            <Header />
          </HideOnRoutes>

          <main className="flex-grow">{children}</main>

          <HideOnRoutes hideOn={["/chat", "/signup", "/login"]}>
            <ChatInputForHomepage />
            <GoToTop />
          </HideOnRoutes>

          <HideOnRoutes hideOn={["/chat", "/signup", "/login"]}>
            <Footer />
          </HideOnRoutes>

          <CookieConsent />
        </CookieProvider>
      </body>
    </html>
  );
}

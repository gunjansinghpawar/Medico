// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HideOnRoutes from "@/middleware/ConditionalChatInput";
import ChatInputForHomepage from "@/components/ChatInputForHomepage";
import GoToTop from "@/components/GoToTop";
import { ReactNode } from "react";
import PageLoader from "@/components/PageLoader";
import { ChatProvider } from "@/contexts/ChatContext";
import { AuthProvider } from "@/contexts/AuthContext";

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
  title: "Medico HealthBot 🩺 - AI Health Assistant in Hinglish",
  description:
    "Medico HealthBot is an AI-powered chatbot that provides health suggestions in Hinglish & other regional languages. Trusted, fast, and user-friendly.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL("https://yourdomain.com"), // ✅ Update this
  openGraph: {
    title: "Medico HealthBot 🩺 - Your AI Health Assistant",
    description:
      "Get smart health tips in Hinglish from Medico HealthBot. Powered by AI, multilingual, and always available!",
    url: "https://yourdomain.com",
    siteName: "Medico HealthBot",
    images: [
      {
        url: "/og-image.png", // ✅ Upload a proper Open Graph image
        width: 1200,
        height: 630,
        alt: "Medico HealthBot AI",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medico HealthBot 🩺",
    description: "AI chatbot giving health advice in Hinglish & regional Indian languages.",
    images: ["/og-image.png"],
    creator: "@yourhandle", // ✅ Add your Twitter handle if any
  },
  themeColor: "#00A67E",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" href="https://yourdomain.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground transition-colors duration-200`}
      >
    <AuthProvider>
      <ChatProvider>
            <PageLoader />

            <HideOnRoutes hideOn={["/chat", "/signup", "/login"]}>
              <Header />
            </HideOnRoutes>

            <main className="flex-grow">{children}</main>

            <HideOnRoutes
              hideOn={[
                "/chat",
                "/signup",
                "/login",
                "/profile",
                "/news",
                "/features",
                "/blog",
                "/privacy",
                "/teams",
                "/terms-and-condition",
                "/pricing",
                "/help-center",
                "/cookie-policy",
              ]}
              >
              <ChatInputForHomepage />
              <GoToTop />
            </HideOnRoutes>

            <HideOnRoutes hideOn={["/chat", "/signup", "/login"]}>
              <Footer />
            </HideOnRoutes>
              </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

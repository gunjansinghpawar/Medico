"use client";

import { Bot, Languages, Brain, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full flex items-center justify-center bg-background text-foreground transition-colors duration-300 py-20"
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 text-center w-full flex flex-col justify-center gap-12">
        {/* Hero Badge & Heading */}
        <div>
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow mb-6">
            <Bot className="w-4 h-4 mr-2" />
            AI-Powered Medical Assistant
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight md:leading-snug">
            Your Health, Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              AI Companion
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Get instant medical guidance in simple English. Our AI understands your symptoms and provides
            useful suggestions for common conditions – from fever to stomach pain.
          </p>

          <a
            href="#chat"
            className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:opacity-90 transition"
          >
            💬 Try Chatbot
          </a>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[rgb(var(--muted))] backdrop-blur-md p-6 rounded-xl shadow-sm border border-[rgb(var(--border))] hover:shadow-md transition-all duration-300">
            <Languages className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Multilingual Support</h3>
            <p className="text-sm text-muted-foreground">
              Communicate naturally in English and other regional languages
            </p>
          </div>
          <div className="bg-[rgb(var(--muted))] backdrop-blur-md p-6 rounded-xl shadow-sm border border-[rgb(var(--border))] hover:shadow-md transition-all duration-300">
            <Brain className="w-8 h-8 text-green-600 dark:text-green-400 mb-3 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">
              Advanced machine learning models trained on trusted medical data
            </p>
          </div>
          <div className="bg-[rgb(var(--muted))] backdrop-blur-md p-6 rounded-xl shadow-sm border border-[rgb(var(--border))] hover:shadow-md transition-all duration-300">
            <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Available 24/7</h3>
            <p className="text-sm text-muted-foreground">
              Get health guidance anytime, anywhere
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

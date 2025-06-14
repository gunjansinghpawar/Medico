"use client";

import { Bot, Languages, Brain, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] flex items-center justify-center bg-background text-foreground transition-colors duration-300"
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* Hero Badge & Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md mb-4">
            <Bot className="w-4 h-4 mr-2" />
            AI-Powered Medical Assistant
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-snug">
            Your Health, Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              AI Companion
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Get instant medical guidance in Hinglish. Our AI understands your health concerns and provides
            helpful suggestions for common conditions – from &quot;bukhar&quot; to &quot;pet mein dard.&quot;
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-sm border border-[rgb(var(--border))] hover:shadow-md transition-all duration-300">
            <Languages className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Hinglish Support</h3>
            <p className="text-sm text-muted-foreground">
              Natural conversation in Hindi and English mixed language
            </p>
          </div>
          <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-sm border border-[rgb(var(--border))] hover:shadow-md transition-all duration-300">
            <Brain className="w-8 h-8 text-green-600 dark:text-green-400 mb-3 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">
              Advanced ML models trained on medical datasets
            </p>
          </div>
          <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-sm border border-[rgb(var(--border))] hover:shadow-md transition-all duration-300">
            <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">24/7 Available</h3>
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

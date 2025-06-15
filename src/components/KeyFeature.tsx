"use client";

import React from "react";
import { ShieldCheck, Languages, Bot, HeartPulse } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted & Secure",
    description: "Your data is handled securely and anonymously. No tracking, just help.",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Languages,
    title: "Multi-language Support",
    description: "Ask questions in Hinglish, Hindi, English, or mix—our AI understands all.",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    icon: Bot,
    title: "Always On AI",
    description: "Available 24/7 to give instant help. No waiting, no appointments.",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: HeartPulse,
    title: "Tailored Suggestions",
    description: "Get remedies and advice specific to your symptoms, backed by health data.",
    iconColor: "text-red-600 dark:text-red-400",
  },
];

const KeyFeature = () => {
  return (
    <section className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-snug">
          Why Choose Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            AI Health Assistant
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Trusted technology, real-time answers, multilingual comfort and privacy-focused care – all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[rgb(var(--muted))] backdrop-blur-md p-6 rounded-2xl border border-[rgb(var(--border))] shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start space-x-5">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl bg-background border border-[rgb(var(--border))] shadow ${feature.iconColor}`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeature;

"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  Brain,
  FileText,
  Stethoscope,
  Heart,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Start Your Conversation",
    description:
      "Simply type your health question or describe your symptoms in natural language. Our AI understands context and medical terminology.",
    bg: "bg-[rgb(var(--muted))]",
    iconColor: "text-blue-500",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our advanced medical AI processes your input using trained models on verified medical literature and guidelines.",
    bg: "bg-[rgb(var(--muted))]",
    iconColor: "text-purple-500",
  },
  {
    icon: FileText,
    title: "Personalized Response",
    description:
      "Receive evidence-based information, potential causes, and actionable recommendations tailored to your specific situation.",
    bg: "bg-[rgb(var(--muted))]",
    iconColor: "text-green-500",
  },
  {
    icon: Stethoscope,
    title: "Professional Guidance",
    description:
      "Get recommendations on when to seek professional care and what questions to ask your healthcare provider.",
    bg: "bg-[rgb(var(--muted))]",
    iconColor: "text-red-500",
  },
];

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[rgb(var(--muted))]/20 text-[rgb(var(--foreground))] transition-colors"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-green-600 mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            How Our Health Chatbot{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
            Experience intelligent health guidance powered by advanced AI
            technology. Get personalized insights and evidence-based
            recommendations in seconds.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Your Journey to Better Health
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: activeIndex >= index ? 1 : 0.4, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div
                  className={`border-2 border-[rgb(var(--border))] rounded-2xl p-8 h-full shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.03] ${step.bg}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl bg-white shadow flex items-center justify-center ${step.iconColor}`}
                    >
                      <step.icon className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-medium text-[rgb(var(--muted-foreground))] bg-white px-3 py-1 rounded-full dark:bg-[rgb(var(--background))]/70 shadow-sm">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2 z-10">
                    <div className="w-10 h-10 bg-[rgb(var(--background))] rounded-full shadow-md flex items-center justify-center border border-[rgb(var(--border))]">
                      <ArrowRight className="w-5 h-5 text-[rgb(var(--muted-foreground))]" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

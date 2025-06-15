"use client";

import {
  MessageCircle,
  Brain,
  Heart,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const Features = () => {
  return (
    <section
      id="features"
      className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/20 dark:bg-muted/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Icon Above Section Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-green-600 mb-6 shadow">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience comprehensive health assistance with our advanced AI capabilities
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[rgb(var(--muted))] backdrop-blur-md p-8 rounded-2xl shadow-lg border border-[rgb(var(--border))] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
// Feature Data
const features = [
  {
    title: "Natural Conversations",
    description:
      "Talk to the AI naturally, just like you would to a friend. Describe your symptoms in plain English and get helpful responses instantly.",
    icon: MessageCircle,
    bg: "bg-blue-100 dark:bg-blue-900/20",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Smart Diagnosis",
    description:
      "AI-powered symptom analysis helps identify common conditions like viral fever, cold, headaches, and digestive issues.",
    icon: Brain,
    bg: "bg-green-100 dark:bg-green-900/20",
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Personalized Remedies",
    description:
      "Get tailored home remedies and self-care suggestions based on your symptoms and condition.",
    icon: Heart,
    bg: "bg-purple-100 dark:bg-purple-900/20",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Safety First",
    description:
      "Includes medical disclaimers and always recommends consulting a doctor for serious or unclear conditions.",
    icon: Shield,
    bg: "bg-orange-100 dark:bg-orange-900/20",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Instant Response",
    description:
      "Receive immediate answers and health guidance. Our AI processes your input in real time for fast support.",
    icon: Zap,
    bg: "bg-teal-100 dark:bg-teal-900/20",
    color: "text-teal-600 dark:text-teal-400",
  },
  {
    title: "Accessible Everywhere",
    description:
      "Use on any device, anytime. No need to install anything—just open your browser and start chatting.",
    icon: Globe,
    bg: "bg-indigo-100 dark:bg-indigo-900/20",
    color: "text-indigo-600 dark:text-indigo-400",
  },
];


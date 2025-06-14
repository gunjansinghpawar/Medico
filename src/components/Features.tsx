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
              className="bg-background/80 dark:bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-[rgb(var(--border))] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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
      "Communicate in Hinglish naturally. Ask 'mujhe bukhar hai' or 'stomach pain ho raha hai' and get instant understanding.",
    icon: MessageCircle,
    bg: "bg-blue-100 dark:bg-blue-900/20",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Smart Diagnosis",
    description:
      "AI-powered symptom analysis to predict common conditions like viral fever, cold, headaches, and digestive issues.",
    icon: Brain,
    bg: "bg-green-100 dark:bg-green-900/20",
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Personalized Remedies",
    description:
      "Get tailored home remedies and self-care suggestions based on your specific symptoms and condition.",
    icon: Heart,
    bg: "bg-purple-100 dark:bg-purple-900/20",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Safety First",
    description:
      "Always includes medical disclaimers and encourages consulting healthcare professionals for serious conditions.",
    icon: Shield,
    bg: "bg-orange-100 dark:bg-orange-900/20",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Instant Response",
    description:
      "Get immediate health guidance without waiting. Our AI processes your queries in real-time for quick assistance.",
    icon: Zap,
    bg: "bg-teal-100 dark:bg-teal-900/20",
    color: "text-teal-600 dark:text-teal-400",
  },
  {
    title: "Accessible Everywhere",
    description:
      "Web-based platform accessible on any device. No app downloads required – just open your browser and start chatting.",
    icon: Globe,
    bg: "bg-indigo-100 dark:bg-indigo-900/20",
    color: "text-indigo-600 dark:text-indigo-400",
  },
];

"use client";

import React from "react";
import { CheckCircle, Lock, Zap, Brain, Users } from "lucide-react";

const technologyList = [
    "HIPAA-compliant security protocols",
    "Continuous learning and improvement",
    "Multi-language support",
];

const statData = [
    { icon: Lock, label: "Encryption", value: "256-bit" },
    { icon: Zap, label: "Response Time", value: "< 3s" },
    { icon: Brain, label: "Accuracy Rate", value: "99.7%" },
    { icon: Users, label: "Users Helped", value: "1M+" },
];

const TechnologySection = () => {
    return (
        <section
            id="technology"
            className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/20 dark:bg-muted/10 text-foreground transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto bg-background/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-xl border border-[rgb(var(--border))]">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-foreground">
                            Powered by Advanced AI Technology
                        </h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Our health chatbot leverages cutting-edge natural language processing and machine learning models trained on extensive medical databases, clinical guidelines, and peer-reviewed research.
                        </p>

                        <ul className="space-y-4">
                            {technologyList.map((item, index) => (
                                <li key={index} className="flex items-center space-x-3">
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center border border-green-600 bg-green-900/30">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                    </div>
                                    <span className="text-sm sm:text-base text-foreground">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Grid Box */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl p-8 text-white">
                            <div className="grid grid-cols-2 gap-6">
                                {statData.map((stat, i) => (
                                    <Stat key={i} icon={stat.icon} label={stat.label} value={stat.value} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Reusable Stat Block
const Stat = ({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) => (
    <div className="text-center">
        <Icon className="w-10 h-10 mx-auto mb-2 opacity-90" />
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm opacity-80">{label}</div>
    </div>
);

export default TechnologySection;

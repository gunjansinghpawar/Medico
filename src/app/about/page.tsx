import React from 'react';
import { Heart, Target, Eye, Award, Users, Globe, Shield, Zap } from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: Shield,
            title: "Privacy First",
            description: "We believe healthcare information is deeply personal. Every interaction is encrypted and secure."
        },
        {
            icon: Heart,
            title: "Empathy-Driven",
            description: "Our AI is designed to understand not just symptoms, but the human experience behind them."
        },
        {
            icon: Zap,
            title: "Innovation",
            description: "We continuously push the boundaries of what's possible in AI-powered healthcare guidance."
        },
        {
            icon: Users,
            title: "Accessibility",
            description: "Quality health information should be available to everyone, everywhere, at any time."
        }
    ];

    // const milestones = [
    //     { year: "2020", title: "Company Founded", description: "Started with a vision to democratize healthcare information through AI" },
    //     { year: "2021", title: "First AI Model", description: "Launched our first medical AI trained on peer-reviewed literature" },
    //     { year: "2022", title: "1M Users", description: "Reached our first million users milestone with 99% satisfaction rate" },
    //     { year: "2023", title: "HIPAA Compliance", description: "Achieved full HIPAA compliance and enterprise-grade security" },
    //     { year: "2024", title: "Global Expansion", description: "Expanded to 50+ countries with multi-language support" },
    //     { year: "2025", title: "Advanced AI", description: "Launched next-generation AI with 99.7% accuracy rate" }
    // ];

    const stats = [
        { number: "10M+", label: "Conversations" },
        { number: "50+", label: "Countries" },
        { number: "99.7%", label: "Accuracy" },
        { number: "24/7", label: "Available" }
    ];

    return (
        <div className="pt-16 bg-background text-foreground">
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6">
                        About <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">HealthBot AI</span>
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                        We&#39;re on a mission to make quality healthcare guidance accessible to everyone through the power of artificial intelligence and evidence-based medicine.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-bold mb-2">{stat.number}</div>
                            <div className="">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="bg-background py-20">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <Target className="w-8 h-8 text-blue-600" />
                            <h2 className="text-3xl font-bold">Our Mission</h2>
                        </div>
                        <p className="text-lg leading-relaxed mb-8">
                            To democratize access to reliable health information by combining cutting-edge AI technology with evidence-based medical knowledge, empowering individuals to make informed decisions about their health.
                        </p>
                        <div className="flex items-center space-x-3 mb-6">
                            <Eye className="w-8 h-8 text-green-600" />
                            <h2 className="text-3xl font-bold">Our Vision</h2>
                        </div>
                        <p className="text-lg leading-relaxed">
                            A world where everyone has instant access to personalized, accurate health guidance, reducing health disparities and improving outcomes for communities worldwide.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-3xl p-12">
                        <div className="text-center text-white">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-green-600 mx-auto mb-6 flex items-center justify-center">
                                <Heart className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Healthcare for All</h3>
                            <p className="leading-relaxed">
                                We believe that quality healthcare guidance shouldn&#39;t be limited by geography, time zones, or economic barriers. Our AI makes expert-level health information available to anyone with an internet connection.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-6">Our Core Values</h2>
                    <p className="text-xl max-w-3xl mx-auto">The principles that guide everything we do</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="bg-background rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300">
                            <div className="flex items-start space-x-6">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                                    <value.icon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="leading-relaxed">{value.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Journey */}
            {/* <div className="bg-background py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
                        <p className="text-xl max-w-3xl mx-auto">From a simple idea to a global health platform</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {milestones.map((m, i) => (
                            <div key={i} className="flex items-start space-x-8 mb-12 last:mb-0">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-white font-bold">
                                        {m.year}
                                    </div>
                                </div>
                                <div className="bg-background border rounded-xl p-6 shadow-md flex-1">
                                    <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                                    <p className="leading-relaxed">{m.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* Technology Approach */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Our Technology Approach</h2>
                        <p className="text-lg leading-relaxed mb-8">
                            We combine state-of-the-art natural language processing with extensive medical databases to provide accurate, contextual health guidance. Our AI is trained on peer-reviewed medical literature and continuously updated with the latest research.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Evidence-based responses from peer-reviewed sources",
                                "Continuous learning and model improvement",
                                "Multi-language support and cultural sensitivity",
                                "HIPAA-compliant security and privacy protection"
                            ].map((point, idx) => (
                                <div key={idx} className="flex items-center space-x-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <Award className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl p-12 text-white">
                        <div className="text-center">
                            <Globe className="w-16 h-16 mx-auto mb-6 opacity-80" />
                            <h3 className="text-2xl font-bold mb-4">Global Impact</h3>
                            <p className="mb-8 leading-relaxed text-blue-100">
                                Our platform serves users across 50+ countries, providing health guidance in multiple languages and adapting to local healthcare contexts.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold mb-1">10M+</div>
                                    <div className="text-sm opacity-80">Health Questions Answered</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold mb-1">50+</div>
                                    <div className="text-sm opacity-80">Languages Supported</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Awards */}
            <div className="bg-background py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">Awards & Recognition</h2>
                        <p className="text-xl max-w-3xl mx-auto">
                            Recognized by industry leaders and healthcare organizations worldwide
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { color: "text-blue-600", title: "Best AI Healthcare Solution 2024", org: "Healthcare Innovation Awards" },
                            { color: "text-green-600", title: "Digital Health Pioneer", org: "World Health Tech Summit" },
                            { color: "text-purple-600", title: "Top 10 Health Startups", org: "TechCrunch Disrupt" }
                        ].map((item, i) => (
                            <div key={i} className="text-center p-8 bg-background rounded-2xl border shadow-sm">
                                <Award className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p>{item.org}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

'use client';

import React from 'react';
import { Linkedin, Twitter, Mail, Award, Users, Heart, Globe } from 'lucide-react';
import Image from 'next/image';

const Team = () => {
    const leadership = [
        {
            name: "Dr. Sarah Johnson",
            role: "CEO & Co-Founder",
            bio: "Former Chief Medical Officer at Stanford Health. 15+ years in digital health innovation. MD from Harvard Medical School, MBA from Wharton.",
            image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400",
            linkedin: "#",
            twitter: "#",
            email: "sarah@healthchatbot.com",
            achievements: ["Forbes 30 Under 30", "Digital Health Pioneer Award", "Published 50+ Research Papers"]
        },
        {
            name: "Michael Chen",
            role: "CTO & Co-Founder",
            bio: "Former Principal Engineer at Google AI. Expert in machine learning and natural language processing. PhD in Computer Science from MIT.",
            image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
            linkedin: "#",
            twitter: "#",
            email: "michael@healthchatbot.com",
            achievements: ["AI Excellence Award", "10+ Patents in ML", "TechCrunch Disrupt Winner"]
        },
        {
            name: "Dr. Emily Rodriguez",
            role: "Chief Medical Officer",
            bio: "Board-certified physician with expertise in preventive medicine. Former Director of Digital Health at Mayo Clinic. MD from Johns Hopkins.",
            image: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400",
            linkedin: "#",
            twitter: "#",
            email: "emily@healthchatbot.com",
            achievements: ["Medical Innovation Award", "Healthcare Leadership Recognition", "Author of 3 Medical Books"]
        },
        {
            name: "David Kim",
            role: "VP of Engineering",
            bio: "Former Senior Director at Amazon Web Services. 12+ years building scalable healthcare platforms. MS in Computer Science from Stanford.",
            image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
            linkedin: "#",
            twitter: "#",
            email: "david@healthchatbot.com",
            achievements: ["AWS Innovation Award", "Cloud Architecture Expert", "Open Source Contributor"]
        }
    ];

    const values = [
        {
            icon: Heart,
            title: "Patient-First",
            description: "Every decision we make prioritizes patient safety and well-being above all else."
        },
        {
            icon: Users,
            title: "Collaborative",
            description: "We believe the best healthcare solutions come from diverse perspectives working together."
        },
        {
            icon: Award,
            title: "Excellence",
            description: "We maintain the highest standards in everything we do, from code to clinical accuracy."
        },
        {
            icon: Globe,
            title: "Global Impact",
            description: "Our mission is to make quality healthcare guidance accessible to everyone, everywhere."
        }
    ];

    return (
        <div className="bg-background text-foreground">
            {/* Hero */}
            <div className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6">
                        Meet Our <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Team</span>
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                        We&apos;re a diverse team of medical professionals, AI researchers, and engineers united by our mission to democratize healthcare through technology.
                    </p>
                </div>

                {/* Leadership */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {leadership.map((leader, index) => (
                        <div key={index} className="bg-muted border rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                                <div className="relative w-[200px] h-[200px] flex-shrink-0">
                                    <Image
                                        src={leader.image}
                                        alt={leader.name}
                                        className="rounded-2xl object-cover"
                                        layout="fill"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                                        <Award className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-bold mb-2">{leader.name}</h3>
                                    <div className="text-primary font-semibold mb-4">{leader.role}</div>
                                    <p className="leading-relaxed mb-6">{leader.bio}</p>
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-2">Key Achievements:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {leader.achievements.map((achievement, achIndex) => (
                                                <span key={achIndex} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                                    {achievement}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-center md:justify-start space-x-4">
                                        <a href={leader.linkedin} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a href={leader.twitter} className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-300">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a href={`mailto:${leader.email}`} className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-300">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Company Values */}
            <div className="bg-muted py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">Our Values</h2>
                        <p className="text-xl max-w-3xl mx-auto">
                            The principles that guide our work and shape our culture
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-background rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start space-x-6">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0">
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
            </div>

            {/* Call To Action */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Join Our Mission</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Help us build the future of healthcare AI. We&apos;re always looking for passionate individuals who want to make a difference in global health.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300">
                            View Open Positions
                        </button>
                        <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                            Learn About Our Culture
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;

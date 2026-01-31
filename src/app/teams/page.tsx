'use client';

import React, { useState } from 'react';
import { Linkedin, Twitter, Mail, Award, Users, Heart, Globe, Code, Brain, Zap, Palette } from 'lucide-react';
import Image from 'next/image';

const Team = () => {

    const leadership = [
        {
            name: "Mr. Gunjan Singh Pawar",
            role: "Full Stack Developer & Founder",
            bio: "The visionary architect behind Medico AI. A passionate Full Stack Developer who built the entire platform from the ground up, integrating advanced AI with healthcare solutions.",
            detailedBio: "With over 8 years of experience in full-stack development and AI integration, Gunjan has led the technical vision of Medico AI. His expertise spans cloud infrastructure, machine learning pipelines, and scalable architecture design. He holds a degree in Computer Science and has contributed to healthcare tech innovations that have impacted thousands of patients.",
            image: "/gunjan.jpeg",
            linkedin: "https://www.linkedin.com/in/gunjansinghpawar",
            twitter: "https://twitter.com/gunjansinghpawar",
            email: "gunjansinghpawar@gmail.com",
            achievements: ["Full Stack Architecture", "AI Integration Specialist", "Project Lead"],
            specialties: ["React & Node.js", "AI/ML Integration", "System Design", "Cloud Infrastructure"],
            yearsExp: "8+"
        },
        {
            name: "Ms. Suhani Kapadiya",
            role: "Frontend Developer & Contributor",
            bio: "Talented Frontend Developer contributing to the sleek user interface and seamless user experience of Medico. Dedicated to creating responsive and accessible web designs.",
            detailedBio: "Suhani brings 6 years of frontend expertise, specializing in creating accessible and delightful user experiences. She's passionate about modern web technologies and has a strong focus on performance optimization and design systems. Her work has earned recognition for innovation in healthcare UI/UX.",
            image: "/suhani.jpeg",
            linkedin: "https://www.linkedin.com/in/suhani-kapadiya",
            twitter: "#",
            email: "suhanikapadiya@gmail.com",
            achievements: ["UI/UX Design", "React Specialist", "Responsive Layouts"],
            specialties: ["React & Next.js", "Tailwind CSS", "Figma Design", "Accessibility (WCAG)"],
            yearsExp: "6"
        },
        {
            name: "Ms. Vidhi Goswami",
            role: "Frontend Developer & Contributor",
            bio: "Creative Frontend Developer focused on component modularity and visual aesthetics. Played a key role in styling and optimizing the frontend performance.",
            detailedBio: "Vidhi is a detail-oriented developer with a passion for clean code and performant applications. With 5 years of experience, she has built reusable component libraries and optimized applications for production scale. Her focus on accessibility ensures that Medico AI is usable for everyone.",
            image: "/vidhi.jpeg",
            linkedin: "https://www.linkedin.com/in/vidhi-goswami",
            twitter: "#",
            email: "vidhigoswami@gmail.com",
            achievements: ["Component Library", "Performance Optimization", "Clean Code Enthusiast"],
            specialties: ["Vue & React", "Component Architecture", "Performance Tuning", "Testing"],
            yearsExp: "5"
        },
        {
            name: "Ms. Mariya Mir",
            role: "Frontend Developer & Contributor",
            bio: "Skilled Frontend Developer and open source contributor. Brings expertise in modern web technologies and collaborative development to the Medico team.",
            detailedBio: "Mariya is a passionate open-source contributor with 4 years of professional development experience. She excels at collaborative development and mentoring junior developers. Her contributions span full-stack features and her focus on code quality has elevated the entire team's standards.",
            image: "/mariya.jpeg",
            linkedin: "https://www.linkedin.com/in/mariya-mir",
            twitter: "#",
            email: "mariyamir@gmail.com",
            achievements: ["Modern Web Tech", "Collaboration", "Dynamic Interfaces"],
            specialties: ["TypeScript", "UI Animation", "Git Workflow", "DevOps"],
            yearsExp: "4"
        }
    ];

    const teams = [
        {
            name: "Development Team",
            description: "Building the future of healthcare technology",
            icon: Code,
            color: "from-blue-500 to-cyan-500",
            members: "4 engineers",
            focus: "Full-stack development, AI integration, and scalable architecture"
        },
        {
            name: "AI & Research",
            description: "Pioneering medical AI solutions",
            icon: Brain,
            color: "from-purple-500 to-pink-500",
            members: "Research focused",
            focus: "Machine learning models, clinical validation, healthcare data science"
        },
        {
            name: "Product & Design",
            description: "Creating intuitive healthcare experiences",
            icon: Palette,
            color: "from-green-500 to-emerald-500",
            members: "Design excellence",
            focus: "User experience, accessibility, healthcare compliance design"
        }
    ];

    const values = [
        {
            icon: Heart,
            title: "Patient-First",
            description: "Every decision we make prioritizes patient safety and well-being above all else.",
            expandedDescription: "We believe that technology should enhance human care, not replace it. Our designs are centered on real patient needs and medical professional workflows."
        },
        {
            icon: Users,
            title: "Collaborative",
            description: "We believe the best healthcare solutions come from diverse perspectives working together.",
            expandedDescription: "Cross-functional teams, open communication, and respect for different viewpoints drive our innovation and ensure comprehensive solutions."
        },
        {
            icon: Award,
            title: "Excellence",
            description: "We maintain the highest standards in everything we do, from code to clinical accuracy.",
            expandedDescription: "Quality is non-negotiable. We invest in testing, code reviews, clinical validation, and continuous improvement across all departments."
        },
        {
            icon: Globe,
            title: "Global Impact",
            description: "Our mission is to make quality healthcare guidance accessible to everyone, everywhere.",
            expandedDescription: "We're building for global scale and accessibility, supporting multiple languages, currencies, and healthcare systems around the world."
        }
    ];

    return (
        <div className="bg-background text-foreground transition-colors duration-300">
            {/* Enhanced Navigation Background */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 z-50"></div>

            {/* Hero Section - Enhanced */}
            <div className="relative overflow-hidden pt-24 pb-16">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-pulse animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-pulse animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-block mb-8">
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-400/10 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-400/30">
                                OUR TEAM
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            Meet The Visionaries <br />
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 dark:from-blue-400 dark:via-purple-400 dark:to-green-400 bg-clip-text text-transparent">
                                Behind Medico AI
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-muted-foreground mb-8">
                            A world-class team of medical professionals, AI researchers, and full-stack engineers united by a singular mission: to democratize quality healthcare through intelligent technology.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">4+</div>
                                <div className="text-sm text-muted-foreground">Core Team Members</div>
                            </div>
                            <div className="hidden sm:block text-muted-foreground">|</div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">35+</div>
                                <div className="text-sm text-muted-foreground">Years Combined Experience</div>
                            </div>
                            <div className="hidden sm:block text-muted-foreground">|</div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400">∞</div>
                                <div className="text-sm text-muted-foreground">Impact on Global Health</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leadership Profiles - Enhanced */}
            <div className="container mx-auto px-6 py-20">
                <div className="mb-16">
                    <h2 className="text-4xl font-bold mb-4">Leadership Team</h2>
                    <p className="text-muted-foreground text-lg">Experts dedicated to revolutionizing healthcare</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {leadership.map((leader, index) => (
                        <div
                            key={index}
                            className="group relative bg-card text-card-foreground border border-border rounded-3xl p-8 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            {/* Background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-transparent dark:from-blue-600/10 dark:via-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row gap-8 mb-8">
                                    {/* Profile Image */}
                                    <div className="relative flex-shrink-0">
                                        <div className="relative w-[180px] h-[180px] rounded-2xl overflow-hidden border-2 border-muted group-hover:border-blue-500 transition-colors duration-300">
                                            <Image
                                                src={leader.image}
                                                alt={leader.name}
                                                className="w-full h-full object-cover"
                                                width={500}
                                                height={500}
                                                unoptimized
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center border-4 border-background group-hover:border-muted transition-colors">
                                            <Award className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="mb-4">
                                            <h3 className="text-3xl font-bold mb-2">{leader.name}</h3>
                                            <div className="inline-block">
                                                <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">{leader.role}</span>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <p className="text-muted-foreground leading-relaxed">{leader.bio}</p>
                                        </div>

                                        {/* Experience Badge */}
                                        <div className="inline-block bg-muted px-4 py-2 rounded-lg mb-6">
                                            <span className="text-foreground text-sm">
                                                <span className="font-bold text-blue-600 dark:text-blue-400">{leader.yearsExp}</span> years of experience
                                            </span>
                                        </div>

                                        {/* Specialties */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold mb-3">Core Specialties</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {leader.specialties.map((specialty, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800"
                                                    >
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Key Achievements */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold mb-3">Key Achievements</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {leader.achievements.map((achievement, achIdx) => (
                                                    <span
                                                        key={achIdx}
                                                        className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-full text-xs font-medium border border-green-200 dark:border-green-800"
                                                    >
                                                        <Zap className="w-3 h-3" />
                                                        {achievement}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div className="flex gap-3 pt-6 border-t border-border">
                                            <a
                                                href={leader.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-[#0077b5] rounded-full flex items-center justify-center text-white hover:shadow-lg hover:brightness-110 transition-all duration-300 hover:scale-110"
                                                title="LinkedIn"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                            {leader.twitter !== "#" && (
                                                <a
                                                    href={leader.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:shadow-lg hover:brightness-110 transition-all duration-300 hover:scale-110"
                                                    title="Twitter"
                                                >
                                                    <Twitter className="w-5 h-5" />
                                                </a>
                                            )}
                                            <a
                                                href={`mailto:${leader.email}`}
                                                className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:brightness-110 transition-all duration-300 hover:scale-110"
                                                title="Email"
                                            >
                                                <Mail className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Bio - Toggle on hover */}
                                <div className="pt-6 border-t border-border mt-6 max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-300">
                                    <h4 className="font-semibold mb-3">Background</h4>
                                    <p className="text-muted-foreground leading-relaxed">{leader.detailedBio}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Departments */}
            <div className="bg-muted/30 border-y border-border py-20">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Teams</h2>
                        <p className="text-muted-foreground text-lg">Specialized expertise in healthcare and technology</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {teams.map((team, index) => {
                            const IconComponent = team.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-card text-card-foreground border border-border rounded-2xl p-8 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${team.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{team.name}</h3>
                                    <p className="text-muted-foreground mb-4">{team.description}</p>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-foreground"><span className="font-semibold text-blue-600 dark:text-blue-400">{team.members}</span></p>
                                        <p className="text-muted-foreground">{team.focus}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Company Values */}
            <div className="py-20">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-muted-foreground text-lg">The principles that guide our work and shape our culture</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {values.map((value, index) => {
                            const IconComponent = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-card text-card-foreground border border-border rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-transparent dark:from-blue-600/5 dark:via-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-start gap-6 mb-6">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                                <IconComponent className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                                                <p className="text-muted-foreground">{value.description}</p>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-border max-h-0 overflow-hidden group-hover:max-h-48 transition-all duration-300">
                                            <p className="text-muted-foreground leading-relaxed">{value.expandedDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Culture & Work Environment */}
            <div className="bg-muted/30 border-y border-border py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-8">Why Join Medico AI?</h2>
                            <div className="space-y-6">
                                {[
                                    { icon: Heart, color: "from-green-500 to-emerald-500", title: "Mission-Driven Work", desc: "Make a tangible impact on global healthcare outcomes every single day." },
                                    { icon: Users, color: "from-blue-500 to-cyan-500", title: "Collaborative Culture", desc: "Work with world-class engineers and healthcare professionals who challenge and inspire you." },
                                    { icon: Brain, color: "from-purple-500 to-pink-500", title: "Cutting-Edge Technology", desc: "Work with the latest AI/ML technologies, cloud infrastructure, and modern development practices." },
                                    { icon: Zap, color: "from-yellow-500 to-orange-500", title: "Growth Opportunities", desc: "Continuous learning and professional development in a fast-growing healthcare AI company." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                                            <item.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-2">{item.title}</h4>
                                            <p className="text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-pulse"></div>
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-pulse animation-delay-2000"></div>

                            <div className="relative bg-card border border-border rounded-3xl p-12 shadow-xl">
                                <div className="space-y-8">
                                    <div>
                                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
                                        <p className="text-muted-foreground">Remote-Friendly Work Environment</p>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
                                        <p className="text-muted-foreground">Support for Professional Growth</p>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">Unlimited</div>
                                        <p className="text-muted-foreground">Learning & Development Budget</p>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">Flexible</div>
                                        <p className="text-muted-foreground">Work Hours & Time Off Policy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Timeline/Milestones */}
            <div className="py-20">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
                        <p className="text-muted-foreground text-lg">Key milestones in building Medico AI</p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>

                        <div className="space-y-12">
                            {[
                                { year: "2020", title: "Founded", desc: "Gunjan Singh Pawar founded Medico AI with a vision to revolutionize healthcare through AI" },
                                { year: "2021", title: "First Milestone", desc: "Assembled core team of talented developers and healthcare professionals" },
                                { year: "2022", title: "Beta Launch", desc: "Launched beta version with initial user testing and clinical validation" },
                                { year: "2023", title: "Scale Up", desc: "Expanded team and infrastructure, reached 100,000+ users" },
                                { year: "2024", title: "Global Expansion", desc: "Extended platform to support multiple healthcare systems worldwide" },
                            ].map((milestone, idx) => (
                                <div key={idx} className={`flex ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                    <div className="w-full md:w-1/2 px-6">
                                        <div className="bg-card border border-border rounded-2xl p-8 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 relative">
                                            {/* Connector point */}
                                            <div className={`hidden md:block absolute top-1/2 w-4 h-4 rounded-full border-4 border-background bg-blue-600 z-10 ${idx % 2 === 0 ? '-left-12 -translate-x-[2px]' : '-right-12 translate-x-[2px]'} -translate-y-1/2`}></div>
                                            
                                            <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{milestone.year}</span>
                                            <h3 className="text-2xl font-bold mt-2 mb-3">{milestone.title}</h3>
                                            <p className="text-muted-foreground">{milestone.desc}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Mobile/Tablet Connector */}
                                    <div className="md:hidden w-8 flex flex-col items-center justify-center relative"> 
                                         <div className="w-4 h-4 rounded-full border-2 border-background bg-blue-600 z-10"></div>
                                    </div>
                                    <div className="md:hidden w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Call To Action */}
            <div className="relative overflow-hidden py-20">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30 animate-pulse animation-delay-2000"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 border border-blue-500/30 rounded-3xl p-16 text-center backdrop-blur-sm shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission</h2>
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                            We&apos;re building the future of healthcare AI and we&apos;d love to have you on our team. If you&apos;re passionate about technology and making a difference in global health, let&apos;s talk.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                                View Open Positions
                            </button>
                            <button className="bg-background/80 border-2 border-border hover:border-blue-500 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm">
                                Learn About Our Culture
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;
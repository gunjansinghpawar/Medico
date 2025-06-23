'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { Home, Search, ArrowLeft, Stethoscope, Heart } from 'lucide-react';

const NotFound: React.FC = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div className="min-h-screen mt-20 flex items-center justify-center px-4 bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors">
            <div className="max-w-7xl mx-auto text-center">
                {/* Animated Logo */}
                <div className="mb-12">
                    <div className="flex items-center justify-center space-x-3 group mb-8">
                        <div className="bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--primary))] p-3 rounded-xl shadow-md animate-bounce">
                            <Stethoscope className="h-8 w-8 text-[rgb(var(--primary-foreground))]" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--primary))] bg-clip-text text-transparent group-hover:animate-pulse transition">
                                Medico
                                <span className="text-lg ml-1 text-[rgb(var(--muted-foreground))] font-medium">
                                    AI
                                </span>
                            </h1>
                            <p className="text-sm text-[rgb(var(--muted-foreground))] font-medium leading-none">
                                Medical Healthbot
                            </p>
                        </div>
                    </div>
                </div>

                {/* 404 Animation */}
                <div className="relative mb-12">
                    <div className={`transition-all duration-1000 ${animate ? 'opacity-100 transform translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="text-9xl font-bold text-[rgb(var(--muted-foreground))] mb-4 relative">
                            4
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-16 h-16 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--primary))] rounded-full flex items-center justify-center animate-spin">
                                    <Heart className="h-8 w-8 text-[rgb(var(--primary-foreground))] animate-pulse" />
                                </div>
                            </div>
                            4
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-0 left-1/4 animate-float">
                        <div className="w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
                    </div>
                    <div className="absolute top-1/4 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
                        <div className="w-3 h-3 bg-green-400 rounded-full opacity-60"></div>
                    </div>
                    <div className="absolute bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
                        <div className="w-5 h-5 bg-purple-400 rounded-full opacity-60"></div>
                    </div>
                </div>

                {/* Content */}
                <div className={`transition-all duration-1000 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl font-bold mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-xl text-[rgb(var(--muted-foreground))] mb-8 max-w-lg mx-auto">
                        It looks like the page you&apos;re looking for has taken a sick day.
                        Don&apos;t worry, our AI health bot is still here to help!
                    </p>

                    {/* Pulse Animation */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--primary))] rounded-full flex items-center justify-center">
                                <Search className="h-10 w-10 text-[rgb(var(--primary-foreground))]" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--primary))] rounded-full animate-ping opacity-20"></div>
                            <div className="absolute inset-2 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--primary))] rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/"
                            className="bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--primary))] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                        >
                            <Home className="h-5 w-5" />
                            <span>Back to Home</span>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="bg-transparent text-[rgb(var(--foreground))] px-8 py-4 rounded-lg font-semibold border-2 border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition-all duration-200 flex items-center space-x-2"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Go Back</span>
                        </button>
                    </div>

                    {/* Help Text */}
                    <div className="mt-12 p-6 rounded-lg shadow-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))]">
                        <h3 className="text-lg font-semibold mb-3">Need Medical Assistance?</h3>
                        <p className="text-[rgb(var(--muted-foreground))] mb-4">
                            Even though this page isn&apos;t available, our AI health bot is ready to help with your health questions 24/7.
                        </p>
                        <Link
                            href="/"
                            className="text-[rgb(var(--accent))] hover:text-blue-500 font-medium underline"
                        >
                            Start a health consultation →
                        </Link>
                    </div>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-8 text-xs text-[rgb(var(--muted-foreground))] max-w-md mx-auto">
                    <p>
                        Remember: For medical emergencies, call 911 immediately.
                        Our AI provides general health information and should not replace professional medical advice.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default NotFound;

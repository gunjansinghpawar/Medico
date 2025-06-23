'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import AuthFooter from '@/components/AuthFooter';
import AuthHeader from '@/components/AuthHeader';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        subscribeNewsletter: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Signup attempt:', formData);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Signup failed');
            }

            router.push('/');
            const data = await response.json();
            console.log('Signup successful:', data);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                agreeToTerms: false,
                subscribeNewsletter: true
            });

        } catch (error) {
            console.error('Signup error:', error);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const benefits = [
        "24/7 access to AI health guidance",
        "Personalized health recommendations",
        "Secure, HIPAA-compliant platform",
        "Evidence-based medical information",
        "Multi-language support",
        "No ads or data selling"
    ];

    return (
        <>
            <AuthHeader />
            <div className="pt-16 min-h-screen bg-background text-foreground">
                <div className="container mx-auto px-6 py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Side - Benefits */}
                            <div className="lg:pr-8">
                                <div className="text-center lg:text-left mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-600 mb-4">
                                        <Heart className="w-8 h-8 text-white" />
                                    </div>
                                    <h1 className="text-4xl font-bold mb-4">
                                        Join HealthBot AI
                                    </h1>
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        Start your journey to better health with AI-powered guidance trusted by millions worldwide.
                                    </p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="text-foreground">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 border border-blue-100">
                                    <h3 className="text-lg font-bold mb-2">
                                        Free Forever Plan
                                    </h3>
                                    <p className="mb-4">
                                        Get started with unlimited basic health consultations at no cost.
                                    </p>
                                    <div className="text-sm">
                                        No credit card required • Cancel anytime
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Signup Form */}
                            <div className="bg-background rounded-2xl shadow-xl border p-8">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
                                    <p className="text-muted-foreground">Join millions who trust HealthBot AI</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Fields */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                                                First Name
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                                                    placeholder="First name"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                                                placeholder="Last name"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-semibold mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                                                placeholder="Create a password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
                                                placeholder="Confirm your password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Checkboxes */}
                                    <div className="space-y-3">
                                        <label className="flex items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                name="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleChange}
                                                required
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                                            />
                                            <span className="text-sm text-foreground">
                                                I agree to the{' '}
                                                <Link href="/terms-and-condition" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                                                    Terms of Service
                                                </Link>{' '}
                                                and{' '}
                                                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                                                    Privacy Policy
                                                </Link>
                                            </span>
                                        </label>

                                        <label className="flex items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                name="subscribeNewsletter"
                                                checked={formData.subscribeNewsletter}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                                            />
                                            <span className="text-sm text-foreground">
                                                Send me health tips and product updates (optional)
                                            </span>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                                    >
                                        <span>Create Account</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="my-6 flex items-center">
                                    <div className="flex-1 border-t border-gray-300"></div>
                                    <span className="px-4 text-sm text-muted-foreground">or</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>

                                {/* Social Signup */}
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-muted transition-all duration-300">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span className="text-foreground font-medium">Sign up with Google</span>
                                    </button>
                                </div>

                                {/* Login Link */}
                                <div className="mt-6 text-center">
                                    <p className="text-muted-foreground">
                                        Already have an account?{' '}
                                        <Link
                                            href="/login"
                                            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300"
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AuthFooter />
        </>
    );
};

export default Signup;

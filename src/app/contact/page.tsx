'use client';
import React, { useState } from 'react';
import {
    Mail,
    Phone,
    MessageCircle,
    // MapPin,
    // Clock,
    Send,
    ExternalLink,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email Support',
            description: 'Get detailed responses to your questions',
            contact: 'support@healthchatbot.com',
            action: 'Send Email',
            available: 'Response within 24 hours',
            href: 'mailto:support@healthchatbot.com'
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: 'Speak with our support team',
            contact: '+916356316676',
            action: 'Call Now',
            available: 'Mon-Fri, 9AM-6PM PST',
            href: 'tel:+916356316676'
        },
        {
            icon: MessageCircle,
            title: 'Live Chat',
            description: 'Instant support through our chat system',
            contact: 'Available 24/7',
            action: 'Start Chat',
            available: 'Average response: 2 minutes',
            href: '/live-chat'
        }
    ];

    // const offices = [
    //     {
    //         city: 'San Francisco',
    //         address: '123 Health Tech Boulevard\nSan Francisco, CA 94105',
    //         phone: '+1 (555) 123-4567',
    //         email: 'sf@healthchatbot.com',
    //         hours: 'Mon - Fri: 9AM - 6PM PST'
    //     },
    //     {
    //         city: 'New York',
    //         address: '456 Medical Innovation Ave\nNew York, NY 10001',
    //         phone: '+1 (555) 234-5678',
    //         email: 'ny@healthchatbot.com',
    //         hours: 'Mon - Fri: 9AM - 6PM EST'
    //     },
    //     {
    //         city: 'London',
    //         address: '789 Healthcare Square\nLondon, UK EC1A 1BB',
    //         phone: '+44 20 1234 5678',
    //         email: 'london@healthchatbot.com',
    //         hours: 'Mon - Fri: 9AM - 5PM GMT'
    //     }
    // ];

    const faqs = [
        {
            question: 'How accurate is HealthBot AI?',
            answer:
                'Our AI maintains a 99.7% accuracy rate, trained on peer-reviewed medical literature and continuously updated with the latest research.'
        },
        {
            question: 'Is my health information secure?',
            answer:
                'Yes, we use 256-bit encryption and are fully HIPAA compliant. Your conversations are never stored or shared.'
        },
        {
            question: 'Can HealthBot AI replace my doctor?',
            answer:
                'No, HealthBot AI is designed to complement, not replace, professional medical care. Always consult healthcare professionals for serious concerns.'
        },
        {
            question: 'What languages do you support?',
            answer:
                'We currently support 50+ languages and are continuously adding more to serve our global user base.'
        }
    ];

    return (
        <div className="pt-16 bg-background text-foreground">

            {/* Title */}
            <div className="text-center mb-16 container mx-auto px-6 py-20">
                <h1 className="text-5xl font-bold mb-6">
                    Get in{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                        Touch
                    </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Have questions about HealthBot AI? Our support team is here to help you get the most out of your AI health assistant experience.
                </p>
                {/* Contact Form + FAQ Section */}
                <div className="bg-background py-20">
                    <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="border border-gray-200 rounded-3xl p-10 shadow-lg bg-background">
                            <h2 className="text-3xl font-bold mb-6 text-center">Send Us a Message</h2>

                            {isSubmitted && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <span className="text-green-800">Thank you! Your message has been sent successfully.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name *"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name *"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                />

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-background"
                                >
                                    <option value="general">General Inquiry</option>
                                    <option value="technical">Technical Support</option>
                                    <option value="billing">Billing Question</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="press">Press Inquiry</option>
                                </select>

                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject *"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                />

                                <textarea
                                    name="message"
                                    rows={6}
                                    placeholder="Your Message *"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition flex items-center justify-center"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* FAQ Section */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-center lg:text-left mb-4">Frequently Asked Questions</h2>
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-background border p-6 rounded-xl shadow-sm">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-lg">{faq.question}</h3>
                                            <p className="text-muted-foreground mt-1">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Methods */}
            <div className="container mx-auto px-6 mb-20 grid lg:grid-cols-3 gap-8">
                {contactMethods.map((method, index) => (
                    <div
                        key={index}
                        className="bg-background text-foreground border rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mx-auto mb-6">
                            <method.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-center">{method.title}</h3>
                        <p className="text-muted-foreground text-center mb-3">{method.description}</p>
                        <div className="text-center font-semibold mb-1">{method.contact}</div>
                        <div className="text-sm text-muted-foreground text-center mb-4">{method.available}</div>
                        <a
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-xl text-center hover:from-blue-700 hover:to-green-700 transition"
                        >
                            {method.action} <ExternalLink className="inline-block ml-2 w-4 h-4" />
                        </a>
                    </div>
                ))}
            </div>
            {/* Offices Section */}
            {/* <div className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Our Global Offices</h2>
                    <p className="text-lg text-muted-foreground">Find a location near you and get in touch directly.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {offices.map((office, index) => (
                        <div key={index} className="bg-background border rounded-2xl p-8 shadow-md hover:shadow-xl transition space-y-4">
                            <h3 className="text-xl font-bold">{office.city}</h3>
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                                <p className="whitespace-pre-line text-muted-foreground">{office.address}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-muted-foreground" />
                                <span className="text-muted-foreground">{office.phone}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-muted-foreground" />
                                <span className="text-muted-foreground">{office.email}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="w-5 h-5 text-muted-foreground" />
                                <span className="text-muted-foreground">{office.hours}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}


        </div>
    );
};

export default Contact;

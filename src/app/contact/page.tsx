'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      href: 'mailto:support@healthchatbot.com',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our support team',
      contact: '+916356316676',
      action: 'Call Now',
      available: 'Mon-Fri, 9AM-6PM PST',
      href: 'tel:+916356316676',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Instant support through our chat system',
      contact: 'Available 24/7',
      action: 'Start Chat',
      available: 'Average response: 2 minutes',
      href: '/live-chat',
    },
  ];

  const faqs = [
    {
      question: 'How accurate is HealthBot AI?',
      answer:
        'Our AI maintains a 99.7% accuracy rate, trained on peer-reviewed medical literature and continuously updated with the latest research.',
    },
    {
      question: 'Is my health information secure?',
      answer:
        'Yes, we use 256-bit encryption and are fully HIPAA compliant. Your conversations are never stored or shared.',
    },
    {
      question: 'Can HealthBot AI replace my doctor?',
      answer:
        'No, HealthBot AI is designed to complement, not replace, professional medical care. Always consult healthcare professionals for serious concerns.',
    },
    {
      question: 'What languages do you support?',
      answer:
        'We currently support 50+ languages and are continuously adding more to serve our global user base.',
    },
  ];

  return (
    <div className="pt-16 bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors">

      {/* Title Section */}
      <div className="text-center mb-16 container mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-6">
          Get in{' '}
          <span className="bg-gradient-to-r from-[rgb(0,132,255)] to-[rgb(34,197,94)] bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
          Have questions about HealthBot AI? Our support team is here to help you get the most out of your AI health assistant experience.
        </p>

        {/* Form & FAQ Grid */}
        <div className="py-20">
          <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div className="border border-[rgb(var(--border))] rounded-3xl p-10 shadow-lg bg-[rgb(var(--background))]">
              <h2 className="text-3xl font-bold mb-6 text-center">Send Us a Message</h2>

              {isSubmitted && (
                <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-100 rounded-xl p-4 mb-6 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6" />
                  <span>Thank you! Your message has been sent successfully.</span>
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
                    className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-[rgb(var(--accent))]"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-[rgb(var(--accent))]"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-[rgb(var(--accent))]"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-[rgb(var(--accent))]"
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
                  className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-[rgb(var(--accent))]"
                />

                <textarea
                  name="message"
                  rows={6}
                  placeholder="Your Message *"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-xl resize-none bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-[rgb(var(--accent))]"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[rgb(0,132,255)] to-[rgb(34,197,94)] text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* FAQ */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center lg:text-left mb-4">Frequently Asked Questions</h2>
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[rgb(var(--background))] border border-[rgb(var(--border))] p-6 rounded-xl shadow-sm">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-[rgb(var(--accent))] mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{faq.question}</h3>
                      <p className="text-[rgb(var(--muted-foreground))] mt-1">{faq.answer}</p>
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
            className="bg-[rgb(var(--background))] text-[rgb(var(--foreground))] border border-[rgb(var(--border))] rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[rgb(0,132,255)] to-[rgb(34,197,94)] flex items-center justify-center mx-auto mb-6">
              <method.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">{method.title}</h3>
            <p className="text-[rgb(var(--muted-foreground))] text-center mb-3">{method.description}</p>
            <div className="text-center font-semibold mb-1">{method.contact}</div>
            <div className="text-sm text-[rgb(var(--muted-foreground))] text-center mb-4">{method.available}</div>
            <a
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block bg-gradient-to-r from-[rgb(0,132,255)] to-[rgb(34,197,94)] text-white font-semibold py-3 px-6 rounded-xl text-center hover:from-blue-700 hover:to-green-700 transition"
            >
              {method.action} <ExternalLink className="inline-block ml-2 w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;

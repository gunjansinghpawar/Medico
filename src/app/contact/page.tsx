'use client'
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
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
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses to your questions",
      contact: "support@healthchatbot.com",
      action: "Send Email",
      available: "Response within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our support team",
      contact: "+1 (555) 123-4567",
      action: "Call Now",
      available: "Mon-Fri, 9AM-6PM PST"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant support through our chat system",
      contact: "Available 24/7",
      action: "Start Chat",
      available: "Average response: 2 minutes"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Health Tech Boulevard\nSan Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "sf@healthchatbot.com"
    },
    {
      city: "New York",
      address: "456 Medical Innovation Ave\nNew York, NY 10001",
      phone: "+1 (555) 234-5678",
      email: "ny@healthchatbot.com"
    },
    {
      city: "London",
      address: "789 Healthcare Square\nLondon, UK EC1A 1BB",
      phone: "+44 20 1234 5678",
      email: "london@healthchatbot.com"
    }
  ];

  const faqs = [
    {
      question: "How accurate is HealthBot AI?",
      answer: "Our AI maintains a 99.7% accuracy rate, trained on peer-reviewed medical literature and continuously updated with the latest research."
    },
    {
      question: "Is my health information secure?",
      answer: "Yes, we use 256-bit encryption and are fully HIPAA compliant. Your conversations are never stored or shared."
    },
    {
      question: "Can HealthBot AI replace my doctor?",
      answer: "No, HealthBot AI is designed to complement, not replace, professional medical care. Always consult healthcare professionals for serious concerns."
    },
    {
      question: "What languages do you support?",
      answer: "We currently support 50+ languages and are continuously adding more to serve our global user base."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about HealthBot AI? Our support team is here to help you 
            get the most out of your AI health assistant experience.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6 flex items-center justify-center">
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {method.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {method.description}
              </p>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {method.contact}
              </div>
              <div className="text-sm text-gray-500 mb-6">
                {method.available}
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>{method.action}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we&#39;ll get back to you within 24 hours.
              </p>
            </div>

            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-green-800">Thank you! Your message has been sent successfully.</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-12">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership</option>
                  <option value="press">Press Inquiry</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us more about your question or concern..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Offices</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit us at one of our global locations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {offices.map((office, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{office.city}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-600 whitespace-pre-line">{office.address}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div className="text-gray-600">{office.phone}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div className="text-gray-600">{office.email}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Office Hours */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-white text-center">
          <Clock className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-3xl font-bold mb-4">Office Hours</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="font-semibold mb-2">San Francisco</div>
              <div className="opacity-90">Monday - Friday: 9:00 AM - 6:00 PM PST</div>
            </div>
            <div>
              <div className="font-semibold mb-2">New York</div>
              <div className="opacity-90">Monday - Friday: 9:00 AM - 6:00 PM EST</div>
            </div>
            <div>
              <div className="font-semibold mb-2">London</div>
              <div className="opacity-90">Monday - Friday: 9:00 AM - 5:00 PM GMT</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about HealthBot AI
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-600 leading-relaxed ml-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

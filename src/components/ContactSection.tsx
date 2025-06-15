"use client";

import React from "react";
import {
  ExternalLink,
  Send,
  MapPin,
  Clock,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "For detailed inquiries or follow-ups, email us anytime.",
    contact: "support@medico.ai",
    action: "Send Email",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Reach out for immediate assistance during office hours.",
    contact: "+1 (888) 123-4567",
    action: "Call Now",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our assistant anytime for quick responses.",
    contact: "Available 24/7",
    action: "Start Chat",
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/20 dark:bg-muted/10 transition-colors duration-300 text-foreground"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about our health chatbot? Our support team is here
            to help you get the most out of your AI health assistant experience.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-background/80 dark:bg-white/5 p-8 rounded-2xl shadow-md border border-[rgb(var(--border))] hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6 flex items-center justify-center">
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{method.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {method.description}
              </p>
              <div className="text-lg font-semibold mb-6">{method.contact}</div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>{method.action}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-background p-12 rounded-3xl shadow-xl border border-[rgb(var(--border))] mb-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Send Us a Message</h3>
              <p className="text-muted-foreground">
                Fill out the form below and we&#39;ll get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="First Name" id="firstName" placeholder="Enter your first name" />
                <Input label="Last Name" id="lastName" placeholder="Enter your last name" />
              </div>
              <Input label="Email Address" id="email" type="email" placeholder="Enter your email" />
              <Input label="Subject" id="subject" placeholder="What's this about?" />
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-xl bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition"
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

        {/* Office Info */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Visit Our Office</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Headquarters</div>
                    <div className="opacity-90">
                      123 Health Tech Boulevard
                      <br />
                      San Francisco, CA 94105
                      <br />
                      United States
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Office Hours</div>
                    <div className="opacity-90">
                      Monday - Friday: 9:00 AM - 6:00 PM PST
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h4 className="text-xl font-bold mb-4">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { label: "Support Available", value: "24/7" },
                  { label: "Response Time", value: "< 1hr" },
                  { label: "Satisfaction Rate", value: "98%" },
                  { label: "Languages", value: "50+" },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Input
const Input = ({
  label,
  id,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-xl bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
    />
  </div>
);

export default ContactSection;

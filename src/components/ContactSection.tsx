"use client";

import React from "react";
import {
  ExternalLink,
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
    href: "mailto:support@medico.ai",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Reach out for immediate assistance during office hours.",
    contact: "+91 6356316676",
    action: "Call Now",
    href: "tel:+916356316676",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our assistant anytime for quick responses.",
    contact: "Available 24/7",
    action: "Start Chat",
    href: "/chat",
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
        <div className="grid lg:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-[rgb(var(--muted))] p-8 rounded-2xl shadow-md border border-[rgb(var(--border))] hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6 flex items-center justify-center">
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{method.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {method.description}
              </p>
              <div className="text-lg font-semibold mb-6">{method.contact}</div>
              <a
                href={method.href}
                className="w-full block bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>{method.action}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

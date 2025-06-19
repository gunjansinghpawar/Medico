'use client'
import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, Clock, Shield, Heart } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

   const faqs = [
    {
      question: "How accurate is the Medico Health Bot?",
      answer: "Our AI health bot is trained on extensive medical literature and databases, but it's important to understand that it provides general health information, not medical diagnosis. While we strive for accuracy, the bot should never replace professional medical advice. For specific health concerns, always consult with a qualified healthcare provider."
    },
    {
      question: "Is my health information secure and private?",
      answer: "Yes, we take your privacy very seriously. We are fully HIPAA compliant and use industry-standard encryption to protect your health information. Your data is never shared with third parties without your explicit consent, and we implement strict access controls and security measures to safeguard your information."
    },
    {
      question: "Can the health bot diagnose medical conditions?",
      answer: "No, the Medico Health Bot cannot and does not provide medical diagnoses. It provides general health information, symptom guidance, and educational content. For any medical diagnosis or treatment, you must consult with a licensed healthcare professional. The bot is designed to complement, not replace, professional medical care."
    },
    {
      question: "What should I do in a medical emergency?",
      answer: "If you're experiencing a medical emergency, call 911 immediately or go to your nearest emergency room. Do not use the health bot for emergency situations. The bot is not designed to handle emergencies and cannot provide immediate medical intervention. For urgent but non-emergency situations, contact your healthcare provider or an urgent care facility."
    },
    {
      question: "How do I create an account?",
      answer: "Creating an account is simple and free. Click the 'Sign Up' button on our homepage, provide your email address and create a secure password. You'll receive a confirmation email to verify your account. Once verified, you can start using all features of the Medico Health Bot."
    },
    {
      question: "Can I use the health bot for my children?",
      answer: "Parents can use the health bot to get general information about children's health topics. However, for any specific concerns about your child's health, always consult with a pediatrician or family doctor. The bot provides general information and cannot replace professional pediatric care."
    },
    {
      question: "How often is the health information updated?",
      answer: "Our AI health bot is regularly updated with the latest medical research and clinical guidelines. We continuously review and update our knowledge base to ensure the information provided is current and accurate. However, medical knowledge is constantly evolving, so we recommend verifying information with healthcare professionals for important decisions."
    },
    {
      question: "Can I delete my account and data?",
      answer: "Yes, you have full control over your account and data. You can delete your account at any time through your account settings, or by contacting our support team. When you delete your account, all your personal information and chat history will be permanently removed from our systems in accordance with our privacy policy."
    },
    {
      question: "What languages does the health bot support?",
      answer: "Currently, the Medico Health Bot primarily supports English. We are working on expanding language support to serve a broader global community. If you need assistance in another language, please contact our support team, and we'll do our best to help you."
    },
    {
      question: "How much does it cost to use the health bot?",
      answer: "Basic access to the Medico Health Bot is free and includes general health information and basic symptom guidance. We also offer premium features with more detailed insights and personalized recommendations. Check our pricing page for current subscription options and features."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen mt-20 py-12 bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-[rgb(var(--accent))] mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-[rgb(var(--muted-foreground))]">
            Find answers to common questions about Medico Health Bot
          </p>
        </div>

        {/* Search */}
        <div className="rounded-lg shadow-lg p-6 mb-8 bg-[rgb(var(--muted))]">
          <div className="relative">
            <Search className="h-5 w-5 text-[rgb(var(--muted-foreground))] absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for help topics..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:ring-2 focus:ring-[rgb(var(--accent))] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Chat Now */}
          <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-[rgb(var(--muted))]">
            <MessageCircle className="h-8 w-8 text-[rgb(var(--accent))] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Start Chatting</h3>
            <p className="text-[rgb(var(--muted-foreground))] mb-4">Begin a conversation with our AI health bot</p>
            <button className="bg-[rgb(var(--accent))] text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
              Chat Now
            </button>
          </div>

          {/* Email */}
          <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-[rgb(var(--muted))]">
            <Mail className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-[rgb(var(--muted-foreground))] mb-4">Get help via email from our support team</p>
            <a
              href="mailto:support@medicobot.com"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-block"
            >
              Send Email
            </a>
          </div>

          {/* Phone */}
          <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-[rgb(var(--muted))]">
            <Phone className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
            <p className="text-[rgb(var(--muted-foreground))] mb-4">Speak directly with our support team</p>
            <a
              href="tel:+1-800-MEDICO"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-block"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Support Hours */}
        <div className="p-6 rounded-lg mb-8 bg-[rgb(var(--muted))] border-l-4 border-[rgb(var(--accent))]">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-[rgb(var(--accent))] mr-2" />
            <h3 className="text-lg font-semibold">Support Hours</h3>
          </div>
          <p className="text-[rgb(var(--muted-foreground))]">
            Our AI health bot is available 24/7. Human support is available:
            <br />
            <strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM EST
            <br />
            <strong>Saturday - Sunday:</strong> 10:00 AM - 6:00 PM EST
          </p>
        </div>

        {/* FAQ */}
        <div className="rounded-lg shadow-lg p-8 bg-[rgb(var(--muted))]">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="border rounded-lg border-[rgb(var(--border))]">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[rgb(var(--background))] transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-[rgb(var(--muted-foreground))]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[rgb(var(--muted-foreground))]" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-[rgb(var(--border))] pt-4">
                      <p className="leading-relaxed text-[rgb(var(--muted-foreground))]">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-lg text-[rgb(var(--muted-foreground))]">No FAQs found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Warnings */}
        <div className="mt-8 space-y-4">
          <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-400 dark:border-red-600 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <Heart className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Medical Emergency</h3>
            </div>
            <p className="text-red-700 dark:text-red-200">
              If you're experiencing a medical emergency, call 911 immediately. Do not use our health bot for emergency situations.
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300">Medical Disclaimer</h3>
            </div>
            <p className="text-yellow-700 dark:text-yellow-200">
              Our AI health bot provides general health information and should not replace professional medical advice.
              Always consult with a healthcare provider for medical concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

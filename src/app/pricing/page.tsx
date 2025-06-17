'use client'
import React, { useState } from 'react';
import { Check, X, Star, Zap, Crown, Heart, ArrowRight, HelpCircle } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      icon: Heart,
      price: { monthly: 0, annual: 0 },
      description: "Perfect for basic health guidance and occasional consultations",
      features: [
        "5 health consultations per month",
        "Basic symptom assessment",
        "General health information",
        "Email support",
        "Mobile app access"
      ],
      limitations: [
        "Limited consultation history",
        "No priority support",
        "No advanced features"
      ],
      popular: false,
      cta: "Get Started Free",
      color: "border-gray-200"
    },
    {
      name: "Pro",
      icon: Zap,
      price: { monthly: 19, annual: 15 },
      description: "Ideal for individuals who want comprehensive health guidance",
      features: [
        "Unlimited health consultations",
        "Advanced symptom analysis",
        "Personalized health reports",
        "Priority support",
        "Health trend tracking",
        "Family account (up to 4 members)",
        "Voice interface access",
        "Offline consultation history"
      ],
      limitations: [],
      popular: true,
      cta: "Start Pro Trial",
      color: "border-blue-500 ring-2 ring-blue-500"
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: { monthly: "Custom", annual: "Custom" },
      description: "For healthcare organizations and large teams",
      features: [
        "Everything in Pro",
        "Custom AI model training",
        "API access and integrations",
        "White-label solutions",
        "Dedicated account manager",
        "Custom security controls",
        "Advanced analytics dashboard",
        "24/7 phone support",
        "SLA guarantees"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales",
      color: "border-purple-500"
    }
  ];

  const faqs = [
    {
      question: "Is the free plan really free forever?",
      answer: "Yes! Our free plan includes 5 health consultations per month with no time limit. You can use it as long as you want."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely. You can cancel your subscription at any time with no cancellation fees. Your plan will remain active until the end of your billing period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers."
    },
    {
      question: "Is my health data secure?",
      answer: "Yes, we use 256-bit encryption and are fully HIPAA compliant. Your conversations are never stored and are processed in real-time."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll provide a full refund."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle."
    }
  ];

  const addOns = [
    {
      name: "Priority Support",
      price: "$5/month",
      description: "Get priority email and chat support with faster response times"
    },
    {
      name: "Advanced Analytics",
      price: "$10/month",
      description: "Detailed health insights and trend analysis with exportable reports"
    },
    {
      name: "Telehealth Integration",
      price: "$15/month",
      description: "Connect with licensed healthcare providers for video consultations"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose the plan that fits your health needs. Start free and upgrade anytime. 
            No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-3xl p-8 shadow-lg border-2 ${plan.color} ${plan.popular ? 'transform scale-105' : ''} hover:shadow-xl transition-all duration-300 relative`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  plan.name === 'Free' ? 'bg-gray-100' :
                  plan.name === 'Pro' ? 'bg-gradient-to-r from-blue-600 to-green-600' :
                  'bg-gradient-to-r from-purple-600 to-pink-600'
                }`}>
                  <plan.icon className={`w-8 h-8 ${plan.name === 'Free' ? 'text-gray-600' : 'text-white'}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  {typeof plan.price.monthly === 'number' ? (
                    <>
                      <div className="text-4xl font-bold text-gray-900">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                        <span className="text-lg text-gray-500 font-normal">/month</span>
                      </div>
                      {isAnnual && plan.price.monthly > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          Billed annually ({typeof plan.price.annual === 'number' ? `$${plan.price.annual * 12}/year` : plan.price.annual})
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-4xl font-bold text-gray-900">{plan.price.monthly}</div>
                  )}
                </div>

                <button className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700'
                    : 'border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                }`}>
                  {plan.cta}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">What&#39;s included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start space-x-3">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">30-day money-back guarantee</span>
          </div>
        </div>
      </div>

      {/* Add-ons */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Add-ons & Extras</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your HealthBot AI experience with these optional add-ons
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{addon.name}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-4">{addon.price}</div>
                  <p className="text-gray-600 mb-6">{addon.description}</p>
                  <button className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                    Add to Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enterprise Features */}
      <div className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Enterprise Solutions
              </h2>
              <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                Scale HealthBot AI across your organization with custom features, 
                dedicated support, and enterprise-grade security controls.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="w-6 h-6 text-purple-200" />
                  <span>Custom AI model training for your use case</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-6 h-6 text-purple-200" />
                  <span>White-label solutions with your branding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-6 h-6 text-purple-200" />
                  <span>Advanced security and compliance controls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-6 h-6 text-purple-200" />
                  <span>Dedicated customer success manager</span>
                </div>
              </div>
              <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-purple-50 transition-all duration-300 flex items-center space-x-2">
                <span>Contact Sales Team</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Enterprise Benefits</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">99.9%</div>
                  <div className="text-sm opacity-80">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-sm opacity-80">Phone Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Custom</div>
                  <div className="text-sm opacity-80">Integrations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">SOC 2</div>
                  <div className="text-sm opacity-80">Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
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

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions who trust HealthBot AI for reliable health guidance. 
            Start with our free plan and upgrade when you&#39;re ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
import React from 'react';
import { 
  MessageCircle, 
  Shield, 
  Brain, 
  Clock, 
  CheckCircle, 
  Users, 
  Stethoscope,
  FileText,
  Lock,
  Zap,
  Globe,
  Smartphone,
  BarChart3,
  Heart,
  Search,
  BookOpen,
  AlertTriangle,
  Headphones
} from 'lucide-react';

const Features = () => {
  const coreFeatures = [
    {
      icon: MessageCircle,
      title: "Natural Language Processing",
      description: "Communicate with our AI in plain English. Describe your symptoms naturally, and get personalized health guidance.",
      benefits: ["Understands medical terminology", "Context-aware responses", "Multi-language support"]
    },
    {
      icon: Brain,
      title: "Advanced AI Analysis",
      description: "Our AI processes your health queries using machine learning models trained on vast medical databases.",
      benefits: ["99.7% accuracy rate", "Evidence-based responses", "Continuous learning"]
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your health data is protected with enterprise-grade security and HIPAA compliance.",
      benefits: ["256-bit encryption", "No data storage", "HIPAA compliant"]
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Get instant health guidance anytime, anywhere. No appointments, no waiting rooms.",
      benefits: ["Instant responses", "Global availability", "No scheduling needed"]
    }
  ];

  const advancedFeatures = [
    {
      icon: Stethoscope,
      title: "Symptom Assessment",
      description: "Comprehensive symptom analysis with personalized recommendations and urgency levels.",
      color: "bg-red-50 border-red-200 text-red-600"
    },
    {
      icon: FileText,
      title: "Health Reports",
      description: "Detailed health summaries and recommendations you can share with your healthcare provider.",
      color: "bg-blue-50 border-blue-200 text-blue-600"
    },
    {
      icon: Search,
      title: "Medical Information",
      description: "Access to comprehensive medical information from trusted, peer-reviewed sources.",
      color: "bg-green-50 border-green-200 text-green-600"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Detection",
      description: "Automatic detection of emergency situations with immediate guidance to seek care.",
      color: "bg-yellow-50 border-yellow-200 text-yellow-600"
    },
    {
      icon: BarChart3,
      title: "Health Tracking",
      description: "Monitor your health trends and receive personalized insights over time.",
      color: "bg-purple-50 border-purple-200 text-purple-600"
    },
    {
      icon: BookOpen,
      title: "Health Education",
      description: "Learn about health conditions, treatments, and prevention strategies.",
      color: "bg-indigo-50 border-indigo-200 text-indigo-600"
    }
  ];

  const platformFeatures = [
    {
      icon: Smartphone,
      title: "Multi-Platform Access",
      description: "Available on web, mobile apps, and through API integrations."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Supporting 50+ languages and culturally sensitive health guidance."
    },
    {
      icon: Headphones,
      title: "Voice Interface",
      description: "Speak your health questions naturally with voice recognition."
    },
    {
      icon: Users,
      title: "Family Accounts",
      description: "Manage health guidance for your entire family in one account."
    }
  ];

  const comparisonFeatures = [
    {
      feature: "24/7 Availability",
      healthbot: true,
      traditional: false,
      telehealth: "Limited"
    },
    {
      feature: "Instant Responses",
      healthbot: true,
      traditional: false,
      telehealth: false
    },
    {
      feature: "No Appointment Needed",
      healthbot: true,
      traditional: false,
      telehealth: false
    },
    {
      feature: "Evidence-Based Information",
      healthbot: true,
      traditional: true,
      telehealth: true
    },
    {
      feature: "Cost",
      healthbot: "Free/Low",
      traditional: "High",
      telehealth: "Medium"
    },
    {
      feature: "Privacy",
      healthbot: "Maximum",
      traditional: "Standard",
      telehealth: "Standard"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Features</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how HealthBot AI combines cutting-edge technology with medical expertise 
            to provide you with intelligent, personalized health guidance.
          </p>
        </div>

        {/* Feature Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">99.7%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{'< 3s'}</div>
            <div className="text-gray-600">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Available</div>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Core Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The foundation of intelligent health guidance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Advanced Capabilities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sophisticated tools for comprehensive health management
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {advancedFeatures.map((feature, index) => (
            <div key={index} className={`${feature.color.split(' ')[0]} ${feature.color.split(' ')[1]} border-2 rounded-2xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className={`w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center mb-6 ${feature.color.split(' ')[2]}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Features */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accessible anywhere, anytime, on any device
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How We Compare</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how HealthBot AI stacks up against traditional healthcare options
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">HealthBot AI</th>
                  <th className="px-6 py-4 text-center font-semibold">Traditional Care</th>
                  <th className="px-6 py-4 text-center font-semibold">Telehealth</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.healthbot === 'boolean' ? (
                        row.healthbot ? (
                          <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-red-100 mx-auto flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                          </div>
                        )
                      ) : (
                        <span className="text-green-600 font-semibold">{row.healthbot}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.traditional === 'boolean' ? (
                        row.traditional ? (
                          <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-red-100 mx-auto flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                          </div>
                        )
                      ) : (
                        <span className="text-gray-600">{row.traditional}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.telehealth === 'boolean' ? (
                        row.telehealth ? (
                          <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-red-100 mx-auto flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                          </div>
                        )
                      ) : (
                        <span className="text-yellow-600">{row.telehealth}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Security & Compliance
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your health data is protected with the highest security standards
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <Lock className="w-16 h-16 mx-auto mb-6 text-white opacity-80" />
              <h3 className="text-xl font-bold text-white mb-4">256-bit Encryption</h3>
              <p className="text-blue-100">
                Military-grade encryption protects all your health conversations and data.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <Shield className="w-16 h-16 mx-auto mb-6 text-white opacity-80" />
              <h3 className="text-xl font-bold text-white mb-4">HIPAA Compliant</h3>
              <p className="text-blue-100">
                Full compliance with healthcare privacy regulations and standards.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <Zap className="w-16 h-16 mx-auto mb-6 text-white opacity-80" />
              <h3 className="text-xl font-bold text-white mb-4">Zero Data Storage</h3>
              <p className="text-blue-100">
                Your conversations are processed in real-time and never stored.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="bg-gray-50 rounded-3xl p-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Experience the Future of Healthcare
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions who trust HealthBot AI for reliable, instant health guidance. 
            Start your journey to better health today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300">
              Try HealthBot AI Free
            </button>
            <button className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
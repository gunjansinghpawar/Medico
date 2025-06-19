import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--background))] py-12 text-[rgb(var(--foreground))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-[rgb(var(--accent))] mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-[rgb(var(--muted-foreground))]">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 rounded-lg bg-[rgb(var(--muted))]">
                <Lock className="h-8 w-8 text-[rgb(var(--accent))] mx-auto mb-3" />
                <h3 className="font-semibold">HIPAA Compliant</h3>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-2">
                  Your health data is protected under strict HIPAA guidelines
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-[rgb(var(--muted))]">
                <Eye className="h-8 w-8 text-[rgb(var(--primary))] mx-auto mb-3" />
                <h3 className="font-semibold">Transparent</h3>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-2">
                  Clear information about how we collect and use your data
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-[rgb(var(--muted))]">
                <UserCheck className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold">Your Control</h3>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-2">
                  You have full control over your personal information
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>

              {[
                {
                  title: 'Personal Information',
                  items: [
                    'Name, email address, and contact information',
                    'Account credentials and preferences',
                    'Profile information you choose to provide',
                  ],
                },
                {
                  title: 'Health Information',
                  items: [
                    'Symptoms and health concerns you share with our AI',
                    'Medical history relevant to your inquiries',
                    'Interaction data from your conversations with our health bot',
                  ],
                },
                {
                  title: 'Technical Information',
                  items: [
                    'Device information and browser details',
                    'IP address and location data',
                    'Usage patterns and interaction logs',
                  ],
                },
              ].map((section, idx) => (
                <div
                  key={idx}
                  className="bg-[rgb(var(--background))] border border-[rgb(var(--border))] p-6 rounded-lg mb-4"
                >
                  <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                  <ul className="list-disc pl-6 space-y-2 text-[rgb(var(--foreground))]">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Service Provision',
                    items: [
                      'Provide personalized health guidance',
                      'Improve AI responses and accuracy',
                      'Maintain your account and preferences',
                    ],
                  },
                  {
                    title: 'Communication',
                    items: [
                      'Send important service updates',
                      'Respond to your inquiries',
                      'Provide customer support',
                    ],
                  },
                ].map((block, idx) => (
                  <div
                    key={idx}
                    className="bg-[rgb(var(--muted))] border border-[rgb(var(--border))] p-6 rounded-lg"
                  >
                    <h3 className="text-lg font-semibold mb-3">{block.title}</h3>
                    <ul className="list-disc pl-6 space-y-2 text-[rgb(var(--foreground))]">
                      {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* HIPAA Compliance */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. HIPAA Compliance</h2>
              <div className="bg-[rgb(var(--muted))] border-l-4 border-[rgb(var(--accent))] p-6 rounded-lg">
                <p className="mb-4">
                  Medico Health Bot is fully compliant with the Health Insurance Portability and Accountability Act (HIPAA). We implement comprehensive safeguards to protect your health information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Administrative Safeguards:</strong> Designated privacy officers and staff training</li>
                  <li><strong>Physical Safeguards:</strong> Secure facilities and workstation access controls</li>
                  <li><strong>Technical Safeguards:</strong> Encryption, access controls, and audit logs</li>
                  <li><strong>Business Associate Agreements:</strong> All vendors sign HIPAA-compliant agreements</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
              <div className="bg-red-50 dark:bg-red-950 border-l-4 border-red-400 dark:border-red-600 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">We Do NOT Share Your Health Information</h3>
                <p>
                  Your health information is never sold, rented, or shared with third parties for marketing purposes. We only share information when:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Required by law or legal process</li>
                  <li>To prevent serious harm to health or safety</li>
                  <li>With your explicit written consent</li>
                  <li>With HIPAA-compliant business associates who help us provide our services</li>
                </ul>
              </div>
            </section>

            {/* Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Encryption', desc: 'All data is encrypted both in transit and at rest using industry-standard AES-256 encryption.' },
                  { title: 'Access Controls', desc: 'Strict access controls ensure only authorized personnel can access your information.' },
                  { title: 'Regular Audits', desc: 'We conduct regular security audits and vulnerability assessments.' },
                  { title: 'Incident Response', desc: '24/7 monitoring with immediate response to any security incidents.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[rgb(var(--background))] p-6 rounded-lg border border-[rgb(var(--border))]">
                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <div className="bg-[rgb(var(--muted))] p-6 rounded-lg">
                <p className="mb-4">Under HIPAA and other privacy laws, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request copies of your health information</li>
                  <li><strong>Amendment:</strong> Request corrections to your health information</li>
                  <li><strong>Restriction:</strong> Request restrictions on how we use your information</li>
                  <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                  <li><strong>Notification:</strong> Be notified of any breaches affecting your information</li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to improve your experience. For detailed information about our cookie usage, please see our{' '}
                <a href="/cookies" className="text-[rgb(var(--accent))] underline hover:text-blue-800">Cookie Policy</a>.
              </p>
            </section>

            {/* International */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
              <p>
                Your information is primarily stored and processed in the United States. If you are located outside the US, please note that we transfer, store, and process your information in the US where our servers are located and our central database operates.
              </p>
            </section>

            {/* Children */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-6 rounded-lg">
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </div>
            </section>

            {/* Changes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
              <div className="bg-[rgb(var(--muted))] p-6 rounded-lg">
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Privacy Officer:</strong> privacy@medicobot.com</p>
                  <p><strong>Phone:</strong> 1-800-MEDICO (1-800-633-4261)</p>
                  <p><strong>Address:</strong> Medico Health Bot, 123 Health Tech Drive, Medical City, MC 12345</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

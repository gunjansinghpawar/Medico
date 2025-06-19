import React from 'react';
import { FileText, AlertTriangle, Shield, Gavel } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
  const today = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen py-12 bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8">
          <div className="text-center mb-12">
            <FileText className="h-16 w-16 text-[rgb(var(--accent))] mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-xl text-[rgb(var(--muted-foreground))]">
              Last updated: {today}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Important Disclaimer */}
            <div className="bg-red-50 dark:bg-red-950 border-l-4 border-red-400 p-6 rounded-lg mb-8">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Important Medical Disclaimer</h3>
                  <p className="text-red-700 dark:text-red-200">
                    Medico Health Bot is not a substitute for professional medical advice, diagnosis, or treatment. 
                    Always seek the advice of your physician or other qualified healthcare provider with any questions 
                    you may have regarding a medical condition.
                  </p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <Section title="1. Acceptance of Terms">
              <p>
                By accessing and using Medico Health Bot (&quot;the Service&quot;), you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
              <p>
                These Terms and Conditions constitute a legally binding agreement between you and Medico Health Bot.
              </p>
            </Section>

            <Section title="2. Service Description">
              <div className="bg-[rgb(var(--muted))] p-6 rounded-lg">
                <p>Medico Health Bot provides:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-powered health information and educational content</li>
                  <li>Symptom assessment tools and health guidance</li>
                  <li>General wellness information and resources</li>
                  <li>Health-related questions and answers</li>
                </ul>
                <p className="mt-4 font-semibold">
                  Our Service does NOT provide medical diagnosis, treatment, or professional medical advice.
                </p>
              </div>
            </Section>

            <Section title="3. Medical Limitations and Disclaimers">
              <DisclaimerBox title="Not a Medical Device">
                Medico Health Bot is not a medical device and is not intended to diagnose, treat, cure, or prevent any disease.
              </DisclaimerBox>
              <DisclaimerBox title="Emergency Situations">
                If you are experiencing a medical emergency, call 911 immediately. Do not use our Service for emergency situations.
              </DisclaimerBox>
              <DisclaimerBox title="Accuracy Limitations">
                While we strive for accuracy, our AI may make mistakes or provide incomplete information.
              </DisclaimerBox>
            </Section>

            <Section title="4. User Responsibilities">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box title="Appropriate Use">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the Service for informational purposes only</li>
                    <li>Provide accurate information</li>
                    <li>Respect limitations of our AI</li>
                    <li>Seek professional medical advice</li>
                  </ul>
                </Box>
                <Box title="Prohibited Activities">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Using for emergencies</li>
                    <li>Attempting to hack or misuse</li>
                    <li>Sharing false info</li>
                    <li>Violating laws</li>
                  </ul>
                </Box>
              </div>
            </Section>

            <Section title="5. Account and Data">
              <Box title="Account Security">
                You are responsible for maintaining the confidentiality of your credentials.
              </Box>
              <Box title="Data Accuracy">
                You agree to provide accurate and current information.
              </Box>
            </Section>

            <Section title="6. Privacy and Data Protection">
              <div className="flex items-start p-6 rounded-lg bg-[rgb(var(--muted))]">
                <Shield className="h-6 w-6 text-[rgb(var(--accent))] mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p>
                    Your privacy is important to us. We are committed to HIPAA compliance and protecting your health data.
                  </p>
                </div>
              </div>
            </Section>

            <Section title="7. Intellectual Property">
              <Box title="Our Content">
                All platform content is owned and protected under copyright laws.
              </Box>
              <Box title="Your Content">
                You retain ownership of your content. We use it only to improve our services.
              </Box>
            </Section>

            <Section title="8. Limitation of Liability">
              <div className="bg-[rgb(var(--muted))] p-6 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Medical complications</li>
                  <li>Delays in treatment</li>
                  <li>AI-based misdiagnosis</li>
                </ul>
              </div>
            </Section>

            <Section title="9. Indemnification">
              You agree to indemnify and hold harmless Medico Health Bot from all claims resulting from your use of the Service.
            </Section>

            <Section title="10. Service Availability">
              <Box>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We may modify or suspend the Service anytime</li>
                  <li>Downtime might occur due to updates</li>
                </ul>
              </Box>
            </Section>

            <Section title="11. Termination">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Box title="Your Right to Terminate">
                  You may delete your account anytime.
                </Box>
                <Box title="Our Right to Terminate">
                  We may suspend or terminate accounts for violations.
                </Box>
              </div>
            </Section>

            <Section title="12. Governing Law and Disputes">
              <div className="flex items-start p-6 rounded-lg bg-[rgb(var(--muted))]">
                <Gavel className="h-6 w-6 text-[rgb(var(--accent))] mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p>
                    These Terms are governed by California law and resolved via arbitration.
                  </p>
                </div>
              </div>
            </Section>

            <Section title="13. Changes to Terms">
              <p>
                We reserve the right to update these terms at any time. Continued use indicates acceptance.
              </p>
            </Section>

            <Section title="14. Contact Information">
              <div className="p-6 bg-[rgb(var(--muted))] rounded-lg">
                <p>Email: legal@medicobot.com</p>
                <p>Phone: 1-800-MEDICO</p>
                <p>Address: 123 Health Tech Drive, Medical City, MC 12345</p>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="space-y-4 text-[rgb(var(--foreground))]">{children}</div>
  </section>
);

const Box: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[rgb(var(--muted))] p-6 rounded-lg">
    {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
    <div className="text-[rgb(var(--muted-foreground))]">{children}</div>
  </div>
);

const DisclaimerBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[rgb(var(--muted))] p-6 rounded-lg">
    <h3 className="text-lg font-semibold mb-3 text-[rgb(var(--foreground))]">{title}</h3>
    <p className="text-[rgb(var(--muted-foreground))]">{children}</p>
  </div>
);

export default TermsAndConditions;

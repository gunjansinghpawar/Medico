'use client';
import React from 'react';
import { Cookie, Settings, BarChart, Target, Wrench } from 'lucide-react';
import { useCookies } from '@/context/CookieContext';
const CookiePolicy: React.FC = () => {
    const { openPreferences } = useCookies();
    return (
        <div className="min-h-screen w-full py-12 mt-20 px-4 bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
            <div className="max-w-7xl mx-auto">
                <div className="p-8">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <Cookie className="h-16 w-16 text-[rgb(var(--accent))] mx-auto mb-4" />
                        <h1 className="text-4xl font-bold mb-2">Cookie Policy</h1>
                        <p className="text-xl opacity-70">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    {/* What Are Cookies */}
                    <Section title="What Are Cookies?">
                        <div className="p-6 rounded-lg bg-[rgb(var(--muted))] text-[rgb(var(--foreground))]">
                            <p className="mb-4">
                                Cookies are small text files stored on your device when you visit our website.
                                They help us improve your experience by remembering preferences and tracking usage securely.
                            </p>
                            <p>We comply with HIPAA to ensure your health information remains safe and private.</p>
                        </div>
                    </Section>

                    {/* Types of Cookies */}
                    <Section title="Types of Cookies We Use">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cookieTypes.map(({ title, icon, desc, examples }, i) => (
                                <div key={i} className="p-6 rounded-lg bg-[rgb(var(--muted))] border border-[rgb(var(--border))]">
                                    <div className="flex items-center mb-3 space-x-2">
                                        {icon}
                                        <h3 className="text-lg font-semibold">{title}</h3>
                                    </div>
                                    <p className="mb-3">{desc}</p>
                                    <div className="bg-white dark:bg-[rgb(var(--background))] p-4 rounded border border-[rgb(var(--border))]">
                                        <h4 className="font-semibold mb-2">Examples:</h4>
                                        <ul className="text-sm opacity-80 space-y-1">
                                            {examples.map((ex, i) => (
                                                <li key={i}>• {ex}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* How We Use Cookies */}
                    <Section title="How We Use Cookies">
                        <div className="space-y-6">
                            {cookieUsage.map(({ title, points }, i) => (
                                <div key={i} className="border p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-3">{title}</h3>
                                    <ul className="list-disc pl-6 space-y-2 opacity-80">
                                        {points.map((pt, i) => (
                                            <li key={i}>{pt}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* HIPAA */}
                    <Section title="HIPAA Compliance">
                        <div className="p-6 rounded-lg border-l-4 border-[rgb(var(--accent))] bg-[rgb(var(--muted))]">
                            <p className="mb-4">We safeguard health-related information in cookies per HIPAA regulations:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Encryption:</strong> Health data is encrypted</li>
                                <li><strong>Limited Scope:</strong> Minimal health data is stored</li>
                                <li><strong>Secure Transmission:</strong> Only over HTTPS</li>
                                <li><strong>Access Controls:</strong> Strict data access rules</li>
                                <li><strong>Audits:</strong> Regular implementation checks</li>
                            </ul>
                        </div>
                    </Section>

                    {/* Third-Party Cookies */}
                    <Section title="Third-Party Cookies">
                        <div className="p-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100">
                            <p className="mb-4">We may use HIPAA-compliant third-party services:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {thirdPartyServices.map(({ title, desc }, i) => (
                                    <div key={i} className="bg-white dark:bg-[rgb(var(--background))] p-4 rounded border border-[rgb(var(--border))]">
                                        <h4 className="font-semibold mb-2">{title}</h4>
                                        <p className="text-sm opacity-80">{desc}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4">All services sign Business Associate Agreements.</p>
                        </div>
                    </Section>

                    {/* Managing Preferences */}
                    <Section title="Managing Preferences">
                        <div className="space-y-6">
                            <div className="p-6 rounded-lg bg-[rgb(var(--muted))]">
                                <h3 className="text-lg font-semibold mb-3">Consent Manager</h3>
                                <p className="mb-4">Use our Cookie Manager to:</p>
                                <ul className="list-disc pl-6 space-y-2 opacity-80">
                                    <li>Accept/reject specific cookies</li>
                                    <li>Modify preferences anytime</li>
                                    <li>Understand cookie impact</li>
                                </ul>
                                <button className="mt-4 bg-[rgb(var(--accent))] text-white px-6 py-2 rounded cursor-pointer hover:brightness-90 transition" onClick={openPreferences}>
                                    Open Cookie Preferences
                                </button>
                            </div>
                            <div className="p-6 rounded-lg border">
                                <h3 className="text-lg font-semibold mb-3">Browser Settings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {browserSettings.map(({ name, path }, i) => (
                                        <div key={i} className="bg-white dark:bg-[rgb(var(--background))] p-4 rounded border border-[rgb(var(--border))]">
                                            <h4 className="font-semibold mb-2">{name}</h4>
                                            <p className="text-sm opacity-80">{path}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Cookie Retention */}
                    <Section title="Cookie Retention">
                        <div className="p-6 rounded-lg border space-y-4">
                            {cookieRetention.map(([label, value], i) => (
                                <div key={i} className="flex justify-between py-2 border-b last:border-none">
                                    <span className="font-medium">{label}</span>
                                    <span className="opacity-80">{value}</span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Policy Updates */}
                    <Section title="Policy Changes">
                        <p className="mb-2">
                            We update this policy as needed and notify you with a new &quot;Last updated&quot; date.
                        </p>
                        <p className="opacity-80">Check this page periodically for updates.</p>
                    </Section>

                    {/* Contact Info */}
                    <Section title="Contact Us">
                        <div className="p-6 rounded-lg bg-[rgb(var(--muted))]">
                            <p className="mb-4">Questions? Reach out:</p>
                            <ul className="space-y-1">
                                <li><strong>Email:</strong> privacy@medicobot.com</li>
                                <li><strong>Phone:</strong> 1-800-MEDICO</li>
                                <li><strong>Address:</strong> Medico Health Bot, 123 Health Tech Drive, Medical City, MC 12345</li>
                            </ul>
                        </div>
                    </Section>

                </div>
            </div>
        </div>
    );
};

// Reusable section wrapper
const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
    </section>
);

// Data objects
const cookieTypes = [
    {
        title: 'Necessary Cookies',
        icon: <Settings className="h-6 w-6 text-[rgb(var(--primary))]" />,
        desc: 'Essential for website functionality. Cannot be disabled.',
        examples: ['Authentication tokens', 'Session management', 'Security features', 'CSRF protection'],
    },
    {
        title: 'Analytics Cookies',
        icon: <BarChart className="h-6 w-6 text-[rgb(var(--accent))]" />,
        desc: 'Help understand visitor interaction.',
        examples: ['Page views', 'User journey', 'Performance', 'Error tracking'],
    },
    {
        title: 'Functional Cookies',
        icon: <Wrench className="h-6 w-6 text-purple-600 dark:text-purple-300" />,
        desc: 'Enable personalization features.',
        examples: ['Language', 'Theme', 'Accessibility', 'User preferences'],
    },
    {
        title: 'Marketing Cookies',
        icon: <Target className="h-6 w-6 text-orange-600 dark:text-orange-300" />,
        desc: 'Used to track and show relevant ads.',
        examples: ['Ad preferences', 'Social media', 'Conversion tracking', 'Remarketing'],
    },
];

const cookieUsage = [
    {
        title: 'Essential Operations',
        points: [
            'Maintain login sessions securely',
            'Remember your preferences',
            'Protect against threats',
            'Ensure site functionality',
        ],
    },
    {
        title: 'Improving Our Service',
        points: [
            'Analyze user behavior',
            'Identify popular features',
            'Monitor performance',
            'Understand user needs',
        ],
    },
    {
        title: 'Personalization',
        points: [
            'Save display settings',
            'Customize content',
            'Provide relevant health info',
            'Improve AI interactions',
        ],
    },
];

const thirdPartyServices = [
    { title: 'Analytics', desc: 'Google Analytics – usage insights' },
    { title: 'Security', desc: 'Cloudflare – protection & performance' },
];

const browserSettings = [
    { name: 'Chrome', path: 'Settings → Privacy & Security → Cookies' },
    { name: 'Firefox', path: 'Settings → Privacy & Security → Cookies' },
    { name: 'Safari', path: 'Preferences → Privacy → Manage Data' },
    { name: 'Edge', path: 'Settings → Site Permissions → Cookies' },
];

const cookieRetention = [
    ['Session Cookies', 'Deleted on browser close'],
    ['Auth Cookies', '30 days or logout'],
    ['Preference Cookies', '1 year'],
    ['Analytics Cookies', '2 years'],
    ['Marketing Cookies', '1 year'],
];

export default CookiePolicy;

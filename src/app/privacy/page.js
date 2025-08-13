import Layout from '@/components/ui/Layout';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata = {
  title: 'Privacy Policy - Walter Okumu Oriaro',
  description: 'Privacy policy and data protection information for Walter Okumu Oriaro\'s professional portfolio website.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: August 9, 2025
          </p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-gray dark:prose-invert max-w-none">

            <h2>1. Introduction</h2>
            <p>
              Walter Okumu Oriaro (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) operates this professional portfolio website
              (the &quot;Service&quot;). This page informs you of my policies regarding the collection, use, and
              disclosure of personal data when you use my Service and the choices you have associated
              with that data.
            </p>

            <h2>2. Information Collection and Use</h2>

            <h3>2.1 Personal Information</h3>
            <p>I may collect the following types of personal information:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, and company details when you contact me through the contact form</li>
              <li><strong>Communication Data:</strong> Messages and inquiries sent through the website</li>
              <li><strong>Professional Information:</strong> Job title, company, and other professional details you voluntarily provide</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit my website, I may automatically collect:</p>
            <ul>
              <li><strong>Analytics Data:</strong> Page views, session duration, bounce rate, and user behavior through Google Analytics and Yandex Metrica</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system</li>
              <li><strong>Usage Data:</strong> How you navigate and interact with the website</li>
              <li><strong>Cookie Data:</strong> Information stored through cookies and similar technologies</li>
            </ul>

            <h2>3. How I Use Your Information</h2>
            <p>I use the collected information for the following purposes:</p>
            <ul>
              <li><strong>Communication:</strong> To respond to your inquiries and professional outreach</li>
              <li><strong>Service Improvement:</strong> To analyze website performance and user experience</li>
              <li><strong>Professional Networking:</strong> To establish and maintain professional relationships</li>
              <li><strong>Security:</strong> To protect against spam, abuse, and security threats</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>

            <h2>4. Data Sharing and Disclosure</h2>

            <h3>4.1 Third-Party Services</h3>
            <p>I use the following third-party services that may collect information:</p>
            <ul>
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Yandex Metrica:</strong> For additional analytics insights</li>
              <li><strong>GitHub Pages:</strong> For website hosting and delivery</li>
              <li><strong>Vercel:</strong> For website deployment and performance optimization</li>
            </ul>

            <h3>4.2 Data Sharing Limitations</h3>
            <p>I do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
            <ul>
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect my rights and safety</li>
              <li>In connection with a business transfer or merger</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              I implement appropriate technical and organizational measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over
              the internet or electronic storage is 100% secure.
            </p>

            <h3>5.1 Security Measures</h3>
            <ul>
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure hosting infrastructure</li>
              <li>Regular security updates and monitoring</li>
              <li>Limited access to personal data</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              I retain personal information only for as long as necessary to fulfill the purposes outlined in this
              privacy policy. Contact form submissions are retained for up to 2 years for professional communication
              purposes, unless deletion is requested earlier.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal data</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate personal data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request transfer of your data in a structured format</li>
              <li><strong>Objection:</strong> Object to processing of your personal data</li>
              <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
            </ul>

            <h2>8. Cookies and Tracking Technologies</h2>

            <h3>8.1 Cookie Usage</h3>
            <p>This website uses cookies and similar tracking technologies for:</p>
            <ul>
              <li><strong>Analytics:</strong> Understanding website usage and performance</li>
              <li><strong>Functionality:</strong> Remembering user preferences and settings</li>
              <li><strong>Security:</strong> Protecting against fraudulent activity</li>
            </ul>

            <h3>8.2 Cookie Management</h3>
            <p>
              You can control cookies through your browser settings. However, disabling cookies may
              affect the functionality of this website.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your personal data may be transferred to and processed in countries other than your own.
              I ensure appropriate safeguards are in place to protect your data during international transfers.
            </p>

            <h2>10. Children&apos;s Privacy</h2>
            <p>
              This website is not intended for children under 16 years of age. I do not knowingly collect
              personal information from children under 16. If you become aware that a child has provided
              personal information, please contact me so I can take appropriate action.
            </p>

            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              I may update this privacy policy from time to time. Changes will be posted on this page with
              an updated revision date. Continued use of the website after changes constitutes acceptance
              of the new privacy policy.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              If you have questions about this privacy policy or wish to exercise your data protection rights,
              please contact me:
            </p>
            <ul>
              <li><strong>Email:</strong> okumu.oriaro@gmail.com</li>
              <li><strong>Phone:</strong> +254715680932</li>
              <li><strong>Address:</strong> Nairobi, Kenya</li>
            </ul>

            <h2>13. Legal Basis for Processing (GDPR)</h2>
            <p>For users in the European Union, my legal basis for processing personal data includes:</p>
            <ul>
              <li><strong>Consent:</strong> When you provide explicit consent for specific purposes</li>
              <li><strong>Legitimate Interest:</strong> For analytics and website improvement</li>
              <li><strong>Contractual Necessity:</strong> To respond to your inquiries and requests</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
            </ul>

            <h2>14. Data Protection Officer</h2>
            <p>
              For data protection matters, you can contact me directly using the contact information provided above.
              As a solo professional, I personally oversee all data protection compliance.
            </p>

            <h2>15. Complaints</h2>
            <p>
              If you have concerns about how your personal data is processed, you have the right to lodge a
              complaint with your local data protection authority.
            </p>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
                Quick Summary
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                <li>• I collect minimal personal data, only what&apos;s necessary for professional communication</li>
                <li>• Your data is used solely for responding to inquiries and website improvement</li>
                <li>• I use standard analytics tools (Google Analytics, Yandex Metrica) with anonymization</li>
                <li>• I don&apos;t sell or share your data with third parties for marketing purposes</li>
                <li>• You have full control over your data and can request deletion at any time</li>
                <li>• Contact me anytime with questions about your privacy</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
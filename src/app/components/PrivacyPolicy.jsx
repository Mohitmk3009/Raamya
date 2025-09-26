'use client'
import Link from 'next/link';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black text-[#EFAF00] pt-10 text-base font-redhead">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Breadcrumbs */}
        <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white cursor-pointer">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#EFAF00] font-bold">Privacy Policy</span>
        </nav>

        <h1 className="text-4xl font-bold text-[#EFAF00] mb-8">Privacy Policy</h1>

        <p className="lg:mb-10 mb-5 leading-relaxed ">
          This Privacy Policy describes how RAAMYA collects, uses, and protects your personal information when you use our services. We are committed to protecting your privacy and ensuring the security of your data.
        </p>

        {/* Section 1: Information We Collect */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">1. Information We Collect</h2>
          <p className="mb-4">We may collect the following types of information:</p>
          <ul className="list-disc list-inside space-y-4 pl-2 ">
            <li>
              <strong>Personal Identification Information:</strong> This includes your name, email address, shipping address, and phone number, which you provide when you create an account, place an order, or subscribe to our newsletter.
            </li>
            <li>
              <strong>Transaction Data:</strong> We collect information related to your purchases, including product details, purchase date, and payment information (note: we do not store your full credit card details).
            </li>
            <li>
              <strong>Technical and Usage Data:</strong> We automatically collect data about your interaction with our website, such as your IP address, browser type, operating system, pages visited, and the time and date of your visit. This information helps us improve our website's functionality and your user experience.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to track activity on our website and hold certain information. These technologies help us recognize you, remember your preferences, and provide a personalized experience.
            </li>
          </ul>
        </div>

        {/* Section 2: How We Use Your Information */}
        <div className="lg:mb-10 mb-5">
          <h2 className="lg:text-2xl text-xl font-semibold text-[#EFAF00] mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect for various purposes, including:</p>
          <ul className="list-disc list-inside space-y-3 pl-2 ">
            <li>To process your orders and manage your account.</li>
            <li>To deliver products to you and communicate with you about your order status.</li>
            <li>To personalize your experience on our website and show you products and offers that may interest you.</li>
            <li>To improve our products, services, and website functionality.</li>
            <li>To send you promotional communications, newsletters, or marketing materials, if you have opted in. You can unsubscribe at any time.</li>
            <li>To detect and prevent fraudulent activity and ensure the security of our platform.</li>
            <li>To comply with legal obligations and resolve any disputes.</li>
          </ul>
        </div>
        
        {/* Section 3: Sharing Your Information */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">3. Sharing Your Information</h2>
          <p className="mb-4 leading-relaxed ">
            We do not sell, trade, or rent your personal identification information to others. We may share your information with trusted third-party service providers who assist us in operating our business and providing our services, such as:
          </p>
          <ul className="list-disc list-inside space-y-3 pl-2 ">
            <li><strong>Shipping and Logistics Partners:</strong> To fulfill and deliver your orders.</li>
            <li><strong>Payment Processors:</strong> To securely process your payments.</li>
            <li><strong>Analytics Providers:</strong> To help us understand how our website is used.</li>
          </ul>
          <p className="mt-4 leading-relaxed ">
            These third parties are contractually obligated to keep your information confidential and are prohibited from using your data for any other purpose. We may also disclose your information if required by law or to protect our rights or the safety of others.
          </p>
        </div>

        {/* Section 4: Data Security */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">4. Data Security</h2>
          <p className="leading-relaxed ">
            We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers, and we use encryption to protect sensitive data transmitted online. While we strive to use commercially acceptable means to protect your data, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </div>

        {/* Section 5: Your Rights */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">5. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc list-inside space-y-3 pl-2 ">
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
            <li><strong>Correction:</strong> Request that we correct any inaccurate information we hold about you.</li>
            <li><strong>Deletion:</strong> Request that we delete your personal information, subject to certain legal exceptions.</li>
            <li><strong>Withdraw Consent:</strong> Withdraw your consent to the processing of your data at any time.</li>
          </ul>
          <p className="mt-4 leading-relaxed">
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
        </div>

        {/* Section 6: Third-Party Links */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4 ">6. Third-Party Links</h2>
          <p className="leading-relaxed ">
            Our website may contain links to other websites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
        </div>

        {/* Section 7: Changes to This Policy */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">7. Changes to This Policy</h2>
          <p className="leading-relaxed ">
            We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new policy on this page. We encourage you to review this policy periodically.
          </p>
        </div>

        {/* Section 8: Contact Us */}
        <div>
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">8. Contact Us</h2>
          <p className="leading-relaxed ">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@raamya.net.in" className="text-[#EFAF00] underline hover:text-yellow-300">support@raamya.net.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
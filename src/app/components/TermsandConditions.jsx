'use client'
import Link from 'next/link';
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-black text-[#EFAF00] pt-10  font-redhead">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Breadcrumbs */}
        <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white cursor-pointer">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#EFAF00] font-bold">Terms and Conditions</span>
        </nav>

        <h1 className="lg:text-4xl text-2xl font-bold text-[#EFAF00] mb-8">Terms and Conditions</h1>

        <p className="mb-10 leading-relaxed">
          These Terms and Conditions (“Terms”) govern your access to and use of the RAAMYA website and services. By accessing or using our services, you agree to be bound by these Terms.
        </p>

        {/* Section 1: Acceptance of Terms */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By creating an account, making a purchase, or using any part of our website, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, you may not access or use our services.
          </p>
        </div>

        {/* Section 2: Use of the Service */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">2. Use of the Service</h2>
          <p className="mb-4 leading-relaxed">
            <strong>Eligibility:</strong> You must be at least 18 years of age to use our services. By using our services, you represent and warrant that you meet this age requirement.
          </p>
          <p className="mb-4 leading-relaxed">
            <strong>Prohibited Activities:</strong> You agree not to engage in any of the following activities:
          </p>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>Using the website for any illegal or unauthorized purpose.</li>
            <li>Violating any applicable laws or regulations.</li>
            <li>Attempting to interfere with the proper working of the website.</li>
            <li>Harassing, abusing, or harming other users.</li>
            <li>Transmitting any viruses or malicious code.</li>
            <li>Scraping, mining, or harvesting data from our website.</li>
          </ul>
        </div>
        
        {/* Section 3: User Accounts */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">3. User Accounts</h2>
          <p className="mb-4 leading-relaxed">
            <strong>Account Creation:</strong> You may be required to create an account to access certain features of our services. You agree to provide accurate, current, and complete information during the registration process.
          </p>
          <p className="leading-relaxed">
            <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </div>

        {/* Section 4: Intellectual Property */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">4. Intellectual Property</h2>
          <p className="leading-relaxed">
            All content on the RAAMYA website, including text, graphics, logos, images, and software, is the property of RAAMYA or its content suppliers and is protected by intellectual property laws. You may not use, reproduce, or distribute any content from our website without our express written permission.
          </p>
        </div>

        {/* Section 5: Disclaimer of Warranties */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">5. Disclaimer of Warranties</h2>
          <p className="leading-relaxed">
            Our services are provided on an “as is” and “as available” basis. We make no warranties, express or implied, regarding the operation of our website or the information, content, or materials included on the site. We do not warrant that the website will be uninterrupted, error-free, or secure.
          </p>
        </div>

        {/* Section 6: Limitation of Liability */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">6. Limitation of Liability</h2>
          <p className="leading-relaxed">
            In no event shall RAAMYA, its directors, employees, or affiliates be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services, even if we have been advised of the possibility of such damages.
          </p>
        </div>

        {/* Section 7: Indemnification */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">7. Indemnification</h2>
          <p className="leading-relaxed">
            You agree to indemnify and hold harmless RAAMYA and its affiliates from and against any and all claims, damages, costs, and expenses (including reasonable attorneys' fees) arising from your use of the services or your violation of these Terms.
          </p>
        </div>

        {/* Section 8: Governing Law and Jurisdiction */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">8. Governing Law and Jurisdiction</h2>
          <p className="leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of Delhi, India, without regard to its conflict of law provisions. Any legal action or proceeding related to your use of our services shall be brought exclusively in the courts of Delhi, India.
          </p>
        </div>

        {/* Section 9: Changes to Terms */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">9. Changes to Terms</h2>
          <p className="leading-relaxed">
            We reserve the right to modify these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. Your continued use of the services after any such changes constitutes your acceptance of the new Terms.
          </p>
        </div>

        {/* Section 10: Contact Us */}
        <div>
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">10. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about these Terms, please contact us at <a href="mailto:support@raamya.net.in" className="text-[#EFAF00] underline hover:text-yellow-300">support@raamya.net.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
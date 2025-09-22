import Link from 'next/link';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black text-yellow-400 font-redhead pt-10 text-justify" >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
         <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-400 font-bold ">Privacy Policy</span>
        </nav>


        <h1 className="text-4xl font-bold text-yellow-500 mb-6">Privacy Policy</h1>

        <p className="mb-10 leading-relaxed">
          At RAAMYA, your trust matters to us. This Privacy Policy explains how we collect, use, protect, and disclose your information when you interact with our website.
        </p>

        {/* Information We Collect Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>Personal Data: Name, Email Address, Phone Number, Billing and Shipping Address.</li>
            <li>Payment Information: Processed securely through trusted payment gateways. We do not store your card details.</li>
            <li>Browsing Data: IP Address, browser type, device information, and cookies to enhance your shopping experience.</li>
            <li>Voluntary Data: Information you provide when signing up for newsletters, promotions, or customer support.</li>
          </ul>
        </div>

        {/* How We Use Your Information Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>To process and deliver your orders.</li>
            <li>To provide customer service and support.</li>
            <li>To improve website performance, product offerings, and personalization.</li>
            <li>To send updates, exclusive offers, and promotional content (only with your consent).</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </div>

        {/* Data Protection Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Data Protection</h2>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>SSL Encryption is used for all transactions.</li>
            <li>Payment information is handled by PCI-DSS compliant providers.</li>
            <li>Restricted access to personal data internally.</li>
          </ul>
        </div>

        {/* Sharing Of Information Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Sharing Of Information</h2>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>We do not sell or rent your data.</li>
            <li>Data may only be shared with:
              <ul className="list-disc list-inside space-y-2 pl-6 mt-2">
                <li>Delivery partners for shipping.</li>
                <li>Payment processors for transactions.</li>
                <li>Legal authorities if required by law.</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Your Rights Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Your Rights</h2>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>Right to request a copy of your personal data.</li>
            <li>Right to update or delete your information.</li>
            <li>Right to opt-out of marketing communications.</li>
          </ul>
        </div>

        {/* For Privacy Concerns */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-500">
            For Privacy Concerns, Contact <a href="mailto:Support@Raamya.com" className="underline hover:text-yellow-300">Support@Raamya.com</a>
          </h2>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;

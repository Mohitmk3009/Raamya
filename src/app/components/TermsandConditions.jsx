import Link from 'next/link';
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-black text-yellow-400 px-5 py-10 lg:px-0  pt-10 text-justify font-redhead">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
         <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-400 font-bold ">Terms & Conditions</span>
        </nav>


        <h1 className="text-4xl font-bold text-yellow-500 mb-6">Terms & Conditions</h1>

        <p className="mb-10 leading-relaxed">
          Welcome to RAAMYA. These terms and conditions outline the rules and regulations for the use of RAAMYA's Website. By accessing this website, we assume you accept these terms and conditions. Do not continue to use RAAMYA if you do not agree to all of the terms and conditions stated on this page.
        </p>

        {/* Section 1: Intellectual Property Rights */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">1. Intellectual Property Rights</h2>
          <p className="leading-relaxed">
            Other than the content you own, under these Terms, RAAMYA and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.
          </p>
        </div>

        {/* Section 2: Restrictions */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">2. Restrictions</h2>
          <p className="mb-4">You are specifically restricted from all of the following:</p>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>Publishing any Website material in any other media.</li>
            <li>Selling, sublicensing and/or otherwise commercializing any Website material.</li>
            <li>Publicly performing and/or showing any Website material.</li>
            <li>Using this Website in any way that is or may be damaging to this Website.</li>
            <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity.</li>
          </ul>
        </div>
        
        {/* Section 3: Your Content */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">3. Your Content</h2>
          <p className="leading-relaxed">
            In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant RAAMYA a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
          </p>
        </div>

        {/* Section 4: No warranties */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">4. No Warranties</h2>
          <p className="leading-relaxed">
            This Website is provided “as is,” with all faults, and RAAMYA expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website.
          </p>
        </div>
        
        {/* Section 5: Limitation of Liability */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">5. Limitation of Liability</h2>
          <p className="leading-relaxed">
            In no event shall RAAMYA, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. RAAMYA, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.
          </p>
        </div>

        {/* Section 6: Governing Law & Jurisdiction */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">6. Governing Law & Jurisdiction</h2>
          <p className="leading-relaxed">
            These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-500">
            Contact Us: <a href="mailto:Support@Raamya.com" className="underline hover:text-yellow-300">Support@Raamya.com</a>
          </h2>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;

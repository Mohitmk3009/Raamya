'use client'
import Link from 'next/link';
import React from 'react';

const ExchangePolicy = () => {
  return (
    <div className="bg-black text-[#EFAF00] pt-10  font-redhead">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Breadcrumbs */}
        <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white cursor-pointer">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#EFAF00] font-bold">Exchange Policy</span>
        </nav>

        <h1 className="lg:text-4xl text-2xl font-bold text-[#EFAF00] mb-8">Exchange Policy</h1>

        <p className="mb-6 leading-relaxed">
          Thank you for your purchase with RAAMYA. We are committed to providing you with high-quality products. Please review our exchange policy carefully, as it outlines the conditions for all product exchanges.
        </p>
        <p className="lg:mb-10 mb-5 leading-relaxed font-semibold">
          This is an exchange-only policy. We do not offer returns or refunds for any purchases.
        </p>

        {/* Exchange Eligibility Window Section */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">1. Exchange Eligibility Window</h2>
          <p className="leading-relaxed">
            An exchange is only valid for 3 days from the date of product delivery.
          </p>
          <p className="mt-3 leading-relaxed">
            After this 3-day period has passed, you will not be eligible to apply for an exchange under any circumstances.
          </p>
        </div>

        {/* Exchange Conditions Section */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">2. Exchange Conditions</h2>
          <p className="mb-4">To be eligible for an exchange, all products must meet the following criteria:</p>
          <ul className="list-disc list-inside space-y-4 pl-4">
            <li>
              <strong>Same Product Exchange:</strong> The exchange is only valid for a product of the same design, color, size, or model as the original purchase. We do not offer exchanges for a different product or a change in a different variant.
            </li>
            <li>
              <strong>Original Condition:</strong> The product must be in its original, unused, and unworn condition.
            </li>
            <li>
              <strong>Intact Tags and Packaging:</strong> All original tags, labels, and packaging must be attached to the product without any signs of tampering, tearing, or defect. The product must not have any defects or damage whatsoever.
            </li>
            <li>
              <strong>Cleanliness and Fragrance:</strong> The product must be completely clean and free from any dirt, stains, or blemishes. It must not carry any fragrances, such as deodorant, perfume, body odor, or smoke.
            </li>
            <li>
              <strong>Proof of Purchase:</strong> A valid proof of purchase, such as the original invoice or order number, is required to initiate the exchange process.
            </li>
          </ul>
        </div>

        {/* Exchange Process Section */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">3. Exchange Process</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4">
            <li>
              <strong>Initiate Request:</strong> Within the 3-day exchange window, please contact our customer support team to inform us of your intention to exchange the product.
            </li>
            <li>
              <strong>Product Inspection:</strong> Once your request is received, our team will guide you on how to return the product. Upon receipt, the product will undergo a thorough inspection to ensure all exchange conditions are met.
            </li>
            <li>
              <strong>Approval and Dispatch:</strong> If the product passes our inspection, we will approve the exchange and dispatch the replacement product to you. We reserve the right to decline an exchange if the product does not meet the specified conditions.
            </li>
          </ol>
        </div>
        
        {/* Non-Compliance Section */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">4. Non-Compliance</h2>
          <p className="leading-relaxed">
            If a product sent for exchange does not comply with the above policy, we will not process the exchange, and the product will be shipped back to you at your expense.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExchangePolicy;
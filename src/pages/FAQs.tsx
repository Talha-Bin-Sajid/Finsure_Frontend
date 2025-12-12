import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is FINSURE?',
      answer: 'FINSURE is a comprehensive financial management platform that helps you extract, analyze, and report on financial data from documents like receipts, invoices, and bank statements. Our AI-powered OCR technology makes data entry effortless.'
    },
    {
      question: 'How secure is my financial data?',
      answer: 'We take security seriously. All data is encrypted in transit and at rest using bank-grade AES-256 encryption. We offer 2FA authentication, regular security audits, and comply with industry standards including SOC 2 and GDPR.'
    },
    {
      question: 'What file formats do you support?',
      answer: 'FINSURE supports PDF, JPG, PNG, and HEIC formats for document uploads. Our OCR engine can extract data from scanned documents, photos, and digital PDFs with high accuracy.'
    },
    {
      question: 'Can I export my data?',
      answer: 'Yes! You can export your data in multiple formats including CSV, Excel, PDF, and JSON. Pro and Enterprise plans also offer API access for custom integrations.'
    },
    {
      question: 'How accurate is the OCR extraction?',
      answer: 'Our advanced OCR engine achieves 99% accuracy on Pro and Enterprise plans. Free plan users get standard OCR with approximately 95% accuracy. All extracted data can be manually reviewed and edited before processing.'
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card is required to start your trial. The Free plan is available forever with basic features.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Absolutely! You can change your plan at any time from your account settings. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'Free plan users receive email support with 48-hour response time. Pro users get priority support with 24-hour response time. Enterprise customers receive dedicated account management and phone support.'
    },
    {
      question: 'Can I integrate FINSURE with my accounting software?',
      answer: 'Yes! Pro and Enterprise plans include API access for custom integrations. We also offer pre-built integrations with popular accounting software like QuickBooks, Xero, and FreshBooks.'
    },
    {
      question: 'How do I delete my account?',
      answer: 'You can delete your account anytime from the Settings page. All your data will be permanently deleted within 30 days according to our data retention policy.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#e7f0fa] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-[#e7f0fa]/80">
          Everything you need to know about FINSURE
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#14e7ff]/50"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <h3 className="text-lg font-semibold text-[#e7f0fa]">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="text-[#14e7ff] flex-shrink-0" size={24} />
              ) : (
                <ChevronDown className="text-[#14e7ff] flex-shrink-0" size={24} />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6">
                <p className="text-[#e7f0fa]/80 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-[#e7f0fa] mb-4">Still have questions?</h3>
        <p className="text-[#e7f0fa]/80 mb-6">
          Our support team is here to help you get the most out of FINSURE
        </p>
        <a
          href="mailto:support@finsure.com"
          className="inline-block bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

import React from 'react';
import { Upload, FileText, BarChart3, FileCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Quickstart: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Upload,
      title: 'Upload Documents',
      description: 'Drag and drop your receipts, invoices, or bank statements. We support PDF, JPG, PNG, and more.',
      details: [
        'Bulk upload multiple files at once',
        'Automatic file type detection',
        'Secure encrypted transfer'
      ]
    },
    {
      icon: FileText,
      title: 'AI Extracts Data',
      description: 'Our advanced OCR engine automatically extracts transaction details with 99% accuracy.',
      details: [
        'Date, amount, and description extraction',
        'Smart category suggestions',
        'Tax-relevant data identification'
      ]
    },
    {
      icon: BarChart3,
      title: 'Review & Edit',
      description: 'Verify extracted data in an intuitive table view. Make quick edits if needed.',
      details: [
        'Inline editing capabilities',
        'Bulk categorization',
        'Transaction merging and splitting'
      ]
    },
    {
      icon: FileCheck,
      title: 'Generate Reports',
      description: 'Create professional financial reports with a single click. Export in multiple formats.',
      details: [
        'Income vs Expense reports',
        'Tax summaries',
        'Cash flow analysis',
        'Custom date ranges'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#e7f0fa] mb-4">
          Get Started in Minutes
        </h1>
        <p className="text-xl text-[#e7f0fa]/80 mb-8">
          Follow these simple steps to transform your financial workflow
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center gap-2"
        >
          Start Free Trial
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-8 hover:border-[#14e7ff] transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center">
                  <step.icon className="text-[#14e7ff]" size={32} />
                </div>
                <div className="hidden md:block w-16 text-center mt-4">
                  <span className="text-4xl font-bold text-[#14e7ff]/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#e7f0fa] mb-3">{step.title}</h3>
                <p className="text-lg text-[#e7f0fa]/80 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#14e7ff] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[#e7f0fa]/70">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="flex justify-center mt-6 md:ml-8">
                <ArrowRight className="text-[#14e7ff]/40 rotate-90 md:rotate-0" size={24} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-[#151c27] to-[#0c111a] border border-[#14e7ff]/20 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-[#e7f0fa] mb-4">
          Ready to Experience FINSURE?
        </h2>
        <p className="text-lg text-[#e7f0fa]/80 mb-6">
          Join thousands of users who have streamlined their financial workflow
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/signup')}
            className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Create Free Account
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#151c27] hover:bg-[#14e7ff]/10 text-[#14e7ff] border border-[#14e7ff] px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

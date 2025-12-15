import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, BarChart3, Lock, TrendingUp, FileCheck } from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Secure Data Processing',
      description: 'Bank-grade encryption ensures your financial data stays protected at all times'
    },
    {
      icon: Zap,
      title: 'Lightning Fast OCR',
      description: 'Extract data from receipts and invoices in seconds with AI-powered recognition'
    },
    {
      icon: BarChart3,
      title: 'Visual Dashboards',
      description: 'Interactive charts and reports give you instant insights into your finances'
    },
    {
      icon: Lock,
      title: '2FA Authentication',
      description: 'Two-factor authentication adds an extra layer of security to your account'
    },
    {
      icon: TrendingUp,
      title: 'Tax Optimization',
      description: 'Automatically categorize transactions and calculate taxable income'
    },
    {
      icon: FileCheck,
      title: 'Automated Reports',
      description: 'Generate professional financial reports with a single click'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
          Financial Insights,
          <span className="block text-[#14e7ff]">Securely Delivered</span>
        </h1>
        <p className="text-xl text-[var(--text-primary)] opacity-80 mb-8 max-w-2xl mx-auto">
          FINSURE transforms your financial documents into actionable insights.
          Upload, extract, analyze, and report with enterprise-grade security.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/signup')}
            className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate('/quickstart')}
            className="bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[#14e7ff] border border-[#14e7ff] px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Watch Demo
          </button>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--text-primary)] mb-12">
          Everything You Need for Financial Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6 hover:border-[#14e7ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#14e7ff]/10"
            >
              <div className="w-12 h-12 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-[#14e7ff]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
              <p className="text-[var(--text-primary)] opacity-70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Transform Your Financial Workflow?
          </h2>
          <p className="text-xl text-[var(--text-primary)] opacity-80 mb-8">
            Join thousands of businesses managing their finances smarter
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};
import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Pricing: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 10 uploads per month',
        'Basic OCR extraction',
        'Standard reports',
        'Email support',
        '30-day data retention'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For professionals and small businesses',
      features: [
        'Unlimited uploads',
        'Advanced OCR with 99% accuracy',
        'Custom reports & dashboards',
        'Priority support',
        'Unlimited data retention',
        'API access',
        'Bulk processing',
        'Export to multiple formats'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      description: 'For large organizations with specific needs',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom integrations',
        'SSO & advanced security',
        'On-premise deployment option',
        'SLA guarantee',
        'Custom training',
        'White-label option'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-[var(--text-primary)] opacity-80">
          Choose the plan that fits your needs. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-[var(--bg-secondary)] rounded-lg p-8 border-2 transition-all duration-300 ${
              plan.highlighted
                ? 'border-[#14e7ff] shadow-lg shadow-[#14e7ff]/20 scale-105'
                : 'border-[var(--border-color)] hover:border-[#14e7ff]/50'
            }`}
          >
            {plan.highlighted && (
              <div className="text-center mb-4">
                <span className="bg-[#14e7ff] text-[#0c111a] px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-[#14e7ff]">{plan.price}</span>
              <span className="text-[var(--text-secondary)] ml-2">/ {plan.period}</span>
            </div>
            <p className="text-[var(--text-primary)] opacity-70 mb-6">{plan.description}</p>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-2">
                  <Check className="text-[#14e7ff] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[var(--text-primary)]">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/signup')}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                plan.highlighted
                  ? 'bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a]'
                  : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[#14e7ff] border border-[#14e7ff]'
              }`}
            >
              {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-[var(--text-secondary)]">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  );
};
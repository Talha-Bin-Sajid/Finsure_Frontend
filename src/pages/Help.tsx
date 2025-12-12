import React from 'react';
import { Mail, MessageCircle, Book, ExternalLink } from 'lucide-react';

export const Help: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#e7f0fa] mb-2">Help & Support</h1>
        <p className="text-[#e7f0fa]/60">
          Get help and find answers to common questions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6 hover:border-[#14e7ff] transition-all duration-300">
          <div className="w-12 h-12 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-4">
            <Book className="text-[#14e7ff]" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-[#e7f0fa] mb-2">Documentation</h3>
          <p className="text-[#e7f0fa]/70 mb-4">
            Browse our comprehensive guides and tutorials
          </p>
          <a
            href="#"
            className="flex items-center gap-2 text-[#14e7ff] hover:text-[#0ab6ff] transition-colors"
          >
            <span>View Documentation</span>
            <ExternalLink size={16} />
          </a>
        </div>

        <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6 hover:border-[#14e7ff] transition-all duration-300">
          <div className="w-12 h-12 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-4">
            <MessageCircle className="text-[#14e7ff]" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-[#e7f0fa] mb-2">Live Chat</h3>
          <p className="text-[#e7f0fa]/70 mb-4">
            Chat with our support team in real-time
          </p>
          <button className="flex items-center gap-2 text-[#14e7ff] hover:text-[#0ab6ff] transition-colors">
            <span>Start Chat</span>
            <ExternalLink size={16} />
          </button>
        </div>

        <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6 hover:border-[#14e7ff] transition-all duration-300">
          <div className="w-12 h-12 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-4">
            <Mail className="text-[#14e7ff]" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-[#e7f0fa] mb-2">Email Support</h3>
          <p className="text-[#e7f0fa]/70 mb-4">
            Send us an email and we'll respond within 24 hours
          </p>
          <a
            href="mailto:support@finsure.com"
            className="flex items-center gap-2 text-[#14e7ff] hover:text-[#0ab6ff] transition-colors"
          >
            <span>support@finsure.com</span>
          </a>
        </div>

        <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6 hover:border-[#14e7ff] transition-all duration-300">
          <div className="w-12 h-12 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-4">
            <Book className="text-[#14e7ff]" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-[#e7f0fa] mb-2">FAQs</h3>
          <p className="text-[#e7f0fa]/70 mb-4">
            Find quick answers to frequently asked questions
          </p>
          <a
            href="/faqs"
            className="flex items-center gap-2 text-[#14e7ff] hover:text-[#0ab6ff] transition-colors"
          >
            <span>Browse FAQs</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

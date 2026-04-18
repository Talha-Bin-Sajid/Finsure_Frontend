import React from "react";
import { Mail, Book, ExternalLink, Sparkles } from "lucide-react";
import { LiveChatCard } from "../components/chatbot/LiveChatCard";

export const Help: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Help & Support
        </h1>
        <p className="text-[var(--text-secondary)]">
          Get help and find answers to common questions
        </p>
      </div>

      {/* Live chat takes the spotlight - two-column layout on desktop. */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Live chat card (AI assistant) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#14e7ff]/10 border border-[#14e7ff]/30 flex items-center justify-center">
              <Sparkles size={14} className="text-[#14e7ff]" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Live Chat{" "}
              <span className="text-[var(--text-primary)]/50 font-normal">
                · FINSURE Assistant
              </span>
            </h2>
          </div>
          <p className="text-sm text-[var(--text-primary)]/60 -mt-1">
            Ask anything about FINSURE - uploads, reports, dashboards, security,
            and more. Replies are instant.
          </p>
          <LiveChatCard />
        </div>

        {/* Right: other support options */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 content-start">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-5 hover:border-[#14e7ff] transition-all duration-300">
            <div className="w-11 h-11 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-3">
              <Book className="text-[#14e7ff]" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1.5">
              Documentation
            </h3>
            <p className="text-[13px] text-[var(--text-primary)] opacity-70 mb-3">
              Browse our comprehensive guides and tutorials.
            </p>
            <a
              href="/documentation"
              className="flex items-center gap-1.5 text-sm text-[#14e7ff] hover:text-[#0ab6ff] transition-colors"
            >
              <span>View Documentation</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-5 hover:border-[#14e7ff] transition-all duration-300">
            <div className="w-11 h-11 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-3">
              <Mail className="text-[#14e7ff]" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1.5">
              Email Support
            </h3>
            <p className="text-[13px] text-[var(--text-primary)] opacity-70 mb-3">
              Send us an email and we'll respond within 24 hours.
            </p>
            <a
              href="mailto:support@finsure.com"
              className="flex items-center gap-1.5 text-sm text-[#14e7ff] hover:text-[#0ab6ff] transition-colors"
            >
              <span>support@finsure.com</span>
            </a>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-5 hover:border-[#14e7ff] transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-11 h-11 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-3">
              <Book className="text-[#14e7ff]" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1.5">
              FAQs
            </h3>
            <p className="text-[13px] text-[var(--text-primary)] opacity-70 mb-3">
              Quick answers to the most common questions.
            </p>
            <a
              href="/faqs"
              className="flex items-center gap-1.5 text-sm text-[#14e7ff] hover:text-[#0ab6ff] transition-colors"
            >
              <span>Browse FAQs</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

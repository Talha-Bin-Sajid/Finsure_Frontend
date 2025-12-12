import React, { useState, useEffect } from 'react';
import { FileText, Download, Share2, Plus, Loader } from 'lucide-react';
import { mockApi } from '../services/apiClient';
import { toast } from '../utils/toast';

interface Report {
  id: string;
  title: string;
  generatedDate: string;
  type: string;
  dateRange: string;
}

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [reportType, setReportType] = useState('income_expense');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mockApi.reports.getAll();
        setReports(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateReport = async () => {
    if (!startDate || !endDate) {
      toast.error('Please select date range');
      return;
    }

    setIsGenerating(true);
    try {
      const dateRange = `${startDate} to ${endDate}`;
      const response = await mockApi.reports.generate(reportType, dateRange);
      setReports([response.report, ...reports]);
      toast.success('Report generated successfully!');
      setShowGenerateModal(false);
      setStartDate('');
      setEndDate('');
    } catch (error) {
      toast.error('Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReport = (report: Report) => {
    toast.success(`Downloading ${report.title}...`);
  };

  const shareReport = (report: Report) => {
    navigator.clipboard.writeText(`https://finsure.app/reports/${report.id}`);
    toast.success('Share link copied to clipboard');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const reportTypeNames: { [key: string]: string } = {
    income_expense: 'Income vs Expense',
    tax_summary: 'Tax Summary',
    cashflow: 'Cash Flow Analysis'
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14e7ff]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#e7f0fa]">Generated Reports</h1>
          <p className="text-[#e7f0fa]/60">
            View, download, and share your financial reports
          </p>
        </div>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center gap-2 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6 hover:border-[#14e7ff] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="text-[#14e7ff]" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-[#e7f0fa] mb-2 line-clamp-2">
              {report.title}
            </h3>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-[#e7f0fa]/60">
                Generated: {formatDate(report.generatedDate)}
              </p>
              <p className="text-sm text-[#e7f0fa]/60">
                Period: {report.dateRange}
              </p>
              <span className="inline-block px-2 py-1 bg-[#14e7ff]/10 text-[#14e7ff] rounded text-xs font-medium">
                {reportTypeNames[report.type]}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => downloadReport(report)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] py-2 rounded-lg font-medium transition-colors"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
              <button
                onClick={() => shareReport(report)}
                className="flex items-center justify-center bg-[#151c27] hover:bg-[#14e7ff]/10 text-[#14e7ff] border border-[#14e7ff] p-2 rounded-lg transition-colors"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#e7f0fa] mb-6">Generate New Report</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#e7f0fa] mb-2">
                  Report Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full bg-[#0c111a] text-[#e7f0fa] border border-[#14e7ff]/20 rounded-lg px-4 py-2 focus:border-[#14e7ff] focus:outline-none"
                >
                  <option value="income_expense">Income vs Expense</option>
                  <option value="tax_summary">Tax Summary</option>
                  <option value="cashflow">Cash Flow Analysis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#e7f0fa] mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-[#0c111a] text-[#e7f0fa] border border-[#14e7ff]/20 rounded-lg px-4 py-2 focus:border-[#14e7ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#e7f0fa] mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-[#0c111a] text-[#e7f0fa] border border-[#14e7ff]/20 rounded-lg px-4 py-2 focus:border-[#14e7ff] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={generateReport}
                disabled={isGenerating}
                className="flex-1 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    <span>Generating...</span>
                  </>
                ) : (
                  'Generate'
                )}
              </button>
              <button
                onClick={() => setShowGenerateModal(false)}
                disabled={isGenerating}
                className="px-6 bg-[#151c27] hover:bg-[#14e7ff]/10 text-[#e7f0fa] border border-[#14e7ff]/20 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

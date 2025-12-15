// import React, { useState, useEffect, useRef } from 'react';
// import { FileText, Download, Share2, Plus, Loader, ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, PieChart, BarChart3 } from 'lucide-react';
// import { mockApi } from '../services/apiClient';
// import { toast } from '../utils/toast';

// interface Report {
//   id: string;
//   title: string;
//   generatedDate: string;
//   type: string;
//   dateRange: string;
// }

// interface Transaction {
//   id: string;
//   date: string;
//   description: string;
//   category: string;
//   amount: number;
//   taxable?: boolean;
//   type?: string;
// }

// interface DetailedReport {
//   reportId: string;
//   type: string;
//   title: string;
//   dateRange: string;
//   generatedDate: string;
//   summary: any;
//   transactions: Transaction[];
//   categoryBreakdown?: any[];
//   monthlyData?: any[];
//   taxBreakdown?: any[];
//   cashflowByCategory?: any[];
//   weeklyData?: any[];
// }

// export const Reports: React.FC = () => {
//   const [reports, setReports] = useState<Report[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showGenerateModal, setShowGenerateModal] = useState(false);
//   const [reportType, setReportType] = useState('income_expense');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectedReport, setSelectedReport] = useState<DetailedReport | null>(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await mockApi.reports.getAll();
//         setReports(data);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const generateReport = async () => {
//     if (!startDate || !endDate) {
//       toast.error('Please select date range');
//       return;
//     }

//     setIsGenerating(true);
//     try {
//       const dateRange = `${startDate} to ${endDate}`;
//       const response = await mockApi.reports.generate(reportType, dateRange);
//       setReports([response.report, ...reports]);
//       toast.success('Report generated successfully!');
//       setShowGenerateModal(false);
//       setStartDate('');
//       setEndDate('');
//     } catch (error) {
//       toast.error('Failed to generate report');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const viewReportDetails = async (report: Report) => {
//     setIsLoadingDetails(true);
//     try {
//       const detailedReport = await mockApi.reports.getDetailedReport(report.id);
//       setSelectedReport(detailedReport);
//     } catch (error) {
//       toast.error('Failed to load report details');
//     } finally {
//       setIsLoadingDetails(false);
//     }
//   };

//   const downloadReportPDF = async () => {
//     if (!selectedReport) return;
//     setIsDownloading(true);
//     try {
//       await mockApi.reports.downloadReportPDF(selectedReport.reportId);
//       window.print();
//       toast.success('Report downloaded successfully!');
//     } catch (error) {
//       toast.error('Failed to download report');
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const shareReport = (report: Report) => {
//     navigator.clipboard.writeText(`https://finsure.app/reports/${report.id}`);
//     toast.success('Share link copied to clipboard');
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-PK', {
//       style: 'currency',
//       currency: 'PKR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(Math.abs(amount));
//   };

//   const reportTypeNames: { [key: string]: string } = {
//     income_expense: 'Income vs Expense',
//     tax_summary: 'Tax Summary',
//     cashflow: 'Cash Flow Analysis'
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14e7ff]"></div>
//       </div>
//     );
//   }

//   if (selectedReport) {
//     return (
//       <div className="space-y-6">
//         <style>{`@media print {body *{visibility:hidden}#report-content,#report-content *{visibility:visible}#report-content{position:absolute;left:0;top:0;width:100%;background:white;padding:40px}.no-print{display:none!important}}`}</style>

//         <div className="flex items-center justify-between no-print">
//           <button onClick={() => setSelectedReport(null)} className="flex items-center gap-2 text-[#14e7ff] hover:text-[#0ab6ff] transition-colors">
//             <ArrowLeft size={20} />
//             <span>Back to Reports</span>
//           </button>
//           <button onClick={downloadReportPDF} disabled={isDownloading} className="flex items-center gap-2 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
//             {isDownloading ? <><Loader className="animate-spin" size={18} /><span>Downloading...</span></> : <><Download size={18} /><span>Download PDF</span></>}
//           </button>
//         </div>

//         <div id="report-content" className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-8">
//           <div className="border-b border-[#14e7ff]/20 pb-6 mb-6">
//             <h1 className="text-3xl font-bold text-[#e7f0fa] mb-2">{selectedReport.title}</h1>
//             <div className="flex flex-wrap gap-4 text-sm text-[#e7f0fa]/60">
//               <div className="flex items-center gap-2"><Calendar size={16} /><span>Period: {selectedReport.dateRange}</span></div>
//               <div className="flex items-center gap-2"><FileText size={16} /><span>Generated: {formatDate(selectedReport.generatedDate)}</span></div>
//             </div>
//           </div>

//           {selectedReport.type === 'income_expense' && (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//                 {[
//                   { label: 'Total Income', value: selectedReport.summary.totalIncome, icon: TrendingUp, color: 'text-green-500' },
//                   { label: 'Total Expenses', value: selectedReport.summary.totalExpenses, icon: TrendingDown, color: 'text-red-500' },
//                   { label: 'Net Balance', value: selectedReport.summary.netBalance, icon: DollarSign, color: 'text-[#14e7ff]' },
//                   { label: 'Profit Margin', value: `${selectedReport.summary.profitMargin}%`, icon: BarChart3, color: 'text-[#0ab6ff]', isPercentage: true }
//                 ].map((item, i) => (
//                   <div key={i} className="bg-[#0c111a] border border-[#14e7ff]/20 rounded-lg p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <item.icon className={item.color} size={20} />
//                       <span className="text-sm text-[#e7f0fa]/60">{item.label}</span>
//                     </div>
//                     <p className={`text-2xl font-bold ${item.color}`}>
//                       {item.isPercentage ? item.value : formatCurrency(item.value as number)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {selectedReport.categoryBreakdown && (
//                 <div className="mb-8">
//                   <h2 className="text-xl font-semibold text-[#e7f0fa] mb-4 flex items-center gap-2">
//                     <PieChart size={20} className="text-[#14e7ff]" />Category Breakdown
//                   </h2>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                     {selectedReport.categoryBreakdown.map((cat, idx) => (
//                       <div key={idx} className="bg-[#0c111a] border border-[#14e7ff]/20 rounded-lg p-3">
//                         <div className="flex items-center gap-2 mb-1">
//                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
//                           <span className="text-sm text-[#e7f0fa]/60">{cat.name}</span>
//                         </div>
//                         <p className="text-lg font-semibold text-[#e7f0fa]">{formatCurrency(cat.value)}</p>
//                         {cat.percentage && <p className="text-xs text-[#e7f0fa]/40">{cat.percentage}%</p>}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {selectedReport.monthlyData && (
//                 <div className="mb-8">
//                   <h2 className="text-xl font-semibold text-[#e7f0fa] mb-4">Monthly Summary</h2>
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead>
//                         <tr className="border-b border-[#14e7ff]/20">
//                           {['Month', 'Income', 'Expenses', 'Net'].map(h => (
//                             <th key={h} className={`${h === 'Month' ? 'text-left' : 'text-right'} text-[#e7f0fa]/60 py-3 px-4`}>{h}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {selectedReport.monthlyData.map((m, i) => (
//                           <tr key={i} className="border-b border-[#14e7ff]/10">
//                             <td className="py-3 px-4 text-[#e7f0fa]">{m.month}</td>
//                             <td className="py-3 px-4 text-right text-green-500">{formatCurrency(m.income)}</td>
//                             <td className="py-3 px-4 text-right text-red-500">{formatCurrency(m.expenses)}</td>
//                             <td className="py-3 px-4 text-right text-[#14e7ff] font-semibold">{formatCurrency(m.net)}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {selectedReport.type === 'tax_summary' && (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//                 {[
//                   { label: 'Taxable Income', value: selectedReport.summary.taxableIncome, icon: DollarSign, color: 'text-green-500' },
//                   { label: 'Deductible Expenses', value: selectedReport.summary.deductibleExpenses, icon: TrendingDown, color: 'text-[#14e7ff]' },
//                   { label: 'Net Taxable Income', value: selectedReport.summary.netTaxableIncome, icon: BarChart3, color: 'text-[#0ab6ff]' }
//                 ].map((item, i) => (
//                   <div key={i} className="bg-[#0c111a] border border-[#14e7ff]/20 rounded-lg p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <item.icon className={item.color} size={20} />
//                       <span className="text-sm text-[#e7f0fa]/60">{item.label}</span>
//                     </div>
//                     <p className={`text-2xl font-bold ${item.color}`}>{formatCurrency(item.value)}</p>
//                   </div>
//                 ))}
//               </div>

//               {selectedReport.taxBreakdown && (
//                 <div className="mb-8">
//                   <h2 className="text-xl font-semibold text-[#e7f0fa] mb-4">Tax Breakdown</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                     {selectedReport.taxBreakdown.map((item, idx) => (
//                       <div key={idx} className="bg-[#0c111a] border border-[#14e7ff]/20 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
//                           <span className="text-sm text-[#e7f0fa]/60">{item.name}</span>
//                         </div>
//                         <p className="text-xl font-semibold text-[#e7f0fa]">{formatCurrency(item.value)}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {selectedReport.type === 'cashflow' && (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//                 {[
//                   { label: 'Opening Balance', value: selectedReport.summary.openingBalance, icon: DollarSign, color: 'text-[#e7f0fa]' },
//                   { label: 'Total Inflows', value: selectedReport.summary.totalInflows, icon: TrendingUp, color: 'text-green-500' },
//                   { label: 'Total Outflows', value: selectedReport.summary.totalOutflows, icon: TrendingDown, color: 'text-red-500' },
//                   { label: 'Closing Balance', value: selectedReport.summary.closingBalance, icon: DollarSign, color: 'text-[#14e7ff]' }
//                 ].map((item, i) => (
//                   <div key={i} className="bg-[#0c111a] border border-[#14e7ff]/20 rounded-lg p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <item.icon className={item.color} size={20} />
//                       <span className="text-sm text-[#e7f0fa]/60">{item.label}</span>
//                     </div>
//                     <p className={`text-2xl font-bold ${item.color}`}>{formatCurrency(item.value)}</p>
//                   </div>
//                 ))}
//               </div>

//               {selectedReport.cashflowByCategory && (
//                 <div className="mb-8">
//                   <h2 className="text-xl font-semibold text-[#e7f0fa] mb-4">Cash Flow by Category</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                     {selectedReport.cashflowByCategory.map((cat, idx) => (
//                       <div key={idx} className="bg-[#0c111a] border border-[#14e7ff]/20 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
//                           <span className="text-sm text-[#e7f0fa]/60">{cat.name}</span>
//                         </div>
//                         <p className="text-xl font-semibold text-[#e7f0fa]">{formatCurrency(cat.value)}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           <div>
//             <h2 className="text-xl font-semibold text-[#e7f0fa] mb-4">Detailed Transactions</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-[#14e7ff]/20">
//                     {['Date', 'Description', 'Category', 'Amount'].map(h => (
//                       <th key={h} className={`${h === 'Amount' ? 'text-right' : 'text-left'} text-[#e7f0fa]/60 py-3 px-4`}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedReport.transactions.map((txn) => (
//                     <tr key={txn.id} className="border-b border-[#14e7ff]/10 hover:bg-[#0c111a]/50">
//                       <td className="py-3 px-4 text-[#e7f0fa]/80">{formatDate(txn.date)}</td>
//                       <td className="py-3 px-4 text-[#e7f0fa]">{txn.description}</td>
//                       <td className="py-3 px-4">
//                         <span className="inline-block px-2 py-1 bg-[#14e7ff]/10 text-[#14e7ff] rounded text-xs">{txn.category}</span>
//                       </td>
//                       <td className={`py-3 px-4 text-right font-semibold ${txn.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                         {txn.amount >= 0 ? '+' : '-'}{formatCurrency(txn.amount)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="mt-8 pt-6 border-t border-[#14e7ff]/20 text-center text-sm text-[#e7f0fa]/40">
//             <p>Generated by FinSure Financial Management System</p>
//             <p className="mt-1">This report is confidential and intended for authorized use only.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-[#e7f0fa]">Generated Reports</h1>
//           <p className="text-[#e7f0fa]/60">View, download, and share your financial reports</p>
//         </div>
//         <button onClick={() => setShowGenerateModal(true)} className="flex items-center gap-2 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-4 py-2 rounded-lg font-medium transition-colors">
//           <Plus size={18} /><span>Generate Report</span>
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {reports.map((report) => (
//           <div key={report.id} className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6 hover:border-[#14e7ff] transition-all duration-300">
//             <div className="w-12 h-12 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-4">
//               <FileText className="text-[#14e7ff]" size={24} />
//             </div>
//             <h3 className="text-lg font-semibold text-[#e7f0fa] mb-2 line-clamp-2">{report.title}</h3>
//             <div className="space-y-2 mb-4">
//               <p className="text-sm text-[#e7f0fa]/60">Generated: {formatDate(report.generatedDate)}</p>
//               <p className="text-sm text-[#e7f0fa]/60">Period: {report.dateRange}</p>
//               <span className="inline-block px-2 py-1 bg-[#14e7ff]/10 text-[#14e7ff] rounded text-xs font-medium">
//                 {reportTypeNames[report.type]}
//               </span>
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => viewReportDetails(report)} className="flex-1 flex items-center justify-center gap-2 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] py-2 rounded-lg font-medium transition-colors">
//                 <FileText size={16} /><span>View Report</span>
//               </button>
//               <button onClick={() => shareReport(report)} className="flex items-center justify-center bg-[#151c27] hover:bg-[#14e7ff]/10 text-[#14e7ff] border border-[#14e7ff] p-2 rounded-lg transition-colors">
//                 <Share2 size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showGenerateModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-8 max-w-md w-full">
//             <h2 className="text-2xl font-bold text-[#e7f0fa] mb-6">Generate New Report</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-[#e7f0fa] mb-2">Report Type</label>
//                 <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full bg-[#0c111a] text-[#e7f0fa] border border-[#14e7ff]/20 rounded-lg px-4 py-2 focus:border-[#14e7ff] focus:outline-none">
//                   <option value="income_expense">Income vs Expense</option>
//                   <option value="tax_summary">Tax Summary</option>
//                   <option value="cashflow">Cash Flow Analysis</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-[#e7f0fa] mb-2">Start Date</label>
//                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-[#0c111a] text-[#e7f0fa] border border-[#14e7ff]/20 rounded-lg px-4 py-2 focus:border-[#14e7ff] focus:outline-none" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-[#e7f0fa] mb-2">End Date</label>
//                 <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-[#0c111a] text-[#e7f0fa] border border-[#14e7ff]/20 rounded-lg px-4 py-2 focus:border-[#14e7ff] focus:outline-none" />
//               </div>
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button onClick={generateReport} disabled={isGenerating} className="flex-1 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
//                 {isGenerating ? <><Loader className="animate-spin" size={18} /><span>Generating...</span></> : 'Generate'}
//               </button>
//               <button onClick={() => setShowGenerateModal(false)} disabled={isGenerating} className="px-6 bg-[#151c27] hover:bg-[#14e7ff]/10 text-[#e7f0fa] border border-[#14e7ff]/20 py-3 rounded-lg font-medium transition-colors">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isLoadingDetails && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#14e7ff]"></div>
//         </div>
//       )}
//     </div>
//   );
// };




import React, { useState, useEffect } from 'react';
import { FileText, Download, Share2, Plus, Loader, ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3 } from 'lucide-react';
import { mockApi } from '../services/apiClient';
import { toast } from '../utils/toast';

interface Report {
  id: string;
  title: string;
  generatedDate: string;
  type: string;
  dateRange: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type?: string;
  taxable?: boolean;
  flowType?: string;
}

interface DetailedReport {
  reportId: string;
  type: string;
  title: string;
  dateRange: string;
  generatedDate: string;
  summary: any;
  transactions: Transaction[];
  monthlyData?: any[];
  taxBreakdown?: any[];
  weeklyData?: any[];
}

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [reportType, setReportType] = useState('income_expense');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedReport, setSelectedReport] = useState<DetailedReport | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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

  const viewReportDetails = async (report: Report) => {
    setIsLoadingDetails(true);
    try {
      const detailedReport = await mockApi.reports.getDetailedReport(report.id);
      setSelectedReport(detailedReport);
    } catch (error) {
      toast.error('Failed to load report details');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const downloadReportPDF = async () => {
    if (!selectedReport) return;
    setIsDownloading(true);
    try {
      await mockApi.reports.downloadReportPDF(selectedReport.reportId);
      window.print();
      toast.success('Report ready for download!');
    } catch (error) {
      toast.error('Failed to download report');
    } finally {
      setIsDownloading(false);
    }
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.abs(amount));
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

  if (selectedReport) {
    return (
      <div className="space-y-6">
        <style>{`
          @media print {
            @page { size: A4; margin: 15mm; }
            body { background: white !important; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            body * { visibility: hidden; }
            #pdf-content, #pdf-content * { visibility: visible; }
            #pdf-content { 
              position: absolute; 
              left: 0; 
              top: 0; 
              width: 100%; 
              background: white !important;
              color: #000 !important;
            }
            .no-print { display: none !important; }
            .print-header { 
              background: linear-gradient(135deg, #0ab6ff 0%, #14e7ff 100%) !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-card {
              border: 1px solid #ddd !important;
              background: #f9f9f9 !important;
              page-break-inside: avoid;
            }
            .print-text { color: #000 !important; }
            .print-text-secondary { color: #555 !important; }
            .print-positive { color: #059669 !important; }
            .print-negative { color: #dc2626 !important; }
            .print-primary { color: #0ab6ff !important; }
            .print-border { border-color: #ddd !important; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
          }
        `}</style>

        <div className="flex items-center justify-between no-print">
          <button onClick={() => setSelectedReport(null)} className="flex items-center gap-2 text-[#14e7ff] hover:text-[#0ab6ff] transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Reports</span>
          </button>
          <button onClick={downloadReportPDF} disabled={isDownloading} className="flex items-center gap-2 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
            {isDownloading ? <><Loader className="animate-spin" size={18} /><span>Preparing...</span></> : <><Download size={18} /><span>Download PDF</span></>}
          </button>
        </div>

        <div id="pdf-content" className="bg-white text-black p-8 rounded-lg" style={{ maxWidth: '210mm', margin: '0 auto' }}>
          {/* Header with FINSURE Branding */}
          <div className="print-header bg-gradient-to-r from-[#0ab6ff] to-[#14e7ff] text-white p-6 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-wide mb-1">FINSURE</h1>
                <p className="text-sm opacity-90">Financial Management System</p>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-90">Report ID</div>
                <div className="font-mono text-sm">{selectedReport.reportId}</div>
              </div>
            </div>
          </div>

          {/* Report Title */}
          <div className="mb-6 pb-4 border-b-2 print-border">
            <h2 className="text-2xl font-bold print-text mb-2">{selectedReport.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm print-text-secondary">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>Period: {selectedReport.dateRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={14} />
                <span>Generated: {formatDate(selectedReport.generatedDate)}</span>
              </div>
            </div>
          </div>

          {/* Income vs Expense Report */}
          {selectedReport.type === 'income_expense' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Income', value: selectedReport.summary.totalIncome, icon: TrendingUp, className: 'print-positive' },
                  { label: 'Total Expenses', value: selectedReport.summary.totalExpenses, icon: TrendingDown, className: 'print-negative' },
                  { label: 'Net Balance', value: selectedReport.summary.netBalance, icon: DollarSign, className: 'print-primary' },
                  { label: 'Profit Margin', value: `${selectedReport.summary.profitMargin}%`, icon: BarChart3, className: 'print-primary', isPercentage: true }
                ].map((item, i) => (
                  <div key={i} className="print-card border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className={item.className} size={16} />
                      <span className="text-xs print-text-secondary">{item.label}</span>
                    </div>
                    <p className={`text-xl font-bold ${item.className}`}>
                      {item.isPercentage ? item.value : formatCurrency(item.value as number)}
                    </p>
                  </div>
                ))}
              </div>

              {selectedReport.monthlyData && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold print-text mb-3">Monthly Summary</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 print-border">
                        {['Month', 'Income', 'Expenses', 'Net'].map(h => (
                          <th key={h} className={`${h === 'Month' ? 'text-left' : 'text-right'} print-text-secondary text-sm py-2 px-2`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReport.monthlyData.map((m, i) => (
                        <tr key={i} className="border-b print-border">
                          <td className="py-2 px-2 print-text text-sm">{m.month}</td>
                          <td className="py-2 px-2 text-right print-positive text-sm font-semibold">{formatCurrency(m.income)}</td>
                          <td className="py-2 px-2 text-right print-negative text-sm font-semibold">{formatCurrency(m.expenses)}</td>
                          <td className="py-2 px-2 text-right print-primary text-sm font-bold">{formatCurrency(m.net)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Tax Summary Report */}
          {selectedReport.type === 'tax_summary' && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Taxable Income', value: selectedReport.summary.taxableIncome, icon: DollarSign, className: 'print-positive' },
                  { label: 'Deductible Expenses', value: selectedReport.summary.deductibleExpenses, icon: TrendingDown, className: 'print-primary' },
                  { label: 'Net Taxable Income', value: selectedReport.summary.netTaxableIncome, icon: BarChart3, className: 'print-primary' }
                ].map((item, i) => (
                  <div key={i} className="print-card border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className={item.className} size={16} />
                      <span className="text-xs print-text-secondary">{item.label}</span>
                    </div>
                    <p className={`text-xl font-bold ${item.className}`}>{formatCurrency(item.value)}</p>
                  </div>
                ))}
              </div>

              {selectedReport.taxBreakdown && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold print-text mb-3">Tax Breakdown</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedReport.taxBreakdown.map((item, idx) => (
                      <div key={idx} className="print-card border rounded-lg p-3">
                        <span className="text-xs print-text-secondary block mb-1">{item.name}</span>
                        <p className="text-lg font-semibold print-text">{formatCurrency(item.value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Cash Flow Report */}
          {selectedReport.type === 'cashflow' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Opening Balance', value: selectedReport.summary.openingBalance, icon: DollarSign, className: 'print-text' },
                  { label: 'Total Inflows', value: selectedReport.summary.totalInflows, icon: TrendingUp, className: 'print-positive' },
                  { label: 'Total Outflows', value: selectedReport.summary.totalOutflows, icon: TrendingDown, className: 'print-negative' },
                  { label: 'Closing Balance', value: selectedReport.summary.closingBalance, icon: DollarSign, className: 'print-primary' }
                ].map((item, i) => (
                  <div key={i} className="print-card border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className={item.className} size={16} />
                      <span className="text-xs print-text-secondary">{item.label}</span>
                    </div>
                    <p className={`text-xl font-bold ${item.className}`}>{formatCurrency(item.value)}</p>
                  </div>
                ))}
              </div>

              {selectedReport.weeklyData && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold print-text mb-3">Weekly Cash Flow</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 print-border">
                        {['Week', 'Inflow', 'Outflow', 'Net'].map(h => (
                          <th key={h} className={`${h === 'Week' ? 'text-left' : 'text-right'} print-text-secondary text-sm py-2 px-2`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReport.weeklyData.slice(0, 10).map((w, i) => (
                        <tr key={i} className="border-b print-border">
                          <td className="py-2 px-2 print-text text-sm">{w.week}</td>
                          <td className="py-2 px-2 text-right print-positive text-sm font-semibold">{formatCurrency(w.inflow)}</td>
                          <td className="py-2 px-2 text-right print-negative text-sm font-semibold">{formatCurrency(w.outflow)}</td>
                          <td className="py-2 px-2 text-right print-primary text-sm font-bold">{formatCurrency(w.net)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Transactions Table */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold print-text mb-3">Detailed Transactions</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 print-border">
                  <th className="text-left print-text-secondary text-sm py-2 px-2">Date</th>
                  <th className="text-right print-text-secondary text-sm py-2 px-2">Amount</th>
                  <th className="text-right print-text-secondary text-sm py-2 px-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {selectedReport.transactions.map((txn) => (
                  <tr key={txn.id} className="border-b print-border">
                    <td className="py-2 px-2 print-text text-sm">{formatDate(txn.date)}</td>
                    <td className={`py-2 px-2 text-right font-semibold text-sm ${txn.amount >= 0 ? 'print-positive' : 'print-negative'}`}>
                      {txn.amount >= 0 ? '+' : ''}{formatCurrency(txn.amount)}
                    </td>
                    <td className="py-2 px-2 text-right text-sm print-text-secondary capitalize">
                      {txn.type || txn.flowType || (txn.amount >= 0 ? 'Income' : 'Expense')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t-2 print-border text-center">
            <p className="text-xs print-text-secondary mb-1">Generated by <span className="font-bold text-[#0ab6ff]">FINSURE</span> Financial Management System</p>
            <p className="text-xs print-text-secondary">This report is confidential and intended for authorized use only.</p>
            <p className="text-xs print-text-secondary mt-2">www.finsure.app | support@finsure.com</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#e7f0fa]">Generated Reports</h1>
          <p className="text-[#e7f0fa]/60">View, download, and share your financial reports</p>
        </div>
        <button onClick={() => setShowGenerateModal(true)} className="flex items-center gap-2 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={18} /><span>Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6 hover:border-[#14e7ff] transition-all duration-300">
            <div className="w-12 h-12 bg-[#14e7ff]/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="text-[#14e7ff]" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-[#e7f0fa] mb-2 line-clamp-2">{report.title}</h3>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-[#e7f0fa]/60">Generated: {formatDate(report.generatedDate)}</p>
              <p className="text-sm text-[#e7f0fa]/60">Period: {report.dateRange}</p>
              <span className="inline-block px-2 py-1 bg-[#14e7ff]/10 text-[#14e7ff] rounded text-xs font-medium">
                {reportTypeNames[report.type]}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => viewReportDetails(report)} className="flex-1 flex items-center justify-center gap-2 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] py-2 rounded-lg font-medium transition-colors">
                <FileText size={16} /><span>View Report</span>
              </button>
              <button onClick={() => shareReport(report)} className="flex items-center justify-center bg-[#151c27] hover:bg-[#14e7ff]/10 text-[#14e7ff] border border-[#14e7ff] p-2 rounded-lg transition-colors">
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
                <label className="block text-sm font-medium text-[#e7f0fa] mb-2">Report Type</label>
                <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full bg-[#0c111a] text-[#e7f0fa] border border-[#14e7ff]/20 rounded-lg px-4 py-2 focus:border-[#14e7ff] focus:outline-none">
                  <option value="income_expense">Income vs Expense</option>
                  <option value="tax_summary">Tax Summary</option>
                  <option value="cashflow">Cash Flow Analysis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#e7f0fa] mb-2">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-[#0c111a] text-[#e7f0fa] border border-[#14e7ff]/20 rounded-lg px-4 py-2 focus:border-[#14e7ff] focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#e7f0fa] mb-2">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-[#0c111a] text-[#e7f0fa] border border-[#14e7ff]/20 rounded-lg px-4 py-2 focus:border-[#14e7ff] focus:outline-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={generateReport} disabled={isGenerating} className="flex-1 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {isGenerating ? <><Loader className="animate-spin" size={18} /><span>Generating...</span></> : 'Generate'}
              </button>
              <button onClick={() => setShowGenerateModal(false)} disabled={isGenerating} className="px-6 bg-[#151c27] hover:bg-[#14e7ff]/10 text-[#e7f0fa] border border-[#14e7ff]/20 py-3 rounded-lg font-medium transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoadingDetails && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#14e7ff]"></div>
        </div>
      )}
    </div>
  );
};
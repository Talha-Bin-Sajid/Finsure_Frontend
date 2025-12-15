// import axios from 'axios';
// import mockData from '../data/mockData.json';

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 🔹 REAL AUTH API
// export const authApi = {
//   signup: async (data: {
//     name: string;
//     email: string;
//     password: string;
//     userType: string;
//   }) => {
//     const res = await apiClient.post('/api/v1/auth/signup', data);
//     return res.data;
//   },

//   login: async (data: { email: string; password: string }) => {
//     const res = await apiClient.post('/api/v1/auth/login', data);
//     return res.data;
//   },
// };


// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// // Helper function to generate mock detailed report data
// const generateMockDetailedReport = (reportId: string, type: string, dateRange: string) => {
//   const now = new Date().toISOString();
  
//   if (type === 'income_expense') {
//     return {
//       reportId,
//       type,
//       title: 'Income vs Expense Report',
//       dateRange,
//       generatedDate: now,
//       summary: {
//         totalIncome: 145000.00,
//         totalExpenses: 89500.00,
//         netBalance: 55500.00,
//         profitMargin: 38.3
//       },
//       transactions: [
//         { id: 't1', date: '2024-12-02', description: 'Client Payment - Web Development', category: 'Income', amount: 45000.00, taxable: true },
//         { id: 't2', date: '2024-12-05', description: 'Office Rent - December', category: 'Rent', amount: -15000.00, taxable: false },
//         { id: 't3', date: '2024-12-08', description: 'Software Licenses', category: 'Software', amount: -8500.00, taxable: true },
//         { id: 't4', date: '2024-12-10', description: 'Consulting Services Payment', category: 'Income', amount: 55000.00, taxable: true },
//         { id: 't5', date: '2024-12-12', description: 'Marketing & Advertising', category: 'Marketing', amount: -12000.00, taxable: true },
//         { id: 't6', date: '2024-12-14', description: 'Freelance Project Payment', category: 'Income', amount: 45000.00, taxable: true },
//         { id: 't7', date: '2024-12-15', description: 'Equipment & Supplies', category: 'Equipment', amount: -24000.00, taxable: true },
//         { id: 't8', date: '2024-12-15', description: 'Utilities Bill', category: 'Utilities', amount: -5000.00, taxable: false }
//       ],
//       categoryBreakdown: [
//         { name: 'Income', value: 145000, color: '#10b981', percentage: 61.8 },
//         { name: 'Rent', value: 15000, color: '#ef4444', percentage: 6.4 },
//         { name: 'Software', value: 8500, color: '#3b82f6', percentage: 3.6 },
//         { name: 'Marketing', value: 12000, color: '#f59e0b', percentage: 5.1 },
//         { name: 'Equipment', value: 24000, color: '#8b5cf6', percentage: 10.2 },
//         { name: 'Utilities', value: 5000, color: '#f97316', percentage: 2.1 }
//       ],
//       monthlyData: [
//         { month: 'December (1-15)', income: 145000, expenses: 89500, net: 55500 }
//       ]
//     };
//   } else if (type === 'tax_summary') {
//     return {
//       reportId,
//       type,
//       title: 'Tax Summary Report',
//       dateRange,
//       generatedDate: now,
//       summary: {
//         totalIncome: 145000.00,
//         taxableIncome: 145000.00,
//         nonTaxableIncome: 0.00,
//         deductibleExpenses: 44500.00,
//         netTaxableIncome: 100500.00
//       },
//       transactions: [
//         { id: 't1', date: '2024-12-02', description: 'Client Payment - Web Development', category: 'Income', amount: 45000.00, taxable: true },
//         { id: 't2', date: '2024-12-05', description: 'Office Rent - December', category: 'Rent', amount: -15000.00, taxable: false },
//         { id: 't3', date: '2024-12-08', description: 'Software Licenses', category: 'Software', amount: -8500.00, taxable: true },
//         { id: 't4', date: '2024-12-10', description: 'Consulting Services Payment', category: 'Income', amount: 55000.00, taxable: true },
//         { id: 't5', date: '2024-12-12', description: 'Marketing & Advertising', category: 'Marketing', amount: -12000.00, taxable: true },
//         { id: 't6', date: '2024-12-14', description: 'Freelance Project Payment', category: 'Income', amount: 45000.00, taxable: true },
//         { id: 't7', date: '2024-12-15', description: 'Equipment & Supplies', category: 'Equipment', amount: -24000.00, taxable: true }
//       ],
//       taxBreakdown: [
//         { name: 'Taxable Income', value: 145000, color: '#10b981' },
//         { name: 'Deductible Expenses', value: 44500, color: '#3b82f6' },
//         { name: 'Non-Deductible Expenses', value: 20000, color: '#ef4444' }
//       ]
//     };
//   } else if (type === 'cashflow') {
//     return {
//       reportId,
//       type,
//       title: 'Cash Flow Analysis Report',
//       dateRange,
//       generatedDate: now,
//       summary: {
//         openingBalance: 75000.00,
//         totalInflows: 145000.00,
//         totalOutflows: 89500.00,
//         closingBalance: 130500.00,
//         netCashFlow: 55500.00
//       },
//       transactions: [
//         { id: 't1', date: '2024-12-02', description: 'Client Payment - Web Development', category: 'Operating Inflow', amount: 45000.00, type: 'inflow' },
//         { id: 't2', date: '2024-12-05', description: 'Office Rent - December', category: 'Operating Outflow', amount: -15000.00, type: 'outflow' },
//         { id: 't3', date: '2024-12-08', description: 'Software Licenses', category: 'Operating Outflow', amount: -8500.00, type: 'outflow' },
//         { id: 't4', date: '2024-12-10', description: 'Consulting Services Payment', category: 'Operating Inflow', amount: 55000.00, type: 'inflow' },
//         { id: 't5', date: '2024-12-12', description: 'Marketing & Advertising', category: 'Operating Outflow', amount: -12000.00, type: 'outflow' },
//         { id: 't6', date: '2024-12-14', description: 'Freelance Project Payment', category: 'Operating Inflow', amount: 45000.00, type: 'inflow' },
//         { id: 't7', date: '2024-12-15', description: 'Equipment & Supplies', category: 'Investing Outflow', amount: -24000.00, type: 'outflow' }
//       ],
//       cashflowByCategory: [
//         { name: 'Operating Inflows', value: 145000, color: '#10b981' },
//         { name: 'Operating Outflows', value: 65500, color: '#ef4444' },
//         { name: 'Investing Outflows', value: 24000, color: '#f59e0b' }
//       ],
//       weeklyData: [
//         { week: 'Week 1 (Dec 1-7)', inflow: 45000, outflow: 23500, net: 21500 },
//         { week: 'Week 2 (Dec 8-14)', inflow: 100000, outflow: 36000, net: 64000 },
//         { week: 'Week 3 (Dec 15)', inflow: 0, outflow: 30000, net: -30000 }
//       ]
//     };
//   }
  
//   return null;
// };

// export const mockApi = {
//   auth: {
//     login: async (email: string, password: string) => {
//       await delay(800);
//       const user = mockData.users.find(u => u.email === email && u.password === password);
//       if (user) {
//         const token = `mock-token-${user.id}`;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('user', JSON.stringify({ id: user.id, email: user.email, name: user.name, avatar: user.avatar }));
//         return { success: true, token, user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar } };
//       }
//       throw new Error('Invalid credentials');
//     },
//     signup: async (email: string, password: string, name: string) => {
//       await delay(1000);
//       const newUser = {
//         id: String(mockData.users.length + 1),
//         email,
//         name,
//         avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
//         twoFactorEnabled: false
//       };
//       const token = `mock-token-${newUser.id}`;
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('user', JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name, avatar: newUser.avatar }));
//       return { success: true, token, user: { id: newUser.id, email: newUser.email, name: newUser.name, avatar: newUser.avatar } };
//     },
//     verify2FA: async (code: string) => {
//       await delay(600);
//       if (code === '123456') {
//         return { success: true };
//       }
//       throw new Error('Invalid 2FA code');
//     },
//     logout: () => {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('user');
//     }
//   },
//   dashboard: {
//     getSummary: async () => {
//       await delay(500);
//       return mockData.dashboardSummary;
//     },
//     getRecentUploads: async () => {
//       await delay(400);
//       return mockData.recentUploads;
//     },
//     getActivities: async () => {
//       await delay(300);
//       return mockData.activities;
//     }
//   },
//   upload: {
//     uploadFile: async (file: File, fileType: string) => {
//       await delay(2000);
//       const newUpload = {
//         id: String(Date.now()),
//         fileName: file.name,
//         uploadDate: new Date().toISOString(),
//         status: 'processing',
//         fileType
//       };
//       return { success: true, upload: newUpload };
//     }
//   },
//   extractions: {
//     getByFileId: async (fileId: string) => {
//       await delay(600);
//       const extraction = mockData.extractions.find(e => e.fileId === fileId);
//       return extraction || { id: fileId, fileId, transactions: [] };
//     },
//     updateTransaction: async (fileId: string, transactionId: string, updates: any) => {
//       await delay(400);
//       return { success: true, transaction: { id: transactionId, ...updates } };
//     }
//   },
//   reports: {
//     getAll: async () => {
//       await delay(500);
//       return mockData.reports;
//     },
//     generate: async (reportType: string, dateRange: string) => {
//       await delay(1500);
//       const newReportId = `r${Date.now()}`;
//       const reportTypeNames: { [key: string]: string } = {
//         income_expense: 'Income vs Expense',
//         tax_summary: 'Tax Summary',
//         cashflow: 'Cash Flow Analysis'
//       };
      
//       const newReport = {
//         id: newReportId,
//         title: `${reportTypeNames[reportType]} Report`,
//         generatedDate: new Date().toISOString(),
//         type: reportType,
//         dateRange
//       };
      
//       // Create corresponding detailed report with sample data
//       const newDetailedReport = generateMockDetailedReport(newReportId, reportType, dateRange);
      
//       // Store in memory (in a real app, this would be stored in backend)
//       if (!mockData.detailedReports) {
//         mockData.detailedReports = [];
//       }
//       mockData.detailedReports.push(newDetailedReport);
//       mockData.reports.push(newReport);
      
//       return { success: true, report: newReport };
//     },
//     getDetailedReport: async (reportId: string) => {
//       await delay(800);
//       // Find the report in mockData
//       const report = mockData.reports.find(r => r.id === reportId);
//       if (!report) {
//         throw new Error('Report not found');
//       }
      
//       // Return detailed report data based on the report found
//       const detailedReport = mockData.detailedReports.find(dr => dr.reportId === reportId);
//       return detailedReport || mockData.detailedReports[0]; // Fallback to first report
//     },
//     downloadReportPDF: async (reportId: string) => {
//       await delay(1000);
//       // This would call the backend endpoint: /api/v1/reports/${reportId}/download
//       // For now, return success to indicate the download would work
//       return { success: true, message: 'Report download initiated' };
//     }
//   },
//   charts: {
//     getData: async () => {
//       await delay(400);
//       return mockData.chartData;
//     }
//   },
//   history: {
//     getAll: async (filters?: any) => {
//       await delay(600);
//       return mockData.history;
//     }
//   }
// };

// export default apiClient;





import axios from 'axios';
import mockData from '../data/mockData.json';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 REAL AUTH API
export const authApi = {
  signup: async (data: {
    name: string;
    email: string;
    password: string;
    userType: string;
  }) => {
    const res = await apiClient.post('/api/v1/auth/signup', data);
    return res.data;
  },

  login: async (data: { email: string; password: string }) => {
    const res = await apiClient.post('/api/v1/auth/login', data);
    return res.data;
  },
};


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Store generated reports in memory
const generatedReports: any[] = [...mockData.reports];
const generatedDetailedReports: any[] = [...mockData.detailedReports];

export const mockApi = {
  auth: {
    login: async (email: string, password: string) => {
      await delay(800);
      const user = mockData.users.find(u => u.email === email && u.password === password);
      if (user) {
        const token = `mock-token-${user.id}`;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify({ id: user.id, email: user.email, name: user.name, avatar: user.avatar }));
        return { success: true, token, user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar } };
      }
      throw new Error('Invalid credentials');
    },
    signup: async (email: string, password: string, name: string) => {
      await delay(1000);
      const newUser = {
        id: String(mockData.users.length + 1),
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        twoFactorEnabled: false
      };
      const token = `mock-token-${newUser.id}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name, avatar: newUser.avatar }));
      return { success: true, token, user: { id: newUser.id, email: newUser.email, name: newUser.name, avatar: newUser.avatar } };
    },
    verify2FA: async (code: string) => {
      await delay(600);
      if (code === '123456') {
        return { success: true };
      }
      throw new Error('Invalid 2FA code');
    },
    logout: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },
  dashboard: {
    getSummary: async () => {
      await delay(500);
      return mockData.dashboardSummary;
    },
    getRecentUploads: async () => {
      await delay(400);
      return mockData.recentUploads;
    },
    getActivities: async () => {
      await delay(300);
      return mockData.activities;
    }
  },
  upload: {
    uploadFile: async (file: File, fileType: string) => {
      await delay(2000);
      const newUpload = {
        id: String(Date.now()),
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        status: 'processing',
        fileType
      };
      return { success: true, upload: newUpload };
    }
  },
  extractions: {
    getByFileId: async (fileId: string) => {
      await delay(600);
      const extraction = mockData.extractions.find(e => e.fileId === fileId);
      return extraction || { id: fileId, fileId, transactions: [] };
    },
    updateTransaction: async (fileId: string, transactionId: string, updates: any) => {
      await delay(400);
      return { success: true, transaction: { id: transactionId, ...updates } };
    }
  },
  reports: {
    getAll: async () => {
      await delay(500);
      return generatedReports;
    },
    generate: async (reportType: string, dateRange: string) => {
      await delay(1500);
      const newReportId = `r${Date.now()}`;
      const reportTypeNames: { [key: string]: string } = {
        income_expense: 'Income vs Expense',
        tax_summary: 'Tax Summary',
        cashflow: 'Cash Flow Analysis'
      };
      
      const newReport = {
        id: newReportId,
        title: `${reportTypeNames[reportType]} Report`,
        generatedDate: new Date().toISOString(),
        type: reportType,
        dateRange
      };
      
      // Get template for this report type from mockData
      const template = mockData.reportTemplates[reportType];
      if (template) {
        const newDetailedReport = {
          ...template,
          reportId: newReportId,
          title: `${reportTypeNames[reportType]} Report`,
          dateRange,
          generatedDate: new Date().toISOString()
        };
        generatedDetailedReports.push(newDetailedReport);
      }
      
      generatedReports.push(newReport);
      return { success: true, report: newReport };
    },
    getDetailedReport: async (reportId: string) => {
      await delay(800);
      const detailedReport = generatedDetailedReports.find(dr => dr.reportId === reportId);
      if (!detailedReport) {
        throw new Error('Report not found');
      }
      return detailedReport;
    },
    downloadReportPDF: async (reportId: string) => {
      await delay(1000);
      // Backend endpoint: /api/v1/reports/${reportId}/download
      return { success: true, message: 'Report download initiated' };
    }
  },
  charts: {
    getData: async () => {
      await delay(400);
      return mockData.chartData;
    }
  },
  history: {
    getAll: async (filters?: any) => {
      await delay(600);
      return mockData.history;
    }
  }
};

export default apiClient;
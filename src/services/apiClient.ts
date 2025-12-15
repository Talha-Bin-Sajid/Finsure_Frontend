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

// // Store generated reports in memory
// const generatedReports: any[] = [...mockData.reports];
// const generatedDetailedReports: any[] = [...mockData.detailedReports];

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
//       return generatedReports;
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
      
//       // Get template for this report type from mockData
//       const template = mockData.reportTemplates[reportType];
//       if (template) {
//         const newDetailedReport = {
//           ...template,
//           reportId: newReportId,
//           title: `${reportTypeNames[reportType]} Report`,
//           dateRange,
//           generatedDate: new Date().toISOString()
//         };
//         generatedDetailedReports.push(newDetailedReport);
//       }
      
//       generatedReports.push(newReport);
//       return { success: true, report: newReport };
//     },
//     getDetailedReport: async (reportId: string) => {
//       await delay(800);
//       const detailedReport = generatedDetailedReports.find(dr => dr.reportId === reportId);
//       if (!detailedReport) {
//         throw new Error('Report not found');
//       }
//       return detailedReport;
//     },
//     downloadReportPDF: async (reportId: string) => {
//       await delay(1000);
//       // Backend endpoint: /api/v1/reports/${reportId}/download
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

// // Store generated reports in memory
// const generatedReports: any[] = [...(mockData.reports || [])];
// const generatedDetailedReports: any[] = [...(mockData.detailedReports || [])];

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
//       return generatedReports;
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
      
//       // Get template for this report type from mockData
//       // Cast mockData to any to access reportTemplates
//       const templates = (mockData as any).reportTemplates;
//       if (templates && templates[reportType]) {
//         const template = templates[reportType];
//         const newDetailedReport = {
//           ...template,
//           reportId: newReportId,
//           title: `${reportTypeNames[reportType]} Report`,
//           dateRange,
//           generatedDate: new Date().toISOString()
//         };
//         generatedDetailedReports.push(newDetailedReport);
//       }
      
//       generatedReports.push(newReport);
//       return { success: true, report: newReport };
//     },
//     getDetailedReport: async (reportId: string) => {
//       await delay(800);
//       const detailedReport = generatedDetailedReports.find(dr => dr.reportId === reportId);
//       if (!detailedReport) {
//         throw new Error('Report not found');
//       }
//       return detailedReport;
//     },
//     downloadReportPDF: async (reportId: string) => {
//       await delay(1000);
//       // Backend endpoint: /api/v1/reports/${reportId}/download
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
const generatedReports: any[] = [...(mockData.reports || [])];
const generatedDetailedReports: any[] = [...(mockData.detailedReports || [])];

// Create a map of reportId to detailed report for faster lookup
const detailedReportsMap = new Map(
  generatedDetailedReports.map(report => [report.reportId, report])
);

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
      const templates = (mockData as any).reportTemplates;
      if (templates && templates[reportType]) {
        const template = templates[reportType];
        const newDetailedReport = {
          ...template,
          reportId: newReportId,
          title: `${reportTypeNames[reportType]} Report`,
          dateRange,
          generatedDate: new Date().toISOString()
        };
        generatedDetailedReports.push(newDetailedReport);
        // Also add to the map for quick lookup
        detailedReportsMap.set(newReportId, newDetailedReport);
      }
      
      generatedReports.push(newReport);
      return { success: true, report: newReport };
    },
    getDetailedReport: async (reportId: string) => {
      await delay(800);
      // Use the map for faster and more reliable lookup
      const detailedReport = detailedReportsMap.get(reportId);
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
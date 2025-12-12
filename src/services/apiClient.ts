import axios from 'axios';
import mockData from '../data/mockData.json';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
      return mockData.reports;
    },
    generate: async (reportType: string, dateRange: string) => {
      await delay(1500);
      const newReport = {
        id: `r${mockData.reports.length + 1}`,
        title: `${reportType} Report`,
        generatedDate: new Date().toISOString(),
        type: reportType,
        dateRange
      };
      return { success: true, report: newReport };
    }
  },
  history: {
    getAll: async (filters?: any) => {
      await delay(600);
      return mockData.history;
    }
  },
  charts: {
    getData: async () => {
      await delay(400);
      return mockData.chartData;
    }
  }
};

export default apiClient;

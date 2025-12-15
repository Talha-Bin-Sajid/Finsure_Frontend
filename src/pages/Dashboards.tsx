import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockApi } from '../services/apiClient';
import { useTheme } from '../contexts/ThemeContext';

interface ChartData {
  categoryBreakdown: Array<{ name: string; value: number; color: string }>;
  monthlyTrend: Array<{ month: string; income: number; expenses: number }>;
  cashflow: Array<{ week: string; value: number }>;
}

export const Dashboards: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mockApi.charts.getData();
        setChartData(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14e7ff]"></div>
      </div>
    );
  }

  if (!chartData) return null;

  // Get theme-aware colors
  const bgColor = theme === 'dark' ? '#151c27' : '#f5f7fa';
  const borderColor = theme === 'dark' ? 'rgba(20, 231, 255, 0.2)' : '#e2e8f0';
  const textColor = theme === 'dark' ? '#e7f0fa' : '#1a202c';
  const gridColor = theme === 'dark' ? '#14e7ff20' : '#e2e8f0';
  const axisColor = theme === 'dark' ? '#e7f0fa60' : '#718096';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Visual Dashboards</h1>
        <p className="text-[var(--text-secondary)]">
          Interactive charts and visualizations of your financial data
        </p>
      </div>

      <div >
        

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Monthly Income vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="month"
                stroke={axisColor}
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke={axisColor}
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: bgColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  color: textColor
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend
                wrapperStyle={{ color: textColor }}
              />
              <Bar dataKey="income" fill="#14e7ff" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#0ab6ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Cash Flow Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.cashflow}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="week"
                stroke={axisColor}
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke={axisColor}
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: bgColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  color: textColor
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#14e7ff"
                strokeWidth={3}
                dot={{ fill: '#14e7ff', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Apache Superset Integration</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Connect to Apache Superset for advanced analytics and custom dashboards
        </p>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-12 text-center">
          <p className="text-[var(--text-secondary)] mb-4">Superset integration placeholder</p>
          <button className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-3 rounded-lg font-medium transition-colors">
            Configure Superset
          </button>
        </div>
      </div>
    </div>
  );
};
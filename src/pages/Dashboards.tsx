import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockApi } from '../services/apiClient';

interface ChartData {
  categoryBreakdown: Array<{ name: string; value: number; color: string }>;
  monthlyTrend: Array<{ month: string; income: number; expenses: number }>;
  cashflow: Array<{ week: string; value: number }>;
}

export const Dashboards: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#e7f0fa] mb-2">Visual Dashboards</h1>
        <p className="text-[#e7f0fa]/60">
          Interactive charts and visualizations of your financial data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#e7f0fa] mb-6">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151c27',
                  border: '1px solid rgba(20, 231, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#e7f0fa'
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {chartData.categoryBreakdown.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-[#e7f0fa]/80">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#e7f0fa] mb-6">Monthly Income vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#14e7ff20" />
              <XAxis
                dataKey="month"
                stroke="#e7f0fa60"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#e7f0fa60"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151c27',
                  border: '1px solid rgba(20, 231, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#e7f0fa'
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend
                wrapperStyle={{ color: '#e7f0fa' }}
              />
              <Bar dataKey="income" fill="#14e7ff" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#0ab6ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-[#e7f0fa] mb-6">Cash Flow Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.cashflow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#14e7ff20" />
              <XAxis
                dataKey="week"
                stroke="#e7f0fa60"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#e7f0fa60"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151c27',
                  border: '1px solid rgba(20, 231, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#e7f0fa'
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

      <div className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#e7f0fa] mb-4">Apache Superset Integration</h2>
        <p className="text-[#e7f0fa]/60 mb-4">
          Connect to Apache Superset for advanced analytics and custom dashboards
        </p>
        <div className="bg-[#0c111a] border border-[#14e7ff]/20 rounded-lg p-12 text-center">
          <p className="text-[#e7f0fa]/40 mb-4">Superset integration placeholder</p>
          <button className="bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] px-6 py-3 rounded-lg font-medium transition-colors">
            Configure Superset
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { SupersetDashboard } from '../components/dashboards/SupersetDashboard';

export const Dashboards: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Visual Dashboards
        </h1>
        <p className="text-[var(--text-secondary)]">
          Interactive charts and visualizations of your financial data, powered
          by Apache Superset.
        </p>
      </div>

      <SupersetDashboard />
    </div>
  );
};

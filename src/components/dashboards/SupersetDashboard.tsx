import React, { useEffect, useRef, useState } from 'react';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { AlertCircle, BarChart3, Upload } from 'lucide-react';

interface GuestTokenResponse {
  hasData: boolean;
  transactionCount: number;
  token?: string;
  dashboardId: string;
  supersetDomain: string;
}

/**
 * Embeds the FINSURE Apache Superset dashboard via the embedded-sdk.
 *
 * Flow:
 *  1. Call backend POST /api/v1/dashboards/guest-token (sends FINSURE JWT).
 *  2. Backend checks whether the caller has any transactions. If not, it
 *     returns {hasData:false} and we render a friendly empty-state card
 *     instead of embedding a dashboard full of "No results" tiles.
 *  3. Otherwise backend mints a short-lived guest token scoped to one
 *     dashboard with an RLS clause for the current user, and we mount the
 *     Superset iframe with it.
 */
export const SupersetDashboard: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const mount = async () => {
      setError(null);
      setIsLoading(true);
      setIsEmpty(false);

      try {
        const jwt = localStorage.getItem('authToken');
        const apiBase =
          (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000';

        const resp = await fetch(`${apiBase}/api/v1/dashboards/guest-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
          },
        });

        if (!resp.ok) {
          const body = await resp.text();
          throw new Error(
            `Guest token request failed (${resp.status}): ${body.slice(0, 240)}`
          );
        }

        const data = (await resp.json()) as GuestTokenResponse;
        if (cancelled) return;

        if (!data.hasData || !data.token) {
          setIsEmpty(true);
          return;
        }

        if (!mountRef.current) return;

        await embedDashboard({
          id: data.dashboardId,
          supersetDomain: data.supersetDomain,
          mountPoint: mountRef.current,
          fetchGuestToken: () => Promise.resolve(data.token!),
          dashboardUiConfig: {
            hideTitle: true,
            hideTab: false,
            hideChartControls: false,
            filters: { expanded: false },
          },
        });

        // Force the injected iframe to fill the card.
        const iframe = mountRef.current.querySelector('iframe');
        if (iframe) {
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = '0';
        }
      } catch (err: any) {
        if (!cancelled) setError(err?.message || 'Failed to load dashboard');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    mount();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isEmpty) {
    return (
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-10 flex flex-col items-center justify-center text-center" style={{ minHeight: '640px' }}>
        <div className="w-16 h-16 rounded-full bg-[#14e7ff]/10 flex items-center justify-center mb-5">
          <BarChart3 className="w-8 h-8 text-[#14e7ff]" />
        </div>
        <h3 className="text-[var(--text-primary)] text-xl font-semibold mb-2">
          No transactions yet
        </h3>
        <p className="text-[var(--text-secondary)] max-w-md mb-6">
          Your financial dashboard lights up once we have something to visualize.
          Upload a bank statement and your charts will appear here automatically.
        </p>
        <a
          href="/files"
          className="inline-flex items-center gap-2 bg-[#14e7ff] hover:bg-[#0fc9de] text-black font-medium px-5 py-2.5 rounded-md transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload a statement
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-secondary)]/80 rounded-lg z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14e7ff]"></div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg p-4 m-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold mb-1">Superset dashboard unavailable</div>
            <div className="opacity-90 break-words">{error}</div>
            <div className="opacity-70 mt-2 text-xs">
              Make sure the Superset stack is running (<code>docker compose up -d</code>{' '}
              in <code>FINSURE_BACKEND/superset</code>) and that{' '}
              <code>SUPERSET_DASHBOARD_UUID</code> is set in the backend{' '}
              <code>.env</code>.
            </div>
          </div>
        </div>
      )}

      <div
        ref={mountRef}
        className="w-full rounded-md overflow-hidden"
        style={{ height: '80vh', minHeight: '640px' }}
      />
    </div>
  );
};

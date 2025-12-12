import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { toastManager } from '../utils/toast';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const ToastIcon = ({ type }: { type: Toast['type'] }) => {
  const iconProps = { size: 20, className: 'flex-shrink-0' };
  switch (type) {
    case 'success':
      return <CheckCircle {...iconProps} className="text-green-400" />;
    case 'error':
      return <XCircle {...iconProps} className="text-red-400" />;
    case 'warning':
      return <AlertTriangle {...iconProps} className="text-yellow-400" />;
    default:
      return <Info {...iconProps} className="text-[#14e7ff]" />;
  }
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="bg-[#151c27] border border-[#14e7ff]/20 rounded-lg p-4 shadow-lg flex items-start gap-3 animate-slide-in"
        >
          <ToastIcon type={toast.type} />
          <p className="flex-1 text-sm text-[#e7f0fa]">{toast.message}</p>
          <button
            onClick={() => toastManager.dismiss(toast.id)}
            className="text-[#e7f0fa]/60 hover:text-[#e7f0fa] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

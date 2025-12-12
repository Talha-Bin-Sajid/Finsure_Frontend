type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

class ToastManager {
  private listeners: ((toasts: Toast[]) => void)[] = [];
  private toasts: Toast[] = [];

  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  show(message: string, type: ToastType = 'info') {
    const id = Math.random().toString(36).substr(2, 9);
    const toast = { id, message, type };
    this.toasts = [...this.toasts, toast];
    this.notify();

    setTimeout(() => {
      this.dismiss(id);
    }, 4000);
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.toasts));
  }
}

export const toastManager = new ToastManager();

export const toast = {
  success: (message: string) => toastManager.show(message, 'success'),
  error: (message: string) => toastManager.show(message, 'error'),
  info: (message: string) => toastManager.show(message, 'info'),
  warning: (message: string) => toastManager.show(message, 'warning'),
};

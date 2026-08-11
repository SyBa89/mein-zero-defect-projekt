'use client';

import { useToast, ToastType } from '@/contexts/ToastContext';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';

const typeStyles: Record<ToastType, string> = {
  success: 'bg-green-50 border-green-400 text-green-800',
  error: 'bg-red-50 border-red-400 text-red-800',
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
  info: 'bg-blue-50 border-blue-400 text-blue-800',
};

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
  error: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
  warning: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />,
  info: <InformationCircleIcon className="h-5 w-5 text-blue-500" />,
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-lg shadow-lg border-l-4 animate-in slide-in-from-bottom-5 fade-in duration-300 ${typeStyles[toast.type]}`}
          role="alert"
        >
          <div className="flex-shrink-0 mt-0.5">
            {icons[toast.type]}
          </div>
          <div className="flex-1 text-sm font-medium">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
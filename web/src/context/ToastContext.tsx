"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Check, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (title: string, message?: string, type?: ToastType) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (title: string, message?: string, type: ToastType = "success") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 3200);
    },
    [removeToast]
  );

  const success = useCallback((title: string, message?: string) => addToast(title, message, "success"), [addToast]);
  const error = useCallback((title: string, message?: string) => addToast(title, message, "error"), [addToast]);
  const info = useCallback((title: string, message?: string) => addToast(title, message, "info"), [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info }}>
      {children}
      {/* Toast Render Area */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border border-zinc-800 bg-zinc-950 text-white backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3"
          >
            <div className="mt-0.5 shrink-0">
              {t.type === "success" && <Check className="w-4 h-4 text-white" />}
              {t.type === "error" && <AlertCircle className="w-4 h-4 text-zinc-400" />}
              {t.type === "info" && <Info className="w-4 h-4 text-zinc-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-xs text-white tracking-tight">{t.title}</h4>
              {t.message && <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{t.message}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-zinc-500 hover:text-white transition-colors p-0.5 cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

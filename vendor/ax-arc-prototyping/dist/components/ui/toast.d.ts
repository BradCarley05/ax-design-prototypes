import { default as React } from 'react';
export type ToastType = 'success' | 'warning' | 'error';
export interface ToastProps {
    type?: ToastType;
    message: string;
    action?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss?: () => void;
    className?: string;
}
export declare function Toast({ type, message, action, actionLabel, onAction, onDismiss, className, }: ToastProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Toast {
    var displayName: string;
}
export interface ToastItem {
    id: string;
    type: ToastType;
    message: string;
    action?: boolean;
    actionLabel?: string;
    onAction?: () => void;
}
interface ToastContextValue {
    toast: (opts: Omit<ToastItem, 'id'>) => string;
    dismiss: (id: string) => void;
}
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare namespace ToastProvider {
    var displayName: string;
}
export declare function useToast(): ToastContextValue;
export {};

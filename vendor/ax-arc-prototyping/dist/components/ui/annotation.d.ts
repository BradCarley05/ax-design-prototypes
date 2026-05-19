import * as React from 'react';
interface AnnotationContextValue {
    enabled: boolean;
}
export declare function AnnotationProvider({ enabled, children }: {
    enabled: boolean;
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useAnnotationContext(): AnnotationContextValue;
/** Render once inside AnnotationProvider. Scans the DOM for [data-annotation] and draws the overlay. */
export declare function AnnotationLayer(): import("react/jsx-runtime").JSX.Element | null;
export {};

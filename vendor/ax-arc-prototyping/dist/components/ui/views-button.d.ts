interface SavedView {
    id: string;
    name: string;
    config: unknown;
}
interface ViewsButtonProps {
    /** Namespaced automatically as `ax-table-views:{storageKey}` */
    storageKey: string;
    /** Current table config — passed to save functions */
    currentConfig: unknown;
    /** Called with the saved config object when the user selects a view */
    onLoadView: (config: unknown) => void;
    /** Called whenever the dirty or active-view state changes — use to render external save buttons */
    onDirtyChange?: (isDirty: boolean, hasActiveView: boolean, onUpdate: () => void) => void;
    /** Called once on mount with a stable save function — use to trigger save from an external modal */
    onSaveReady?: (save: (name: string) => void) => void;
    /** Called when the user clears the active view — use to reset table state to defaults */
    onClearView?: () => void;
}
declare function ViewsButton({ storageKey, currentConfig, onLoadView, onDirtyChange, onSaveReady, onClearView }: ViewsButtonProps): import("react/jsx-runtime").JSX.Element;
declare namespace ViewsButton {
    var displayName: string;
}
export { ViewsButton };
export type { ViewsButtonProps, SavedView };

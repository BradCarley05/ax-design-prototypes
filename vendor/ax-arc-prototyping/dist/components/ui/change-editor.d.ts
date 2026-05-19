export interface ChangeEditorHandle {
    insertToken: (name: string, value: string) => void;
    insertIcon: (name: string, code: string) => void;
}
interface ChangeEditorProps {
    onSubmit: (text: string) => void;
    onCancel: () => void;
}
export declare const ChangeEditor: import('react').ForwardRefExoticComponent<ChangeEditorProps & import('react').RefAttributes<ChangeEditorHandle>>;
export {};

import * as React from 'react';
interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode;
    /** Primary action label. Defaults to 'Save'. */
    primaryLabel?: string;
    onPrimary?: () => void;
    /** Secondary action label. Defaults to 'Cancel'. */
    secondaryLabel?: string;
    onSecondary?: () => void;
    /** Optional tertiary text-link action. */
    tertiaryLabel?: string;
    onTertiary?: () => void;
    /** Modal width in px. Defaults to 420. */
    width?: number;
    className?: string;
}
declare function Modal({ open, onClose, title, children, primaryLabel, onPrimary, secondaryLabel, onSecondary, tertiaryLabel, onTertiary, width, className, }: ModalProps): React.ReactPortal | null;
declare namespace Modal {
    var displayName: string;
}
export { Modal };
export type { ModalProps };

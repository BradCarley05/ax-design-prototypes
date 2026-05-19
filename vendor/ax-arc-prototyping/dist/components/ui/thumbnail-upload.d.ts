export interface ThumbnailUploadProps {
    /** Uploaded image URL — when set, shows the image with a remove overlay on hover */
    src?: string;
    /** Label shown below the icon when empty */
    label?: string;
    /** Show only the icon with no text label */
    iconOnly?: boolean;
    /** Called when the empty tile is clicked */
    onUpload?: () => void;
    /** Called when the remove overlay is clicked on a filled tile */
    onRemove?: () => void;
    className?: string;
}
export declare function ThumbnailUpload({ src, label, iconOnly, onUpload, onRemove, className, }: ThumbnailUploadProps): import("react/jsx-runtime").JSX.Element;

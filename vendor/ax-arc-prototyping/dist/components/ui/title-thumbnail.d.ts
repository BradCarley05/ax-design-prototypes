export interface TitleThumbnailProps {
    title?: string;
    /** Subtitle text shown in the subline row */
    subtitle?: string;
    /** Text label for the status chip (e.g. "Draft") */
    statusLabel?: string;
    /** Show/hide the status chip — defaults to true when statusLabel is provided */
    showStatus?: boolean;
    /** Show/hide the entire subline row */
    showSubline?: boolean;
    /** Thumbnail (image card) variant vs text-only variant */
    thumbnail?: boolean;
    /** Image URL for the thumbnail variant */
    thumbnailSrc?: string;
    className?: string;
}
export declare function TitleThumbnail({ title, subtitle, statusLabel, showStatus, showSubline, thumbnail, thumbnailSrc, className, }: TitleThumbnailProps): import("react/jsx-runtime").JSX.Element;

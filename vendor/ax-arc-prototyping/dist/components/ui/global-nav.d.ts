import * as React from 'react';
export interface GlobalNavSubItem {
    id: string;
    label: string;
}
export interface GlobalNavItem {
    id: string;
    label: string;
    icon: string;
    submenu?: GlobalNavSubItem[];
    chip?: string;
}
export interface GlobalNavProps {
    mainItems?: GlobalNavItem[];
    bottomItems?: GlobalNavItem[];
    activeItemId?: string;
    onItemClick?: (id: string) => void;
    orgName?: string;
    logo?: React.ReactNode;
    userName?: string;
    userAvatarSrc?: string;
    hasNotification?: boolean;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    onNewClick?: () => void;
    onSearchClick?: () => void;
    onProfileClick?: () => void;
    onNotificationClick?: () => void;
    className?: string;
}
export declare function ProfileMenuContent({ onItemClick }: {
    onItemClick?: (id: string) => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function GlobalNav({ mainItems, bottomItems, activeItemId, onItemClick, orgName, logo, userName, userAvatarSrc, hasNotification, collapsed, onCollapsedChange, onNewClick, onSearchClick, onNotificationClick, className, }: GlobalNavProps): import("react/jsx-runtime").JSX.Element;

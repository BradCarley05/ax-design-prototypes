import * as React from "react";
interface VerticalNavMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    header?: string;
    headerAction?: React.ReactNode;
}
declare const VerticalNavMenu: React.ForwardRefExoticComponent<VerticalNavMenuProps & React.RefAttributes<HTMLDivElement>>;
interface NavItemBaseProps {
    icon?: React.ReactNode;
    active?: boolean;
    flat?: boolean;
    className?: string;
    children: React.ReactNode;
}
type NavItemProps = (NavItemBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
}) | (NavItemBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
});
declare const NavItem: React.ForwardRefExoticComponent<NavItemProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
export { VerticalNavMenu, NavItem };

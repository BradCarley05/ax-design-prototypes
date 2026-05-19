import * as React from "react";
type AlertVariant = "default" | "positive" | "destructive" | "warning" | "info";
declare const Alert: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    variant?: AlertVariant;
} & React.RefAttributes<HTMLDivElement>>;
declare const AlertTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const AlertDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export { Alert, AlertTitle, AlertDescription };

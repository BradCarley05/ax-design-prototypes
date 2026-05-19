import * as React from "react";
interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
    className?: string;
}
declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<SVGSVGElement>>;
export { Spinner };
export type { SpinnerProps };

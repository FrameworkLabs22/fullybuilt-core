import * as React from 'react';

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    active?: boolean;
}
/** Rounded toggle / filter pill (36px tall). Active = ink fill. */
declare function Pill({ icon, active, className, children, ...props }: PillProps): React.JSX.Element;

export { Pill };

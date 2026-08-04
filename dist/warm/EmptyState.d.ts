import * as React from 'react';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description?: React.ReactNode;
    action?: React.ReactNode;
}
/** Designed empty state: icon in a chip circle, bold title, sub copy, optional action. */
declare function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps): React.JSX.Element;

export { EmptyState };

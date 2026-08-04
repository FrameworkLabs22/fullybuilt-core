import * as React from 'react';
import { TabsList, TabsTrigger } from '../ui/tabs.js';
import '@radix-ui/react-tabs';

/**
 * Page-level tab bar — for switching whole page views.
 *
 * An underline bar sitting on a hairline rule, not a floating pill track. Tabs
 * label the content directly beneath them, and the shared rule is what ties the
 * label to the region it names; a detached pill reads as a control that happens
 * to be nearby.
 *
 * The `active` prop is retained for API compatibility but is no longer needed —
 * the active treatment comes from Radix's own `data-state`, so the parent cannot
 * get out of sync with it.
 *
 * WHY THE ACTIVE STATE IS SPELLED OUT: the shadcn base gives the active trigger a
 * raised pill — `data-[state=active]:bg-background` + `shadow-sm`. A plain
 * `bg-transparent` does NOT cancel it: tailwind-merge only drops a class when the
 * MODIFIER matches too, so the unmodified utility and the `data-[state=active]:`
 * one both survive, and Tailwind emits variants after base utilities, so the pill
 * wins. It has to be beaten on its own modifier.
 */
declare function PageTabList({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof TabsList>): React.JSX.Element;
interface PageTabTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsTrigger> {
    /** @deprecated Active state now comes from Radix `data-state`; this is ignored. */
    active?: boolean;
    icon?: React.ReactNode;
}
declare function PageTabTrigger({ active: _active, icon, className, children, ...props }: PageTabTriggerProps): React.JSX.Element;

export { PageTabList, PageTabTrigger };

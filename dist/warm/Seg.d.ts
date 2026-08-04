import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { Tabs } from '../ui/tabs.js';

/**
 * Segmented control — styled wrappers around the shadcn/Radix Tabs base (which
 * stays untouched). Composition API is unchanged: SegTabs > SegList > SegTrigger
 * + SegContent.
 *
 * The active segment LIFTS in place; it does not slide. A sliding pill animates
 * the control itself rather than the change it causes, and on a filter that
 * re-renders a table underneath, the eye follows the pill instead of the data
 * that just moved. Selection is instant; the content it drives is the thing worth
 * watching.
 */
declare function SegTabs(props: React.ComponentPropsWithoutRef<typeof Tabs>): React.JSX.Element;
declare const SegList: React.ForwardRefExoticComponent<Omit<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SegTrigger: React.ForwardRefExoticComponent<Omit<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SegContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * Class strings for styling other Radix triggers (e.g. ToggleGroupItem) to match
 * the segmented look without wrapping them. ToggleGroup reports selection as
 * `data-state="on"`, which the shared `[data-state=active]` rule does not match,
 * so the active treatment is spelled out here.
 */
declare const segTrackClass = "fb-seg-track";
declare const segItemClass: string;

export { SegContent, SegList, SegTabs, SegTrigger, segItemClass, segTrackClass };

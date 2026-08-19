import * as React$1 from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';

declare const ResizablePanelGroup: ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => React$1.JSX.Element;
declare const ResizablePanel: React$1.ForwardRefExoticComponent<Omit<React$1.HTMLAttributes<HTMLElement | HTMLDivElement | HTMLSpanElement | HTMLButtonElement | HTMLAnchorElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableRowElement | HTMLTableCellElement | HTMLObjectElement | HTMLProgressElement | HTMLEmbedElement | HTMLStyleElement | HTMLMeterElement | HTMLTextAreaElement | HTMLPreElement | HTMLDialogElement | HTMLFormElement | HTMLImageElement | HTMLLinkElement | HTMLOptionElement | HTMLTimeElement | HTMLTrackElement | HTMLParagraphElement | HTMLSelectElement | HTMLSlotElement | HTMLTitleElement | HTMLLabelElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLCanvasElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDListElement | HTMLFieldSetElement | HTMLHeadingElement | HTMLHeadElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLInputElement | HTMLLegendElement | HTMLLIElement | HTMLMapElement | HTMLMetaElement | HTMLOListElement | HTMLOptGroupElement | HTMLOutputElement | HTMLScriptElement | HTMLSourceElement | HTMLTemplateElement | HTMLUListElement | HTMLVideoElement | HTMLTableCaptionElement | HTMLMenuElement | HTMLPictureElement>, "id" | "onResize"> & {
    className?: string | undefined;
    collapsedSize?: number | undefined;
    collapsible?: boolean | undefined;
    defaultSize?: number | undefined;
    id?: string | undefined;
    maxSize?: number | undefined;
    minSize?: number | undefined;
    onCollapse?: ResizablePrimitive.PanelOnCollapse | undefined;
    onExpand?: ResizablePrimitive.PanelOnExpand | undefined;
    onResize?: ResizablePrimitive.PanelOnResize | undefined;
    order?: number | undefined;
    style?: object | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
} & {
    children?: React$1.ReactNode;
} & React$1.RefAttributes<ResizablePrimitive.ImperativePanelHandle>>;
declare const ResizableHandle: ({ withHandle, className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean;
}) => React$1.JSX.Element;

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };

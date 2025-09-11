import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ManageNegotiableQuoteProps extends HTMLAttributes<HTMLDivElement> {
    quoteName: VNode;
    quoteStatus: VNode;
    banner?: VNode;
    details: {
        title: string;
        content: string;
    }[];
    itemActions: VNode;
    quoteActions: VNode[];
    tabs: {
        id: string;
        label: string;
        active: boolean;
    }[];
    onTabClick: (tabId: string) => void;
    activeTabContent: VNode;
    shippingInformation: VNode;
    quoteComments: VNode;
    footer: VNode;
}
export declare const ManageNegotiableQuote: FunctionComponent<ManageNegotiableQuoteProps>;
//# sourceMappingURL=ManageNegotiableQuote.d.ts.map
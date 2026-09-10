import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface FacetProps extends HTMLAttributes<HTMLDivElement> {
    numberOfOptionsConfig?: number;
    header: VNode;
    buckets: VNode[];
    last?: boolean;
    /**
     * ARIA role used to group the facet's controls with its header.
     * Use "radiogroup" when the buckets are rendered as radio buttons (e.g. price ranges)
     * so that assistive technology (e.g. VoiceOver) announces the group name for every
     * option, not just the first one, as it does for the generic "group" role.
     */
    groupRole?: 'group' | 'radiogroup';
}
export declare const Facet: FunctionComponent<FacetProps>;
//# sourceMappingURL=Facet.d.ts.map
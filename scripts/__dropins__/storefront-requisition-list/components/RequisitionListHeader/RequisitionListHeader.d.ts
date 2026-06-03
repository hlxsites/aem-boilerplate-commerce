import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface RequisitionListHeaderProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    description?: string;
    backLink?: {
        url: string;
        label: string;
        onClick?: (e: Event) => void;
    };
    actions?: {
        onRename?: () => void;
        onDelete?: () => void;
        onShare?: () => void;
        renameLabel?: string;
        deleteLabel?: string;
        shareLabel?: string;
        shareDisabled?: boolean;
        shareDisabledReason?: string;
    };
}
export declare const RequisitionListHeader: FunctionComponent<RequisitionListHeaderProps>;
//# sourceMappingURL=RequisitionListHeader.d.ts.map
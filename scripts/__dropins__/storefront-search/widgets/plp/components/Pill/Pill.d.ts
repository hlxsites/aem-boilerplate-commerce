import { ComponentChild, FunctionComponent } from 'preact';

export interface PillProps {
    label: string;
    onClick: () => void;
    CTA?: ComponentChild;
    classes?: string;
    type?: string;
}
export declare const Pill: FunctionComponent<PillProps>;
//# sourceMappingURL=Pill.d.ts.map
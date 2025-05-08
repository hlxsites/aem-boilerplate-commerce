import { FunctionComponent } from 'preact';

export interface SwatchButtonProps {
    id: string;
    value: string;
    type: "COLOR_HEX" | "IMAGE" | "TEXT";
    checked: boolean;
    onClick: (e: any) => any;
}
export declare const SwatchButton: FunctionComponent<SwatchButtonProps>;
//# sourceMappingURL=SwatchButton.d.ts.map
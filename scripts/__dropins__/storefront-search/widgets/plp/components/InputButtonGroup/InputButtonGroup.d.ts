import { FunctionComponent } from 'preact';

export type InputButtonGroupOnChangeProps = {
    value: string;
    selected?: boolean;
};
export type InputButtonGroupOnChange = (arg0: InputButtonGroupOnChangeProps) => void;
export type InputButtonGroupTitleSlot = (label: string) => FunctionComponent;
export type Bucket = {
    title: string;
    id?: string;
    count: number;
    to?: number;
    from?: number;
    name?: string;
    __typename: "ScalarBucket" | "RangeBucket" | "CategoryView";
};
export interface InputButtonGroupProps {
    title: string;
    attribute: string;
    buckets: Bucket[];
    isSelected: (title: string) => boolean | undefined;
    onChange: InputButtonGroupOnChange;
    type: "radio" | "checkbox";
    inputGroupTitleSlot?: InputButtonGroupTitleSlot;
}
export declare const InputButtonGroup: FunctionComponent<InputButtonGroupProps>;
//# sourceMappingURL=InputButtonGroup.d.ts.map
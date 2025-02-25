import { FunctionComponent } from 'preact';
import { GiftFormDataType, GiftWrappingConfigProps } from '../../../types';

export interface ReadOnlyFormViewProps {
    view: 'product' | 'order';
    giftOptions: GiftFormDataType;
    readOnlyFormOrderView: 'primary' | 'secondary';
    giftWrappingConfig: GiftWrappingConfigProps[] | [];
}
export declare const ReadOnlyFormView: FunctionComponent<ReadOnlyFormViewProps>;
//# sourceMappingURL=ReadOnlyFormView.d.ts.map
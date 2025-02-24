import { WrappingImage, Price } from '../data/models';

export type GiftOptionsViewProps = 'product' | 'order';
export type GiftOptionsDataSourcesProps = 'cart' | 'order';
export type ValueType = string | boolean | number;
export type GiftWrappingConfigProps = {
    uid: string;
    design: string;
    selected: boolean;
    image: WrappingImage;
    price: Price;
};
export type CheckBoxConfigProps = {
    price?: Price;
    className: string;
    hidden: boolean;
    disabled: boolean;
    name: string;
    value: string | boolean | number;
    placeholder: string;
    description?: string;
    onChange: (event: Event) => void;
    disabledCustomizeButton: boolean;
};
export type FormFieldsConfigProps = {
    errorMessage: string;
    hidden: boolean;
    disabled: boolean;
    name: string;
    value: ValueType;
    title: string;
    placeholder: string;
    onChange: (event: Event) => void;
    handleBlur: (event: Event) => void;
};
export type FormSectionsProps = {
    checkBoxConfig: CheckBoxConfigProps[] | [];
    formFieldsConfig: FormFieldsConfigProps[] | [];
};
export type GiftFormDataType = {
    giftReceiptIncluded?: boolean;
    printedCardIncluded?: boolean;
    isGiftWrappingSelected?: boolean;
    recipientName?: string;
    senderName?: string;
    message?: string;
    giftWrappingId?: string;
    itemId?: string;
    giftWrappingOptions?: GiftWrappingConfigProps[];
};
//# sourceMappingURL=giftOptions.types.d.ts.map
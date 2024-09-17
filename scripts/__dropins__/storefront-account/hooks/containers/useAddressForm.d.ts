import { AttributesFormModel } from '../../data/models';
import { FieldsProps, useAddressFormProps } from '../../types';
import { VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export declare const getFieldWithOptions: (address: AttributesFormModel, regionOptions: any[]) => any;
export declare const useAddressForm: ({ addressFormId, billingCheckBoxValue, shippingCheckBoxValue, showShippingCheckBox, showBillingCheckBox, countryRegionOptions, inputsDefaultValueSet, onCloseBtnClick, onSuccess, onError, }: useAddressFormProps) => {
    inLineAlert: {
        text: string;
        type: 'success' | 'warning' | 'error';
        icon?: VNode<HTMLAttributes<SVGSVGElement>> | undefined;
    };
    addressId: string;
    submitLoading: boolean;
    normalizeFieldsConfig: FieldsProps[];
    handleUpdateAddress: (event: Event, valid: boolean) => Promise<null | undefined>;
    handleCreateAddress: (event: Event, valid: boolean) => Promise<null | undefined>;
    handleOnCloseForm: () => void;
};
//# sourceMappingURL=useAddressForm.d.ts.map
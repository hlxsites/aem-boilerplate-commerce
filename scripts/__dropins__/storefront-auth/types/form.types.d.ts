export interface FormProps {
    fieldsConfig?: any;
    name?: string;
    className?: string;
    children?: any;
    isLoading?: boolean;
    submitCallback?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
}
export interface useFormProps extends Omit<FormProps, 'children' | 'className' | 'name'> {
}
//# sourceMappingURL=form.types.d.ts.map
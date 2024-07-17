import { useFormProps } from '../../types';

export declare const useForm: ({ submitCallback, isLoading, fieldsConfig, }: useFormProps) => {
    formData: Record<string, string>;
    errors: Record<string, string>;
    formRef: import('preact').RefObject<HTMLFormElement>;
    handleChange: ({ target: { name, value, type, checked } }: any) => void;
    handleBlur: (event: any) => void;
    handleSubmit: (event: any) => void;
};
//# sourceMappingURL=useForm.d.ts.map
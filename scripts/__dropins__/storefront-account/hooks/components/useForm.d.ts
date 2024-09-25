import { useFormProps } from '../../types';

export declare const useForm: ({ fieldsConfig, onSubmit, handleSetCountryCode, onChange, }: useFormProps) => {
    formData: Record<string, string | number | boolean>;
    errors: Record<string, string>;
    formRef: import('preact').RefObject<HTMLFormElement>;
    handleInputChange: (event: Event) => void;
    handleFormChange: (event: Event) => void;
    handleBlur: (event: Event) => void;
    handleSubmit: (event: SubmitEvent) => void;
};
//# sourceMappingURL=useForm.d.ts.map
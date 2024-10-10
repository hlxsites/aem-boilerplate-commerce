import FormInputs from '../Form/FormInputs';
import { useForm } from '@/auth/hooks/components/useForm';
export const Form = ({ name, loading, children, className = 'defaultForm', fieldsConfig = [], onSubmit, }) => {
    const { formData, errors, formRef, handleChange, handleBlur, handleSubmit, handleFocus, } = useForm({
        onSubmit,
        fieldsConfig,
    });
    return (<form className={className} onSubmit={handleSubmit} name={name} ref={formRef} onFocus={handleFocus}>
      <FormInputs className={className} onFocus={handleFocus} fields={fieldsConfig} onChange={handleChange} onBlur={handleBlur} errors={errors} values={formData} loading={loading}/>
      {children}
    </form>);
};

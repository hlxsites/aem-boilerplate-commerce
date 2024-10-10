import { classes } from '@adobe/elsie/lib';
import { memo, useCallback } from 'preact/compat';
import { Field, Input, Picker, Checkbox, InputDate, TextArea, } from '@adobe/elsie/components';
import { FieldEnumList } from '@/auth/data/models';
export const FormInputs = memo(({ loading, values, fields = [], errors, className = '', onChange, onBlur, onFocus, }) => {
    const itemClassName = `${className}__field`;
    const selectElement = useCallback((item, valueMessage, errorMessage) => {
        const defaultSelectValue = item.options.find((option) => option.isDefault)?.value;
        return (<Field key={item.id} error={errorMessage} className={classes([
                itemClassName,
                `${itemClassName}--${item.id}`,
                [`${itemClassName}--${item.id}-hidden`, item.isHidden],
                item.className,
            ])} data-testid={`${className}--${item.id}`} disabled={loading || item.disabled}>
            <Picker name={item.customUpperCode} floatingLabel={`${item.label} ${item.required ? '*' : ''}`} placeholder={item.label} aria-label={item.label} options={item.options} onBlur={onBlur} handleSelect={onChange} defaultValue={defaultSelectValue ?? valueMessage ?? item.defaultValue} value={defaultSelectValue ?? valueMessage ?? item.defaultValue}/>
          </Field>);
    }, [className, loading, itemClassName, onBlur, onChange]);
    const inputElement = useCallback((item, valueMessage, errorMessage) => {
        return (<Field key={item.id} error={errorMessage} className={classes([
                itemClassName,
                `${itemClassName}--${item.id}`,
                [`${itemClassName}--${item.id}-hidden`, item.isHidden],
                item.className,
            ])} data-testid={`${className}--${item.id}`} disabled={loading}>
            <Input type="text" name={item.customUpperCode} value={valueMessage ?? item.defaultValue} placeholder={item.label} floatingLabel={`${item.label} ${item.required ? '*' : ''}`} onBlur={onBlur} onChange={onChange} onFocus={onFocus}/>
          </Field>);
    }, [className, loading, itemClassName, onBlur, onChange, onFocus]);
    const inputDateElement = useCallback((item, valueMessage, errorMessage) => {
        return (<Field key={item.id} error={errorMessage} className={classes([
                itemClassName,
                `${itemClassName}--${item.id}`,
                [`${itemClassName}--${item.id}-hidden`, item.isHidden],
                item.className,
            ])} data-testid={`${className}--${item.id}`} disabled={loading || item.disabled}>
            <InputDate type="text" name={item.customUpperCode} value={valueMessage || item.defaultValue} placeholder={item.label} floatingLabel={`${item.label} ${item.required ? '*' : ''}`} onBlur={onBlur} onChange={onChange} disabled={loading || item.disabled}/>
          </Field>);
    }, [className, loading, itemClassName, onBlur, onChange]);
    const inputCheckBoxElement = useCallback((item, valueMessage, errorMessage) => {
        return (<Field key={item.id} error={errorMessage} className={classes([
                itemClassName,
                `${itemClassName}--${item.id}`,
                [`${itemClassName}--${item.id}-hidden`, item.isHidden],
                item.className,
            ])} data-testid={`${className}--${item.id}`} disabled={loading}>
            <Checkbox name={item.customUpperCode} checked={valueMessage || item.defaultValue} placeholder={item.label} label={`${item.label} ${item.required ? '*' : ''}`} onBlur={onBlur} onChange={onChange}/>
          </Field>);
    }, [className, loading, itemClassName, onBlur, onChange]);
    const textAreaElement = useCallback((item, valueMessage, errorMessage) => {
        return (<Field key={item.id} error={errorMessage} className={classes([
                itemClassName,
                `${itemClassName}--${item.id}`,
                [`${itemClassName}--${item.id}-hidden`, item.isHidden],
                item.className,
            ])} data-testid={`${className}--${item.id}`} disabled={loading}>
            <TextArea type="text" name={item.customUpperCode} value={valueMessage ?? item.defaultValue} label={`${item.label} ${item.required ? '*' : ''}`} onBlur={onBlur} onChange={onChange}/>
          </Field>);
    }, [className, loading, itemClassName, onBlur, onChange]);
    if (!fields.length)
        return null;
    return (<>
        {fields.map((item) => {
            const errorMessage = errors?.[item.customUpperCode];
            const valueMessage = values?.[item.customUpperCode];
            switch (item.fieldType) {
                case FieldEnumList.TEXT: {
                    if (item.options.length) {
                        return selectElement(item, valueMessage, errorMessage);
                    }
                    return inputElement(item, valueMessage, errorMessage);
                }
                case FieldEnumList.MULTILINE: {
                    return inputElement(item, valueMessage, errorMessage);
                }
                case FieldEnumList.SELECT: {
                    return selectElement(item, valueMessage, errorMessage);
                }
                case FieldEnumList.DATE: {
                    return inputDateElement(item, valueMessage, errorMessage);
                }
                case FieldEnumList.BOOLEAN: {
                    return inputCheckBoxElement(item, valueMessage, errorMessage);
                }
                case FieldEnumList.TEXTAREA: {
                    return textAreaElement(item, valueMessage, errorMessage);
                }
                default:
                    return null;
            }
        })}
      </>);
});

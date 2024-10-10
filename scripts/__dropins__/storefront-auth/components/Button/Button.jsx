import { useCallback } from 'preact/hooks';
import { classes } from '@adobe/elsie/lib';
import { Button as ElsieButton } from '@adobe/elsie/components';
import '@/auth/components/Button/Button.css';
export const Button = ({ type, buttonText, variant, className = '', enableLoader = false, onClick, style, icon, ...props }) => {
    const handleOnclick = useCallback((event) => {
        onClick?.(event);
    }, [onClick]);
    const isLoader = enableLoader ? 'enableLoader' : '';
    return (<ElsieButton icon={icon} style={style} type={type} variant={variant} className={classes(['auth-button', className, isLoader])} onClick={handleOnclick} {...props}>
      <span className="auth-button__text">{buttonText}</span>
      {enableLoader ? (<div className="auth-button__wrapper">
          <span className="auth-button__loader"/>
        </div>) : null}
    </ElsieButton>);
};

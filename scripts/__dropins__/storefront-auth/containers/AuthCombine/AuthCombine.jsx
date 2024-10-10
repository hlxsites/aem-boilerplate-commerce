import { Suspense, lazy } from 'preact/compat';
import { useMemo, useState } from 'preact/hooks';
import SkeletonLoader from '@/auth/components/SkeletonLoader';
const ResetPasswordForm = lazy(() => import('@/auth/components/ResetPasswordForm'));
const SignInForm = lazy(() => import('@/auth/components/SignInForm'));
const SignUpForm = lazy(() => import('@/auth/components/SignUpForm'));
export const AuthCombine = ({ defaultView = 'signInForm', signInFormConfig, signUpFormConfig, resetPasswordFormConfig, }) => {
    const [activeComponent, setActiveComponent] = useState(defaultView);
    const renderComponent = useMemo(() => ({
        signInForm: (<SignInForm setActiveComponent={setActiveComponent} {...signInFormConfig}/>),
        signUpForm: (<SignUpForm setActiveComponent={setActiveComponent} {...signUpFormConfig}/>),
        resetPasswordForm: (<ResetPasswordForm setActiveComponent={setActiveComponent} {...resetPasswordFormConfig}/>),
    }), [
        resetPasswordFormConfig,
        signInFormConfig,
        signUpFormConfig,
        setActiveComponent,
    ]);
    return (<div>
      <Suspense fallback={<SkeletonLoader activeSkeleton={activeComponent}/>}>
        <div className="auth-combine">{renderComponent[activeComponent]}</div>
      </Suspense>
    </div>);
};

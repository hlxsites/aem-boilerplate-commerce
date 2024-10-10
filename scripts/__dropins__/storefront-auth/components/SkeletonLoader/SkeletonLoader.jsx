import { useMemo } from 'preact/hooks';
import { SignUpSkeleton, SignInSkeleton, ResetPasswordSkeleton, } from './Skeletons';
export const SkeletonLoader = ({ activeSkeleton, }) => {
    const renderSkeleton = useMemo(() => ({
        signInForm: <SignInSkeleton />,
        signUpForm: <SignUpSkeleton />,
        resetPasswordForm: <ResetPasswordSkeleton />,
    }), []);
    return <>{renderSkeleton[activeSkeleton]}</>;
};

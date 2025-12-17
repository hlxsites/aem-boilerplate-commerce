import { Container } from '@dropins/tools/types/elsie/src/lib';
import { CompanyFormSlots } from '../../types/form.types';
import { Company } from '../../data/models/company';

export interface CompanyRegistrationProps {
    /** Indicates whether the current user is authenticated */
    isAuthenticated?: boolean;
    /** Callback to redirect unauthenticated users to login page */
    onRedirectLogin?: () => void;
    /** Callback to redirect to account page after successful registration or when user already has company */
    onRedirectAccount?: () => void;
    /** Callback function triggered on successful company registration */
    onSuccess?: (company: Company) => void;
    /** Callback function triggered when registration fails with error messages */
    onError?: (errors: string[]) => void;
    /** Additional CSS classes to apply to the container for custom styling */
    className?: string;
    /** Slot configuration for customizing form sections */
    slots?: CompanyFormSlots;
}
export declare const CompanyRegistration: Container<CompanyRegistrationProps>;
//# sourceMappingURL=CompanyRegistration.d.ts.map
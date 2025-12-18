import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { CompanyModel } from '../data/models';

export interface CompanyDataProps {
    name: string;
    label: string;
    value: string;
}
export interface CompanyDataContext {
    companyData: CompanyDataProps[];
}
export interface InLineAlertProps {
    type?: 'success' | 'warning' | 'error';
    text?: string;
    icon?: any;
}
export interface CompanyProfileProps {
    /** Additional CSS classes to apply to the container for custom styling */
    className?: string;
    /** Slot configuration for customizing company data display */
    slots?: {
        CompanyData?: SlotProps<CompanyDataContext & {
            Default?: any;
        }>;
    };
}
export interface CompanyProfileCardProps {
    company?: CompanyModel | null;
    slots?: {
        CompanyData?: SlotProps<CompanyDataContext & {
            Default?: any;
        }>;
    };
    showEditForm: boolean;
    handleShowEditForm: () => void;
}
export interface EditCompanyProfileProps {
    inLineAlertProps?: InLineAlertProps;
    company?: CompanyModel | null;
    loading?: boolean;
    onSubmit?: (data: Partial<CompanyModel>) => Promise<void>;
    onCancel?: () => void;
}
//# sourceMappingURL=companyProfile.types.d.ts.map
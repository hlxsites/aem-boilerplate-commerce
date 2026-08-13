import { CustomerCompanyInfo } from '../data/models/customer-company-info';

export interface CustomerCompanyInfoProps {
    /** Additional CSS classes to apply to the container for custom styling */
    className?: string;
}
export interface CustomerCompanyInfoCardProps {
    /** Customer's company information including name, job title, work phone, and role */
    customerCompanyInfo: CustomerCompanyInfo | null;
    /** Indicates whether company information is currently being loaded */
    loading?: boolean;
    /** Additional CSS classes to apply to the card for custom styling */
    className?: string;
}
//# sourceMappingURL=customerCompanyInfo.types.d.ts.map
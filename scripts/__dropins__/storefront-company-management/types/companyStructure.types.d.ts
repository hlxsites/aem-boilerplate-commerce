import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { CompanyStructureNode } from '../data/models';
import { CompanyPermissionFlags } from './companyPermission.types';

export interface CompanyStructureDataContext {
    structureData: CompanyStructureNode[];
}
export interface CompanyStructureProps {
    /** Additional CSS classes to apply to the container for custom styling */
    className?: string;
    /**
     * When true, displays the header section.
     * Set to false when embedding within a layout that provides its own header.
     * @default false
     */
    withHeader?: boolean;
    /** Slot configuration for customizing structure data display */
    slots?: {
        StructureData?: SlotProps<CompanyStructureDataContext & {
            Default?: any;
        }>;
    };
    /** Indicates whether the current user is authenticated */
    isAuthenticated?: boolean;
    /** Callback to redirect unauthenticated users to login page */
    onRedirectLogin?: () => void;
    /** Callback to redirect to account page when registration is disabled */
    onRedirectAccount?: () => void;
}
export interface CompanyStructureCardProps {
    permissions: CompanyPermissionFlags | null;
    slots?: {
        StructureData?: SlotProps<CompanyStructureDataContext & {
            Default?: any;
        }>;
    };
}
//# sourceMappingURL=companyStructure.types.d.ts.map
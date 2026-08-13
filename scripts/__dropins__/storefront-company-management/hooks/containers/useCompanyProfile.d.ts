import { CompanyModel } from '../../data/models';
import { UseCompanyProfileProps } from '../../types/hook.types';
export declare const useCompanyProfile: ({ handleSetInLineAlert, editFormRef }: UseCompanyProfileProps) => {
    company: any;
    countries: Country[];
    loading: boolean;
    submitLoading: boolean;
    showEditForm: boolean;
    inputChange: Record<string, string | number | boolean>;
    handleShowEditForm: () => void;
    handleHideEditForm: (clearStates?: () => void) => void;
    handleUpdateCompany: (data: Partial<CompanyModel>) => Promise<void>;
    handleInputChange: (value: Record<string, string | number | boolean>) => void;
    renderAlertMessage: (type: "success" | "error", message?: string) => void;
    saving: boolean;
};

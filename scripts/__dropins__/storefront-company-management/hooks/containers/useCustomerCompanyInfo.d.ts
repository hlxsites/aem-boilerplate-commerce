/**
 * Custom hook for fetching and managing customer company information
 * Listens to companyContext/changed events to refetch data when company context changes
 * @returns Object containing company info and loading state
 */
export declare const useCustomerCompanyInfo: () => {
    companyInfo: any;
    loading: boolean;
};

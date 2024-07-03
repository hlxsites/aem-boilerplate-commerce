import { BackupService } from '../services';

export interface Services {
    backupService: BackupService;
}
export declare const ServicesContext: import('preact').Context<Services>;
export type ServicesProviderProps = {
    children: any;
    services: Services;
};
export declare function ServicesProvider({ children, services, }: ServicesProviderProps): import("preact").JSX.Element;
export declare function useServices(): Services;
//# sourceMappingURL=services.d.ts.map
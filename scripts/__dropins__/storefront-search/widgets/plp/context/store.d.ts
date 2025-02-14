import { PropsWithChildren } from 'preact/compat';
import { StoreDetails } from '../types';

export type StoreDetailsProps = PropsWithChildren<StoreDetails>;
declare const StoreContextProvider: ({ children, environmentId, environmentType, websiteCode, storeCode, storeViewCode, config, context, apiUrl, apiKey, route, searchQuery, defaultHeaders, }: StoreDetailsProps) => import("preact").JSX.Element;
declare const useStore: () => StoreDetailsProps;
export { StoreContextProvider, useStore };
//# sourceMappingURL=store.d.ts.map
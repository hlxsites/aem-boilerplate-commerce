import { SearchBucket } from '@adobe/magento-storefront-events-sdk/dist/types/types/schemas';

export type FacetDataModel = {
    attribute: string;
    title: string;
    type: string;
    buckets: SearchBucket[];
    rank: number;
};
//# sourceMappingURL=facet.d.ts.map
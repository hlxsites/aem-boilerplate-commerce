import { FunctionComponent } from 'preact';
import { AttributeMetadata } from '../types';

interface WithChildrenProps {
    children?: any;
}
export interface AttributeMetaDataProps extends WithChildrenProps {
    sortable: AttributeMetadata[];
    filterableInSearch: string[] | null;
}
declare const AttributeMetadataProvider: FunctionComponent;
declare const useAttributeMetadata: () => AttributeMetaDataProps;
export { AttributeMetadataProvider, useAttributeMetadata };
//# sourceMappingURL=attributeMetadata.d.ts.map
import { Language } from '../context/translation';
import { GQLSortInput, SortMetadata, SortOption } from '../types';

declare const defaultSortOptions: () => SortOption[];
declare const getSortOptionsfromMetadata: (translation: Language, sortMetadata: SortMetadata[], displayOutOfStock?: string | boolean, categoryPath?: string) => SortOption[];
declare const generateGQLSortInput: (sortOption: string) => GQLSortInput[] | undefined;
export { defaultSortOptions, generateGQLSortInput, getSortOptionsfromMetadata };
//# sourceMappingURL=sort.d.ts.map
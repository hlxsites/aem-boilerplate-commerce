import { FunctionComponent } from 'preact';
import { SortOption } from '../../types/interface';

export interface SortDropdownProps {
    value: string;
    sortOptions: SortOption[];
    onChange: (sortBy: string) => void;
}
export declare const SortDropdown: FunctionComponent<SortDropdownProps>;
//# sourceMappingURL=SortDropdown.d.ts.map
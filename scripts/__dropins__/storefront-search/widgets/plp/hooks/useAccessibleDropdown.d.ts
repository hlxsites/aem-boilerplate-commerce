import { PageSizeOption, SortOption } from '../types';

export declare const useAccessibleDropdown: ({ options, value, onChange, }: {
    options: SortOption[] | PageSizeOption[];
    value: string | number;
    onChange: (value: any) => void;
}) => {
    isDropdownOpen: boolean;
    setIsDropdownOpen: (v: boolean) => void;
    activeIndex: number;
    setActiveIndex: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<number>>;
    select: (value: any) => void;
    setIsFocus: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<boolean>>;
    listRef: import('preact').RefObject<HTMLUListElement>;
};
//# sourceMappingURL=useAccessibleDropdown.d.ts.map
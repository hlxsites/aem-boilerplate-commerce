import { FunctionComponent } from 'preact';
import { ChangeEvent, HTMLAttributes } from 'preact/compat';

export interface SearchBarProps extends HTMLAttributes<HTMLInputElement> {
    phrase: string;
    onKeyPress: (event: ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    placeholder?: string;
}
export declare const SearchBar: FunctionComponent<SearchBarProps>;
//# sourceMappingURL=SearchBar.d.ts.map
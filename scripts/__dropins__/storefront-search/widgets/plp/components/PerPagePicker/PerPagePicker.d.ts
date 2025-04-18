import { FunctionalComponent } from 'preact';
import { PageSizeOption } from '../../types/interface';

export interface PerPagePickerProps {
    value: number;
    pageSizeOptions: PageSizeOption[];
    onChange: (pageSize: number) => void;
}
export declare const PerPagePicker: FunctionalComponent<PerPagePickerProps>;
//# sourceMappingURL=PerPagePicker.d.ts.map
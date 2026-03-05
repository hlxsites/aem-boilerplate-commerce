import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export type DownloadableLink = {
    uid: string;
    price: number;
    sample_url: string | null;
    label: string;
    number_of_downloads: number;
};
export type DownloadableSample = {
    uid: string;
    label: string;
    url: string;
};
export type DownloadableValue = {
    links: DownloadableLink[];
    samples: DownloadableSample[];
    purchaseSeparately: boolean;
};
export interface DownloadableOptionsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
    label: string;
    value: DownloadableValue;
    onLinkChange?: (uid: string, selected: boolean) => void;
    currency?: string;
    locale?: string;
}
export declare const DownloadableOptions: FunctionComponent<DownloadableOptionsProps>;
//# sourceMappingURL=DownloadableOptions.d.ts.map
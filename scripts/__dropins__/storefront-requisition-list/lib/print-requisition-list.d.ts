import { PrintLayoutProps } from '../components/ProductListTable/PrintLayout';
export declare const PRINT_IMAGE_TIMEOUT = 5000;
export declare function waitForPrintImages(root: HTMLElement, signal: AbortSignal): Promise<boolean>;
export declare function printRequisitionList(props: PrintLayoutProps, signal: AbortSignal): Promise<void>;

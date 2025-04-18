import { FunctionComponent } from 'preact';

export interface AlertProps {
    title: string;
    type: "error" | "warning" | "info" | "success";
    description: string;
    url?: string;
    onClick?: (e: any) => any;
}
export declare const Alert: FunctionComponent<AlertProps>;
//# sourceMappingURL=Alert.d.ts.map
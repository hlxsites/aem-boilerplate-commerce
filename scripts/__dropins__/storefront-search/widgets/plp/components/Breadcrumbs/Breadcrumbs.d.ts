import { FunctionComponent } from 'preact';

export interface PageProps {
    name: string;
    href: string;
    current: boolean;
}
export interface BreadcrumbsProps {
    pages: PageProps[];
}
export declare const Breadcrumbs: FunctionComponent<BreadcrumbsProps>;
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.d.ts.map
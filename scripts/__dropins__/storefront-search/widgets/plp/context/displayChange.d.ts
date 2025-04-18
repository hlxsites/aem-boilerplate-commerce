import { FunctionComponent } from 'preact/compat';

interface DisplayChange {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
    columns: number;
}
interface DisplayChangeContext {
    screenSize: DisplayChange | null;
}
declare const useSensor: () => {
    screenSize: DisplayChange;
};
export declare const ResizeChangeContext: import('preact').Context<DisplayChangeContext>;
declare const Resize: FunctionComponent;
export default Resize;
export { useSensor };
//# sourceMappingURL=displayChange.d.ts.map
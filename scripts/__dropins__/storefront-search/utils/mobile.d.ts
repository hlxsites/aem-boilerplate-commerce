declare const isMobile: boolean;
declare const handleMobileDisplay: (target: HTMLLabelElement) => void;
/**
 * Commerce uses the class "active" to show/hide the search bar when on mobile.
 * That class changes the style of .label to { position: static },
 * same goal could also be achieved by manually adjusting that style. But we
 * are trying to find the less intrusive approach and leverage OOTB behavior.
 */
declare const toggleActiveClass: (target: HTMLLabelElement) => void;
export { isMobile, handleMobileDisplay, toggleActiveClass };
//# sourceMappingURL=mobile.d.ts.map
/********************************************************************
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface Extension {
    id: string;
    name: string;
    externalScripts?: string[];
    externalStyles?: string[];
    hooks?: Record<string, (payload: {
        context: Record<string, unknown>;
    }) => Promise<void> | void>;
}
export interface ExtensionManager {
    executeHook(hookName: string, context?: Record<string, unknown>): Promise<void>;
}
export declare function loadScript(src: string): Promise<void>;
export declare function loadStyle(href: string): Promise<void>;
export declare function createExtensionManager(extensions: Extension[]): Promise<ExtensionManager>;
//# sourceMappingURL=extension-manager.d.ts.map
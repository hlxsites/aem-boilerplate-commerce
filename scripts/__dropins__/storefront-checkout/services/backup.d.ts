export interface Repository {
    getKeys(): string[];
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
export declare class BackupService {
    private namespace;
    private repository;
    constructor(namespace: string, repository: Repository);
    private namespaced;
    backup<T>(key: string, value: T): void;
    restore<T>(key: string): T | null;
    remove(key: string): void;
    clear(): void;
}
//# sourceMappingURL=backup.d.ts.map
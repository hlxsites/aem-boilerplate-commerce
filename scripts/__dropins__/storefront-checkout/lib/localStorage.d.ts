import { Repository } from '../services/backup';

export declare class LocalStorage implements Repository {
    isAvailable(): boolean;
    getKeys(): string[];
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
}
//# sourceMappingURL=localStorage.d.ts.map
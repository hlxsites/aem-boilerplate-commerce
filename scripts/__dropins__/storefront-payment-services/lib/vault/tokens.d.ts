import { CustomerPaymentTokenItem, NormalizedVaultToken, VaultStoredCardProps } from '../../data/models/vault-token';

export declare function parseTokenDetails(details: unknown): Record<string, unknown>;
export declare function normalizeVaultToken(token?: CustomerPaymentTokenItem | null): NormalizedVaultToken;
export declare function isPaymentServicesStoredCardToken(token: Pick<NormalizedVaultToken, 'methodCode' | 'type'>): boolean;
export declare function getVaultEligibleTokensFromCustomerPaymentTokensData(data: unknown): NormalizedVaultToken[];
export declare function normalizedVaultTokenToStoredCardProps(token: NormalizedVaultToken): VaultStoredCardProps;
//# sourceMappingURL=tokens.d.ts.map
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface StoredCard {
    publicHash: string;
    brand?: string;
    maskedNumber?: string;
    expiry?: string;
    holderName?: string;
}
export type StoredCardsPaymentChoice = {
    kind: 'vault';
    card: StoredCard;
} | {
    kind: 'new';
};
/** Controlled selection: mirrors `StoredCardsPaymentChoice` shape without full `StoredCard` for vault (hash only). */
export type StoredCardsSelectedChoice = {
    kind: 'new';
} | {
    kind: 'vault';
    publicHash: string;
};
export interface StoredCardsProps extends HTMLAttributes<HTMLFieldSetElement> {
    cards: StoredCard[];
    /** Vault vs new card; hosts branch on `kind` (no synthetic `StoredCard`). */
    onPaymentChoice?: (choice: StoredCardsPaymentChoice) => void;
    /** When set, renders an extra radio row after stored cards (same `name="stored-payment-card"` group). */
    payWithNewCardLabel?: string;
    selectedChoice?: StoredCardsSelectedChoice | null;
}
export declare const StoredCards: FunctionComponent<StoredCardsProps>;
//# sourceMappingURL=StoredCards.d.ts.map
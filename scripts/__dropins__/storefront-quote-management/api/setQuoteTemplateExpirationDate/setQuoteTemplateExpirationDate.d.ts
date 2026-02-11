import { NegotiableQuoteTemplateModel } from '../../data/models/negotiable-quote-template-model';

export interface SetQuoteTemplateExpirationDateParams {
    templateId: string;
    expirationDate: string;
}
export declare const setQuoteTemplateExpirationDate: (params: SetQuoteTemplateExpirationDateParams) => Promise<NegotiableQuoteTemplateModel | null>;
//# sourceMappingURL=setQuoteTemplateExpirationDate.d.ts.map
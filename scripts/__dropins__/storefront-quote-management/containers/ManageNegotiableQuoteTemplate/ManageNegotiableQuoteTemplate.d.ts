import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteTemplateModel } from '../../data/models/negotiable-quote-template-model';
import { ReferenceDocument, AttachedFile } from '../../components';
import { ReferenceDocumentLinkInput } from '../../api';

export interface ManageNegotiableQuoteTemplateProps extends HTMLAttributes<HTMLDivElement> {
    onActionsButtonClick?: (action: string) => void;
    onSendForReview?: (params: {
        templateData?: NegotiableQuoteTemplateModel;
        name?: string;
        comment?: string;
        referenceDocumentLinks?: ReferenceDocumentLinkInput[];
        attachments?: AttachedFile[];
    }) => void;
    maxFiles?: number;
    maxFileSize?: number;
    acceptedFileTypes?: string[];
    slots?: {
        TemplateName?: SlotProps<{
            templateName?: string;
            templateData?: NegotiableQuoteTemplateModel;
            templateDisplayName?: string;
            isRenameDisabled?: boolean;
        }>;
        TemplateStatus?: SlotProps<{
            templateStatus?: string;
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        Banner?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        Details?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        ActionBar?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        ReferenceDocuments?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
            referenceDocuments?: ReferenceDocument[];
            isEditable?: boolean;
            onAddDocument?: () => void;
            onEditDocument?: (document: ReferenceDocument) => void;
            onRemoveDocument?: (document: ReferenceDocument) => void;
            referenceDocumentsTitle?: string;
        }>;
        ItemsTable?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        ItemsQuotedTab?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        CommentsTab?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        HistoryLogTab?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        CommentsTitle?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        Comments?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        AttachFilesField?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
            onFileChange: (files: File[]) => void;
            attachedFiles: AttachedFile[];
            fileUploadError: string | undefined;
            disabled: boolean;
        }>;
        AttachedFilesList?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
            files: AttachedFile[];
            onRemove: (key: string) => void;
            disabled: boolean;
        }>;
        HistoryLogTitle?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        HistoryLog?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        Footer?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
            comment?: string;
            isSubmitting?: boolean;
            attachedFiles?: AttachedFile[];
            referenceDocuments?: ReferenceDocument[];
            hasUnsavedChanges?: boolean;
            handleSendForReview: () => void;
            showAcceptButton?: boolean;
            renameTemplateName?: string;
            renameReason?: string;
        }>;
        ShippingInformationTitle?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
        }>;
        ShippingInformation?: SlotProps<{
            templateData?: NegotiableQuoteTemplateModel;
            loading?: boolean;
            setLoading?: (loading: boolean) => void;
        }>;
    };
}
export declare const ManageNegotiableQuoteTemplate: Container<ManageNegotiableQuoteTemplateProps>;
//# sourceMappingURL=ManageNegotiableQuoteTemplate.d.ts.map
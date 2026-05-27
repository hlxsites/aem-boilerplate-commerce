import { FunctionComponent } from 'preact';

export interface ShareRequisitionListContentProps {
    loadingUsers: boolean;
    usersErrorMessage: string | null;
    loadingLink: boolean;
    selectedUserValues: string[];
    multiSelectOptions: Array<{
        label: string;
        value: string;
    }>;
    shareLink: string | null;
    linkErrorMessage: string | null;
    linkCopied: boolean;
    isSubmitting: boolean;
    canSubmit: boolean;
    onSubmitClick: () => void;
    onCopyLinkClick: () => void;
    onSelectedUsersChange: (values: Array<string | number>) => void;
    onUsersFieldInteract: () => void;
    selectionError: string | null;
    submitErrorMessage: string | null;
    isShareSuccess: boolean;
    sharedRecipientEmails: string[];
}
export declare const ShareRequisitionListContent: FunctionComponent<ShareRequisitionListContentProps>;
//# sourceMappingURL=ShareRequisitionListContent.d.ts.map
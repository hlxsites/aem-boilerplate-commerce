/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
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

/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface ManageNegotiableQuoteTemplateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    loading?: boolean;
    templateName: VNode;
    templateStatus: VNode;
    banner?: VNode;
    details?: VNode;
    actionBar?: VNode;
    referenceDocuments?: VNode;
    itemsTable: VNode;
    shippingInformationTitle?: VNode;
    shippingInformation?: VNode;
    commentsTitle: VNode;
    comments: VNode;
    attachFilesField?: VNode;
    attachedFilesList?: VNode;
    footer?: VNode;
}
export declare const ManageNegotiableQuoteTemplate: FunctionComponent<ManageNegotiableQuoteTemplateProps>;
export declare const ManageNegotiableQuoteTemplateSkeleton: FunctionComponent;

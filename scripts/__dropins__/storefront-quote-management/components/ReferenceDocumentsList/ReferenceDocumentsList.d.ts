/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface ReferenceDocument {
    uid?: string;
    name: string;
    identifier?: string;
    url: string;
}
export interface ReferenceDocumentsListProps extends HTMLAttributes<HTMLDivElement> {
    documents: ReferenceDocument[];
    isEditable?: boolean;
    onAdd?: () => void;
    onEdit?: (document: ReferenceDocument) => void;
    onRemove?: (document: ReferenceDocument) => void;
}
export declare const ReferenceDocumentsList: FunctionComponent<ReferenceDocumentsListProps>;

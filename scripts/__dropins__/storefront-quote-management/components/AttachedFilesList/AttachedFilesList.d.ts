/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
export interface AttachedFile {
    key: string;
    name: string;
    size: number;
    status: 'uploading' | 'success' | 'error';
    error?: string;
}
export interface AttachedFilesListProps {
    files: AttachedFile[];
    onRemove: (key: string) => void;
    disabled?: boolean;
}
export declare const AttachedFilesList: FunctionComponent<AttachedFilesListProps>;

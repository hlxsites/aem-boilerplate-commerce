/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/lib';
import { SearchFacet, FacetBucket, Scope } from '../../data/models/api.js';
export interface FacetsProps extends HTMLAttributes<HTMLDivElement> {
    scope?: Scope;
    slots?: {
        Facet?: SlotProps<{
            data: SearchFacet;
        }>;
        FacetHeading?: SlotProps<{
            data: SearchFacet;
        }>;
        SelectedFacets?: SlotProps<{
            data: SearchFacet[];
        }>;
        Facets?: SlotProps<{
            data: SearchFacet[];
        }>;
        FacetBucket?: SlotProps<{
            data: FacetBucket;
        }>;
        FacetBucketLabel?: SlotProps<{
            data: FacetBucket;
        }>;
    };
}
export declare const Facets: Container<FacetsProps>;

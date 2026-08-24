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
import { Item } from '../../data/models/item';
/**
 * Default variant resolver for configurable requisition list items.
 *
 * Requisition list items only carry the parent (configurable) SKU and the
 * selected option labels, not the child/variant product. This resolves the
 * matching simple product variant via Catalog Service's `refineProduct`
 * (the same mechanism the PDP dropin uses for swatch selection) so SKU,
 * price and thumbnail can reflect the selected variant, consistent with
 * the cart.
 */
export declare const enrichConfigurableProducts: (items: Item[]) => Promise<Item[]>;

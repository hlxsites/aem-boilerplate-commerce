/********************************************************************
 * ADOBE CONFIDENTIAL
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
export declare const GET_ORDER_INVOICES = "\n  query GET_ORDER_INVOICES($orderNumber: String!) {\n    customer {\n      orders(\n        filter: { number: { eq: $orderNumber } }\n        currentPage: 1\n        pageSize: 1\n      ) {\n        items {\n          number\n\n          invoices {\n            __typename\n            id\n            number\n            status\n\n            comments {\n              __typename\n              timestamp\n              message\n            }\n\n            items {\n              __typename\n              id\n              product_name\n              product_sku\n              quantity_invoiced\n              product_sale_price {\n                value\n                currency\n              }\n              tax_amount {\n                value\n                currency\n              }\n              row_total {\n                value\n                currency\n              }\n              discounts {\n                amount {\n                  value\n                  currency\n                }\n                label\n              }\n            }\n\n            total {\n              __typename\n              subtotal {\n                value\n                currency\n              }\n              grand_total {\n                value\n                currency\n              }\n              base_grand_total {\n                value\n                currency\n              }\n              taxes {\n                amount {\n                  value\n                  currency\n                }\n                rate\n                title\n              }\n              shipping_handling {\n                total_amount {\n                  value\n                  currency\n                }\n              }\n              discounts {\n                amount {\n                  value\n                  currency\n                }\n                label\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n";

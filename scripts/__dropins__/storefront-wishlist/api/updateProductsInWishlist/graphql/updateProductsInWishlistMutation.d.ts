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
export declare const UPDATE_PRODUCTS_IN_WISHLIST_MUTATION = "\n  mutation UPDATE_PRODUCTS_IN_WISHLIST_MUTATION(\n      $wishlistId: ID!, \n      $wishlistItems: [WishlistItemUpdateInput!]!,\n      $pageSize: Int = 9,\n      $currentPage: Int = 1,\n    ) {\n    updateProductsInWishlist(\n      wishlistId: $wishlistId\n      wishlistItems: $wishlistItems\n    ) {\n      wishlist {\n        ...WISHLIST_FRAGMENT\n      }\n      user_errors {\n        code\n        message\n      }\n    }\n  }\n  \n   \nfragment WISHLIST_FRAGMENT on Wishlist {\n    id\n    name\n    updated_at\n    sharing_code\n    items_count\n    items_v2(pageSize: $pageSize, currentPage: $currentPage) {\n      items {\n        ...WISHLIST_ITEM_FRAGMENT\n      }\n      page_info {\n        current_page\n        page_size\n        total_pages\n      }\n    }\n  }\n\n\nfragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {\n    __typename\n    id\n    quantity\n    description\n    added_at\n    product {\n      sku\n    }\n    \n  ... on ConfigurableWishlistItem {\n    configurable_options {\n      option_label\n      value_label\n      configurable_product_option_value_uid\n      configurable_product_option_uid\n    }\n    configured_variant {\n      canonical_url\n    }\n  }\n\n    \n  ... on DownloadableWishlistItem {\n    added_at\n    description\n    links_v2 {\n      sample_url\n      sort_order\n      title\n      uid\n    }\n    quantity\n  }\n\n    \n  ... on GiftCardWishlistItem {\n    added_at\n    description\n    gift_card_options {\n      amount {\n        value\n        currency\n      }\n      custom_giftcard_amount {\n        value\n        currency\n      }\n      message\n      recipient_email\n      recipient_name\n      sender_email\n      sender_name\n    }\n  }\n\n    \n  ... on BundleWishlistItem {\n    bundle_options {\n      label\n      type\n      uid\n      values {\n        uid\n        label\n        quantity\n      }\n    }\n  }\n\n    customizable_options {\n      ...CUSTOMIZABLE_OPTIONS_FRAGMENT\n    }\n  }\n  \n  \n  fragment CUSTOMIZABLE_OPTIONS_FRAGMENT on SelectedCustomizableOption {\n    type\n    customizable_option_uid\n    label\n    is_required\n    values {\n      label\n      value\n      price{\n        type\n        units\n        value\n      }\n    }\n  }\n\n\n \n";

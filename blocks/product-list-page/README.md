# Product List Block

The Product List block provides a comprehensive product discovery and listing interface for both category pages and search results pages. It integrates multiple Adobe Commerce dropins to deliver a complete product browsing experience with filtering, sorting, pagination, and product actions.

## Overview

This block creates a responsive product listing interface that automatically adapts based on the page context:

- **Category Pages**: Displays products within a specific category using the `urlpath` configuration
- **Search Pages**: Shows search results based on query parameters

The block includes product filtering, sorting, pagination, and individual product actions (add to cart, wishlist toggle).

## Integration

### Configuration

The block reads configuration using `readBlockConfig()` and supports the following options:

| Configuration | Type | Description | Required |
|---------------|------|-------------|----------|
| `urlpath` | string | Category path for category pages (e.g., "men/shirts"). When provided, the block operates as a category page. | No |

## Current Behavior

### Page Type Detection

- **Category Page**: When `config.urlpath` is provided, the block searches for all products in that category
- **Search Page**: When no `urlpath` is provided, the block performs a search based on URL query parameters

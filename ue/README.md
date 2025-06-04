# Universal Editor (UE)

Universal Editor is Adobe's next-generation content editing experience that enables true in-context editing across any implementation. Universal Editor is particularly useful when you need a modern, flexible editing experience that can work across different content repositories and implementations.

## Prerequisites

To use Universal Editor, you need:
1. A "DX Handle" (e.g., `@nameofmycompany`) found in your experience.adobe.com URL
2. Your IMS Org/DX Handle must have Universal Editor enabled (requires AEM Sites credits)
3. A site on da.live
4. Chrome or Safari browser (currently supported browsers)

See https://github.com/adobe/da-live/wiki/Universal-Editor for more details.

## Setting Up UE Instrumentation for Custom Blocks

To enable Universal Editor for custom blocks, you need to create three essential JSON configuration files:

1. `component-definitions.json`: Enables the block for Universal Editor
   - Contains block definitions with unique IDs
   - Includes the `da` plugin that defines initial content structure

2. `component-models.json`: Defines the fields in the UE properties panel
   - Specifies field types, behaviors, and validation rules
   - Links fields to block content via CSS selectors
   - Supports various field types like text, rich text, images, etc.

3. `component-filters.json`: Used for container blocks (like Cards or Accordion)
   - Defines how nested content is handled
   - Empty array for non-container blocks

### Implementation Steps

1. Add your block to a test page using the document editor
2. Open the page in Universal Editor
3. Use the developer console to inspect the `/details` network call
4. Create the three JSON configuration files based on the block's structure in `/ue/models/blocks`
5. Add your block to the section filter list in `/ue/models/section.json`

### Block Options Support

For blocks with multiple options or variations:
- Use select components for block options
- Name the fields `classes` or `classes_[suffix]` for multiple options
- These will be combined into a class list during rendering

For more detailed information about field types and configuration options, refer to the [Universal Editor documentation](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/field-types). 
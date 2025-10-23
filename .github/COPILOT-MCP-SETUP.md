# GitHub Copilot MCP Setup Guide

This guide explains how to configure **Model Context Protocol (MCP)** servers for **GitHub Copilot in VS Code**. MCP servers provide enhanced context and tools to improve AI coding assistance accuracy.

> **Note:** If you're using a different editor (Cursor, Claude Desktop, etc.), please refer to their respective documentation or configuration files in this repository.

## Available MCP Servers

This project provides two MCP servers:

### 1. commerce-documentation-rag

Custom RAG (Retrieval-Augmented Generation) server for Adobe Commerce Storefront documentation.

**Tool provided:** `search_storefront_docs` - Search dropin documentation for containers, slots, props, and usage patterns.

### 2. chrome-devtools

Chrome DevTools MCP server for browser testing and validation.

**Purpose:** Validate frontend changes in Chrome/Chromium browsers.

---

## Setup for VS Code + GitHub Copilot

GitHub Copilot in VS Code supports MCP through the **Agent Mode** feature.

### Prerequisites

1. **VS Code** version 1.95 or later
2. **GitHub Copilot** extension installed and activated
3. GitHub Copilot subscription (Individual, Business, or Enterprise)

### Enable MCP Support

1. Open VS Code Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Search for and run: **"MCP: Add Server"**
3. You'll be prompted to create an `mcp.json` configuration file

### Add MCP Servers

When prompted, configure each server:

#### Configure commerce-documentation-rag:

```json
{
  "type": "stdio",
  "command": "bash",
  "args": ["mcp-server/start-mcp.sh"]
}
```

#### Configure chrome-devtools:

```json
{
  "type": "stdio",
  "command": "npx",
  "args": ["chrome-devtools-mcp@latest"]
}
```

### Complete Configuration Example

Your final `mcp.json` should look like this:

```json
{
  "servers": {
    "commerceDocumentationRag": {
      "type": "stdio",
      "command": "bash",
      "args": ["mcp-server/start-mcp.sh"]
    },
    "chromeDevtools": {
      "type": "stdio",
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    }
  }
}
```

> **Note:** Use camelCase for server names as per [VS Code MCP naming conventions](https://code.visualstudio.com/docs/copilot/customization/mcp-servers#_configuration-format).

---

## After Adding MCP Servers

Once you've configured the MCP servers, you need to set up the `commerce-documentation-rag` server.

**Please refer to the [ADL Lab Instructions Setup section](https://gist.github.com/sirugh/d5864506c72335872909c0a1a7ed5277) for detailed installation and configuration steps.**

---

## Verify Setup

1. Open GitHub Copilot Chat in VS Code
2. Enable **Agent Mode** (look for agent toggle in chat)
3. Click the **Tools** button to see available MCP tools
4. You should see `search_storefront_docs` and other chrome-devtools tools

### Troubleshooting VS Code

- **MCP server not starting:** Check the output panel (View → Output → MCP)
- **Tools not appearing:** Ensure Agent Mode is enabled in Copilot Chat
- **Command not found:** Verify `bash` and `npx` are in your system PATH

For more details, see [VS Code MCP Documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

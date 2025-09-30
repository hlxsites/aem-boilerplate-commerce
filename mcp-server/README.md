# RAG MCP Server

A minimal Model Context Protocol (MCP) server that's essentially a curl wrapper for RAG services. Supports both Cloudflare AutoRAG and simple worker services.

## Features

- **Ultra-simple**: Just 93 lines of code for a full MCP server
- **Dual mode**: Supports both Cloudflare AutoRAG and worker services
- **No auth required** for worker mode - just a simple HTTP POST
- **Configurable**: Switch between services via environment variable

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Enable MCP in Cursor:

   - Open Cursor Settings
   - Go to **Tools & Integrations** (or search for "MCP Tools")
   - Go to **MCP Tools**
   - Find **commerce-documentation-rag** in the list and toggle it **ON**
   - Restart Cursor if prompted

3. Set up your configuration as per the instructions below

4. Run in worker mode (default, no config needed):

   ```bash
   npm start
   ```

## Configuration

### Worker Mode (Default)
1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and set the worker URL:
   ```bash
   RAG_MODE=worker
   WORKER_RAG_URL=https://your-worker-url-here/query
   ```

### Cloudflare Mode
1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and add your Cloudflare credentials:
   ```bash
   RAG_MODE=cloudflare
   CLOUDFLARE_API_TOKEN=your_token
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   CLOUDFLARE_RAG_NAME=your_rag_name
   ```

## Available Tools

### `search_storefront_docs`
Search documentation using natural language queries.

**Parameters:**
- `query` (required): Natural language search query

**Example queries:**
- "What is a storefront dropin? What are the different types of dropins?"
- "Search for information about product discovery containers"
- "Find documentation about storefront interfaces and their UI impact"

## How It Works

This is essentially a curl wrapper that implements the MCP protocol:

```bash
# Worker mode (what this server does internally)
curl -X POST '$WORKER_RAG_URL' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"query": "your question here"}'
```

The MCP server just adds the protocol layer on top of this simple HTTP call.

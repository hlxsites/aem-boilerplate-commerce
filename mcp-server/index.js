#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration - supports both Cloudflare AutoRAG and worker service
const config = {
  mode: process.env.RAG_MODE || 'worker', // 'worker' or 'cloudflare'
  worker: {
    url: process.env.WORKER_RAG_URL,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  },
  cloudflare: {
    url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/autorag/rags/${process.env.CLOUDFLARE_RAG_NAME}/ai-search`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    },
  },
};

// Simple curl-like function
async function makeRequest(query) {
  const { url, headers } = config[config.mode];
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

// MCP Server setup
const server = new Server(
  { name: 'rag-mcp-server', version: '1.0.0' },
  { capabilities: { tools: {} } },
);

// Tool definitions
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'search_storefront_docs',
    description: 'Search storefront documentation using AI-powered natural language queries',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Natural language search query' } },
      required: ['query'],
    },
  }],
}));

// Tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name !== 'search_storefront_docs') {
    throw new Error(`Unknown tool: ${name}`);
  }

  try {
    const result = await makeRequest(`Provide the most relevant information from the documentation for the following query. DO NOT make up information or use hypotheticals. Query: ${args.query}`);
    const response = result.response || result.answer || result.text
      || result.result?.response || JSON.stringify(result);

    return {
      content: [{
        type: 'text',
        text: `Storefront Documentation Search Results for "${args.query}" using ${config.mode}:\n\n${response}`,
      }],
    };
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Error: ${error.message}` }],
    };
  }
});

// Error handling
server.onerror = (error) => console.error('[MCP Error]', error);
process.on('SIGINT', async () => { await server.close(); process.exit(0); });

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);

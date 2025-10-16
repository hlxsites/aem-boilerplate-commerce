# ADL Lab Instructions

Welcome to the Adobe Developers Live Lab! In this session, you'll learn how to work with AI agents to develop Adobe Commerce storefronts using Edge Delivery Services.

## Setup

Follow these steps to get your development environment ready for the lab.

### 1. Clone the Repository

Open your terminal and clone the repository:

```bash
git clone https://github.com/hlxsites/aem-boilerplate-commerce.git --branch agentic-dev
cd aem-boilerplate-commerce
```

### 2. Install Root Dependencies

Install the main project dependencies:

```bash
npm install
```

This will install all the necessary packages for the storefront application.

### 3. Install MCP Server Dependencies

Navigate to the MCP server directory and install its dependencies:

```bash
cd mcp-server
npm install
cd ..
```

### 4. Configure Environment Variables

The MCP server requires certain environment variables to connect to the RAG service.

Create a `.env` file in the `mcp-server` directory:

```bash
cd mcp-server
cp env.example .env
```

Edit the `.env` file and add the following values (we'll provide the actual URL during the lab):

```env
RAG_MODE=worker
WORKER_RAG_URL=<provided-during-lab>
```

**Note:** The actual value for `WORKER_RAG_URL` will be provided by the lab facilitator at the start of the session.

### 5. Enable MCP in Cursor

The Model Context Protocol (MCP) server provides AI agents with access to Adobe Commerce Storefront documentation.

#### 5.1. Open Cursor Settings

**IMAGE PLACEHOLDER: Cursor menu showing how to access settings**

1. Open Cursor
2. Go to **Cursor** → **Settings** (or press `Cmd+,` on Mac / `Ctrl+,` on Windows/Linux)

#### 5.2. Enable MCP Features

**IMAGE PLACEHOLDER: Cursor settings panel with MCP toggle highlighted**

1. In the settings search bar, type "MCP"
2. Enable the **Model Context Protocol** toggle
3. Enable **Use MCP Features** if it's a separate option

#### 5.3. Configure MCP Server

The project includes an MCP configuration file at `.cursor/mcp.json`. This file should already be configured to use the local MCP server.

**IMAGE PLACEHOLDER: Cursor showing MCP server configuration in settings**

Verify the MCP configuration:

1. Open **Cursor** → **Settings**
2. Navigate to **Model Context Protocol** section
3. Ensure the "commerce-documentation-rag" server is listed and enabled

The configuration should look similar to this:

```json
{
  "mcpServers": {
    "commerce-documentation-rag": {
      "command": "bash",
      "args": ["mcp-server/start-mcp.sh"],
      "cwd": "."
    },
    "chrome-devtools": {
      "command": "npx chrome-devtools-mcp@latest",
      "env": {},
      "args": []
    }
  }
}
```

**Note:** The `start-mcp.sh` script will automatically load the environment variables from your `.env` file in the `mcp-server` directory.

#### 5.4. Restart Cursor

After enabling MCP and configuring the server:

1. Quit Cursor completely
2. Reopen Cursor
3. Open the `aem-boilerplate-commerce` project

#### 5.5. Verify MCP Connection

**IMAGE PLACEHOLDER: Cursor showing MCP server status indicator**

Check that the MCP server is running correctly:

1. Open a new chat in Cursor
2. Look for an indicator showing the MCP server is connected (usually in the chat interface)
3. Try asking a question like: "Search the storefront docs for information about slots"

If the MCP server is working, you should see relevant documentation results.

### 6. Start the Development Server

With everything configured, start the local development server:

```bash
npx -y @adobe/aem-cli up --no-open --forward-browser-logs
```

The development server will start at `http://localhost:3000`.

## Vibing

<!-- Content will be added before the lab session -->

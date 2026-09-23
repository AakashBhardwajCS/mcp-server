import { MCPServer } from "mcp-use";
import z from "zod";

// initializing the server
const server = new MCPServer(
    {
        name: "mcplearning",
        title: "MCP Learning",
        version: "1.0.0",
        description: "A learning project for MCP",
        instructions: "This is a learning project for MCP. It is not intended for production use.",
    }
)
    
// creating a tool for the server
export const showApp = server.tool({
     name: "showApp",
     title: "Show MCP server",
     description: "This tool shows the MCP server information.",
     inputSchema: z.object({
        appName: z.string().optional().default("Optional title shown in MCP card instead of the default title"),
     }),
     outputSchema: z.object({
        message: z.string().describe("The message to be shown in the MCP card."),
    }),
    annotations: {
        readOnlyHint: true,
    },
    view:{
        name: "my-view",
    }
},
async ({ appName }, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`The app anme is: ${appName}`);
    const data = {
        message: `The MCP starter for ${appName} is ready.`,
    }

    return {
        content: [
            {
                type: "text",
                text: data.message,
            }
        ],
        structuredContent: data,
    }
})

export default server
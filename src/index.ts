import { z } from "zod";
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getUserByID } from "./tools/UserListing.ts"

export class MyMCP extends McpAgent< Record<string, any> > {
	server = new McpServer({
		name: "MCP Name...",
		version: "1.0.0",
		description: "MCP description...",
		capabilities: {
			tools: {}
		},
		homepageUrl: "Documentation url..."
	});

	async init() {
		this.server.tool(
			"get_user",
			"Retrieves todo information from API.",
			{
				userID: z.string().describe("The unique identifier of the user to retrieve")
			},
			async ({ userID }) => {
				return getUserByID(this.env, this.props, userID);
			}
		);
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		// pid
		const processId = Date.now().toString(); 

		// userID & secret key from header
		const userId: string | null = request.headers.get('X-UserID');
		const secretKey: string | null  = request.headers.get('X-SecretKey');

		// props
		ctx.props = { processId, userId, secretKey };

		// routing
		const url = new URL(request.url);
		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
		}
		if (url.pathname === "/mcp") {
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}
		return new Response("Not found", { status: 404 });
	},
};
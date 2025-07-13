import { z } from "zod";
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getApplicationList, getAppByID } from "./tools/ApplicationListing.ts"

export class MyMCP extends McpAgent< Record<string, any> > {
	server = new McpServer({
		name: "Fiuu Onboarding MCP",
		version: "1.0.0",
		description: "MCP server for Fiuu merchant onboarding operations. Provides tools to retrieve, create, and manage merchant account applications.",
		capabilities: {
			tools: {}
		},
		homepageUrl: "https://fiuu-onboarding.readme.io"
	});

	async init() {
		this.server.tool(
			"list_applications",
			"Provides an organized overview of all received applications. Retrieves application data from the database and presents it in a structured format for easy viewing.",
			{},
			async ({}) => {
				return getApplicationList(this.env, this.props);
			}
		);

		this.server.tool(
			"get_application",
			"Retrieves information on a specific merchant account application by application ID. Returns detailed application data including status, submission details, and processing information.",
			{
				applicationID: z.string().describe("The unique identifier of the application to retrieve")
			},
			async ({ applicationID }) => {
				return getAppByID(this.env, this.props, applicationID);
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
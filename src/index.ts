import { z } from "zod";
import { McpAgent } from "agents/mcp";
import { consoleLog } from "./utils/Log.ts"
import { calculate } from "./tools/Example.ts"
import { getCurrentFunctionName } from "./utils/FunctionUtils.ts"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const SOURCE_FILE_MAP = null;

export class MyMCP extends McpAgent< Record<string, any> > {
	server = new McpServer({
		name: "Onboarding API MCP",
		version: "1.0.0",
	});

	async init() {
		this.server.tool(
			"calculate",
			"Performs basic arithmetic operations (add, subtract, multiply, divide) on two numbers.",
			{
				operation: z.enum(["add", "subtract", "multiply", "divide"]),
				a: z.number(),
				b: z.number()
			},
			async ({ operation, a, b,}) => {
				return calculate(this.env, this.props, operation, a, b);
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
import { z } from "zod";
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export class MyMCP extends McpAgent {
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
				try {
					const processId = this.props.processId;

					// userID & secret key
					const userId: string | null = this.props.userId as string;
					const secretKey: string | null  = this.props.secretKey as string;
					console.log(`[${processId}] UserID: ${userId}`);
					console.log(`[${processId}] SecretKey: ${secretKey}`);

					// calc operation
					let result: number = 0;
					switch (operation) {
						case "add":
							result = a + b;
							break;
						case "subtract":
							result = a - b;
							break;
						case "multiply":							
							result = a * b;
							break;
						case "divide":
							if (b === 0)
								return {
									content: [
										{
											type: "text",
											text: "Error: Cannot divide by zero",
										},
									],
								};
							result = a / b;
							break;
					}
					console.log(`[${processId}] result: ${result}`);
					return { content: [{ type: "text", text: String(result) }] };
				// error handling
				} catch (error: any) {
					console.error("ERROR:", error);
					return { content: [{ type: "text", text: JSON.stringify({ status: "error", error_message: error.message }) }], isError: true };
				}
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

		// context
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
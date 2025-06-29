import { consoleError, consoleLog } from "./log.ts";

export function handleError(processId : string, error_msg : string) {
    consoleError(processId, error_msg);
    return { content: [{ type: "text", text: JSON.stringify({ status: "error", error_message: error_msg }) }] };
} 

export function handleSuccess(processId : string, message : string) {
    consoleLog(processId, `Result: ${message}`);
    return { content: [{ type: "text", text: String(message) }] }
} 
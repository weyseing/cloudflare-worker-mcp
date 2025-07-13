import { consoleError, consoleLog } from "./Log.ts";

const SOURCE_FILE_MAP = null;

export function handleSuccess(processId : string, message : string) {
    // log & response
    consoleLog(processId, `Result: ${message}`);
    return { content: [{ type: "text", text: String(message) }] }
}

export async function handleError(env: Record<string, any>, processId : string, error_obj : any) {
    // error email (to be added)
    // log & response
    consoleError(processId, "Error Message: " + error_obj.message);
    consoleError(processId, "Error Trace: " + error_obj.stack);
    consoleError(processId, "Source Map: " + JSON.stringify(error_obj.sourceFileMaps));
    return { content: [{ type: "text", text: JSON.stringify({ status: "error", error_message: error_obj.message }) }] };
}
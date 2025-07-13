import { sendEmail } from "./Notification.ts";
import { consoleError, consoleLog } from "./Log.ts";

const SOURCE_FILE_MAP = null;

export function handleSuccess(processId : string, message : string) {
    // log & response
    consoleLog(processId, `Result: ${message}`);
    return { content: [{ type: "text", text: String(message) }] }
}

export async function handleError(env: Record<string, any>, processId : string, error_obj : any) {
    // error email
    const emailSubject = "[Onboarding MCP] Error Notification";
    const emailTo = env.AIOPS_EMAIL;
    const emailHtmlMsg = `
    <p>An error occurred while processing request. Please check the logs for more details.</p>
    <p><strong>Process ID:</strong>${processId}</p>
    <p><strong>Error Message:</strong></p>
    <p>${error_obj.message}</p>
    <p><strong>Error Trace:</strong></p>
    <pre style="background-color: #f8f8f8; padding: 10px; border: 1px solid #ccc;">${error_obj.stack}</pre>
    <p><strong>Source Map:</strong></p>
    <p>${JSON.stringify(error_obj.sourceFileMaps)}</p>
    `;
    await sendEmail(env, processId, emailSubject, emailHtmlMsg, emailTo);
    // log & response
    consoleError(processId, "Error Message: " + error_obj.message);
    consoleError(processId, "Error Trace: " + error_obj.stack);
    consoleError(processId, "Source Map: " + JSON.stringify(error_obj.sourceFileMaps));
    return { content: [{ type: "text", text: JSON.stringify({ status: "error", error_message: error_obj.message }) }] };
}
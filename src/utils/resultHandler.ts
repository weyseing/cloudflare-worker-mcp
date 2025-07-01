import { consoleError, consoleLog } from "./log.ts";
import { sendEmail } from "./notification.ts";

export async function handleError(processId : string, error_msg : string) {
    const emailSubject = "[Onboarding MCP] Error Notification";
    const emailHtmlMsg = `
    <p>An error occurred while processing your request. Please check the logs for more details.</p>
    <p><strong>Error Message:</strong> ${error_msg}</p>
    `;
    const emailTo = "jeremy.heng@fiuu.com";
    await sendEmail(processId, emailSubject, emailHtmlMsg, emailTo);

    consoleError(processId, error_msg);
    return { content: [{ type: "text", text: JSON.stringify({ status: "error", error_message: error_msg }) }] };
}

export function handleSuccess(processId : string, message : string) {
    consoleLog(processId, `Result: ${message}`);
    return { content: [{ type: "text", text: String(message) }] }
}
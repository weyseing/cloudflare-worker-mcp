import { consoleError, consoleLog } from "./Log.ts";
import { getCurrentFunctionName } from "../utils/FunctionUtils.ts"

const SOURCE_FILE_MAP = null;

export async function sendEmail(env: Record<string, any>, processId : string, subject: string, msg: string, toEmail: string) {
    // check enable env
    if (env.ENABLE_ERR_EMAIL === 'FALSE') {
        consoleLog(processId, "Error email sending skipped: ENABLE_ERR_EMAIL is FALSE");
        return;
    }

    // email info
    const urlencoded = new URLSearchParams();
    urlencoded.append("email_subject", subject);
    urlencoded.append("email_msg", msg);
    urlencoded.append("email_to", toEmail);
    urlencoded.append("is_html", 'true');

    // call api
    const mlApiUrl = env.MLSPACE_ENDPOINT + "/notification/send_email";
    try {
        const response = await fetch(mlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-api-key": env.MLSPACE_NOTIFY_KEY
            },
            body: urlencoded,
            redirect: "follow"
        });
        if (!response.ok) {
            const errorResponseBody = await response.text();
            throw new Error(`Failed to send notification email: ${response.status} ${response.statusText}.\nAPI URL: ${mlApiUrl}.\nEmail API Response: ${errorResponseBody}`);
        } else {
            consoleLog(processId, "Error email sent successfully.");
        }
    } catch (error_obj: any) {
        consoleError(processId, `Error sending notification email: ${error_obj.message}`);
        consoleError(processId, "Error Trace: " + error_obj.stack);
    }
}
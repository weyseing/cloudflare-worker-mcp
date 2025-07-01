import { consoleError, consoleLog } from "./log.ts";

export async function sendEmail(processId : string, subject: string, msg: string, toEmail: string) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("email_subject", subject);
    urlencoded.append("email_msg", msg);
    urlencoded.append("email_to", toEmail);

    const mlApiUrl = "env.MLSPACE_ENDPOINT" + "/notification/send_email";
    try {
        const response = await fetch(mlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-api-key": "env.MLSPACE_NOTIFY_KEY"
            },
            body: urlencoded,
            redirect: "follow"
        });
        if (!response.ok) {
            const errorResponseBody = await response.text();
            consoleError(processId, `Failed to send notification email: ${response.status} ${response.statusText}`);
            consoleError(processId, `Email API Response: ${errorResponseBody}`);
        } else {
            consoleLog(processId, "Notification email sent successfully.");
        }
    } catch (emailError: any) {
        consoleError(processId, `Error sending notification email: ${emailError.message}`);
    }
}
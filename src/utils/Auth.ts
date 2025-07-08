import { consoleError, consoleLog } from "./Log.ts";

export async function getAccessToken(env: Record<string, any>, processId: string, userId: string, secretKey: string): Promise<string | undefined> {
    // header
    const requestHeader = new Headers();
    requestHeader.append("Content-Type", "application/json");
    
    // body payload
    const raw = JSON.stringify({
        user_id: userId,
        secret_key: secretKey,
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: requestHeader,
        body: raw,
        redirect: "follow",
    };

    // call api
    try {
        const response = await fetch(env.ONBOARDING_API + "/api/access-tokens", requestOptions);
        const resultText = await response.text();
        consoleLog(processId, "Get token API response: " + resultText);
        const bearerToken = JSON.parse(resultText).data.body.bearer_token;
        return bearerToken;
    } catch (error) {
        throw error;
    }
}

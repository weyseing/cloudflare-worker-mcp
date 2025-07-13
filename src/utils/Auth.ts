import { consoleError, consoleLog } from "./Log.ts";
import { getCurrentFunctionName } from "../utils/FunctionUtils.ts"

const SOURCE_FILE_MAP = null;

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
        const parsedResult = JSON.parse(resultText);
        consoleLog(processId, "Get token API response: " + resultText);

        // if bearer_token not found
        if (!parsedResult || !parsedResult.data || !parsedResult.data.body || typeof parsedResult.data.body.bearer_token === 'undefined') {
            const errorMessage = `bearer_token not found. Error: ${resultText}`;
            throw new Error(errorMessage);
        }

        // token
        const bearerToken = parsedResult.data.body.bearer_token;
        return bearerToken;
    } catch (error) {
        (error as any).sourceFileMaps = [...((error as any).sourceFileMaps ?? []), { function: getCurrentFunctionName(), file: SOURCE_FILE_MAP }];
        throw error;
    }
}

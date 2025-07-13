import { consoleLog } from "../utils/Log.ts"
import { getAccessToken } from "../utils/Auth.ts"
import { getCurrentFunctionName } from "../utils/FunctionUtils.ts"
import { handleError, handleSuccess } from "../utils/ResultHandler.ts"

const SOURCE_FILE_MAP = null;

export async function getAppByID(
    env: Record<string, any>,
    props: Record<string, any>,
    applicationID: string
): Promise<any> {
    try {
        // logging
        consoleLog(props.processId, "UserID: " + props.userId);
        consoleLog(props.processId, "App ID: " + applicationID);

        // token
        const bearerToken = await getAccessToken(env, props.processId, props.userId, props.secretKey);

        // call API
        const response = await fetch(env.ONBOARDING_API + `/api/onboarding/${applicationID}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            }
        });
        if (!response.ok) 
            throw new Error(`Onboarding API error: ${response.status} ${response.statusText} - ${await response.text()}`);

        // response
        const data = await response.json();
        consoleLog(props.processId, "Onboarding API response: " + JSON.stringify(data));
        return handleSuccess(props.processId, JSON.stringify(data) as string);

    // error handling
    } catch (error: any) {
        (error as any).sourceFileMaps = [...((error as any).sourceFileMaps ?? []), { function: getCurrentFunctionName(), file: SOURCE_FILE_MAP }];
        return handleError(env, props.processId, error);
    }
}


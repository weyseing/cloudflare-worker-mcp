import { consoleLog } from "../utils/Log.ts"
import { getURL } from "../utils/Global.ts"
import { getCurrentFunctionName } from "../utils/FunctionUtils.ts"
import { handleError, handleSuccess } from "../utils/ResultHandler.ts"

const SOURCE_FILE_MAP = null;

export async function getUserByID(
    env: Record<string, any>,
    props: Record<string, any>,
    userID: string
): Promise<any> {
    try {
        // logging
        consoleLog(props.processId, "Props: " + JSON.stringify(props));
        consoleLog(props.processId, "Env: " + JSON.stringify(env));
        consoleLog(props.processId, "App ID: " + userID);

        // token
        const url = await getURL(env, props);

        // call API
        const response = await fetch(url.endpoint + "/users/" + userID, {
            method: 'GET',
            headers: {'accept': 'application/json'}
        });
        if (!response.ok) 
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${await response.text()}`);

        // response
        const data = await response.json();
        consoleLog(props.processId, "API Response: " + JSON.stringify(data));
        return handleSuccess(props.processId, JSON.stringify(data) as string);
    // error handling
    } catch (error: any) {
        (error as any).sourceFileMaps = [...((error as any).sourceFileMaps ?? []), { function: getCurrentFunctionName(), file: SOURCE_FILE_MAP }];
        return handleError(env, props.processId, error);
    }
}


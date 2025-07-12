import { consoleLog } from "../utils/Log.ts"
import { getAccessToken } from "../utils/Auth.ts"
import { getCurrentFunctionName } from "../utils/FunctionUtils.ts"
import { handleError, handleSuccess } from "../utils/ResultHandler.ts"

const SOURCE_FILE_MAP = null;

export async function calculate(
    env: Record<string, any>,
    props: Record<string, any>,
    operation: string,
    a: number,
    b: number
): Promise<any> {
    try {
        // get token
        const bearerToken = await getAccessToken(env, props.processId, props.userId, props.secretKey);
        consoleLog(props.processId, "Onboaring API token: " + bearerToken);

        let result: number = 0;
        switch (operation) {
            case "add":
                result = a + b;
                break;
            case "subtract":
                result = a - b;
                break;
            case "multiply":							
                result = a * b;
                break;
            case "divide":
                result = a / b;
                break;
        }

        // response
        return handleSuccess(props.processId, String(bearerToken));

    // error handling
    } catch (error: any) {
        (error as any).sourceFileMaps = [...((error as any).sourceFileMaps ?? []), { function: getCurrentFunctionName(), file: SOURCE_FILE_MAP }];
        return handleError(env, props.processId, error);
    }
}
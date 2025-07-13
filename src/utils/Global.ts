import { consoleError, consoleLog } from "./Log.ts";
import { getCurrentFunctionName } from "./FunctionUtils.ts"

const SOURCE_FILE_MAP = null;

export async function getURL(
    env: Record<string, any>,
    props: Record<string, any>
): Promise<any> {
    try {
        // logging
        consoleLog(props.processId, "env: " + JSON.stringify(env));
        consoleLog(props.processId, "props: " + JSON.stringify(props));
        
        // function logic
        const result = {
            status: "success",
            endpoint: env.TESTING_API,
        };
        // check error
        if (result.status != "success") 
            throw new Error(`Error: ${JSON.stringify(result)}`);

        // return
        consoleLog(props.processId, "Function result: " + JSON.stringify(result));
        return result;
    } catch (error) {
        (error as any).sourceFileMaps = [...((error as any).sourceFileMaps ?? []), { function: getCurrentFunctionName(), file: SOURCE_FILE_MAP }];
        throw error;
    }
}

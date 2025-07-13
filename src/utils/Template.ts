import { consoleLog } from "./Log.ts";
import { getCurrentFunctionName } from "./FunctionUtils.ts";

const SOURCE_FILE_MAP = null;

export async function functionTemplate(
    env: Record<string, any>,
    props: Record<string, any>,
    param1: string,
    param2: number
): Promise<any> {
    try {
        // logging
        consoleLog(props.processId, "UserID: " + props.userId);
        consoleLog(props.processId, "Param1: " + param1);
        consoleLog(props.processId, "Param2: " + param2);
        
        // function logic
        const result = {
            status: "success",
            message: "Function completed successfully",
            userId: props.userId,
            timestamp: new Date().toISOString(),
        };
        // check error
        if (result.status != "success") 
            throw new Error(`Error: ${result}`);

        // return
        consoleLog(props.processId, "Function result: " + JSON.stringify(result));
        return {success: true, data: result};
    } catch (error: any) {
        (error as any).sourceFileMaps = [...((error as any).sourceFileMaps ?? []), { function: getCurrentFunctionName(), file: SOURCE_FILE_MAP }];
        throw error;
    }
}

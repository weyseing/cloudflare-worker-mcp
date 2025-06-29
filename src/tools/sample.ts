import { consoleLog } from "../utils/log.ts"
import { handleError, handleSuccess } from "../utils/resultHandler.ts"

export async function calculate(
    processId: string,
    userId: string | null,
    secretKey: string | null,
    operation: string,
    a: number,
    b: number
): Promise<any> {
    try {
        consoleLog(processId, userId as string);
        consoleLog(processId, secretKey as string);

        // calc operation
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
                if (b === 0)
                    return handleError(processId, "Cannot divide by zero");
                result = a / b;
                break;
        }

        return handleSuccess(processId, String(result));
    // error handling
    } catch (error: any) {
        return handleError(processId, error.message);
    }
}
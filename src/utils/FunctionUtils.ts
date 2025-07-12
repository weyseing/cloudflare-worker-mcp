const SOURCE_FILE_MAP = null;

export function getCurrentFunctionName(): string | undefined {
    const err = new Error();
    const stack = err.stack?.split('\n');
    if (stack && stack.length > 2) {
        const match = stack[2].trim().match(/^at (\w+)/);
        if (match) return match[1];
    }
    return undefined;
}
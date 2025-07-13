const SOURCE_FILE_MAP = null;

export function consoleLog(processId: string, log_msg : string) {
    const timestamp = new Date().toLocaleString();
    console.log(`[APP_LOG] ${timestamp} - ${processId} - ${log_msg}`);
}

export function consoleError(processId: string, error_msg : string) {
    const timestamp = new Date().toLocaleString(); 
    console.error(`[APP_LOG] ${timestamp} - ${processId} - ${error_msg}`);
}
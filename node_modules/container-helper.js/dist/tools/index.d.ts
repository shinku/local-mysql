/// <reference types="node" />
export declare const convertBufferToString: (data: Buffer) => string[];
export declare const runCommand: (command: string) => Promise<string[]>;
export declare const sliceCommandResult: <T>(res: string[]) => T[];

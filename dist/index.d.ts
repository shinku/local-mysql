type TVmType = "docker" | "podman" | string;
export declare const startVm: (vmType: TVmType) => Promise<void>;
/**
 * 初始化sql
 * @param paths
 */
export declare const initSql: (paths: string[]) => Promise<void>;
export declare const deleteSql: () => Promise<void>;
/**
 * 格式化sql语句
 * @param str
 * @returns
 */
export declare const trimSql: (str: string) => string;
/**
 * 查询
 * @param sql
 * @returns
 */
export declare const query: (sql: string) => Promise<any>;
export {};

import { Pool } from "mysql2";
import { ILocalMysqlOption } from "./IConfig";
export declare const defaultPassword = "1234567890";
export declare class MysqlClient {
    config: ILocalMysqlOption;
    client: any;
    rootPool: Pool;
    clusterPool: Pool;
    pool: Pool;
    constructor(config: ILocalMysqlOption);
    private connectRoot;
    connect(): Promise<unknown>;
    initDataBase(): Promise<void>;
    removeRoot(pool: Pool): Promise<void>;
    /**
     * 执行sql
     * @param sql
     * @param params
     * @returns
     */
    query(sql: string, param?: any): Promise<any>;
}

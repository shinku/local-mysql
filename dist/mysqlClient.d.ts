import { Pool } from "mysql2";
import { Connection } from "mysql2/promise";
import { ILocalMysqlOption } from "./IConfig";
export declare const defaultPassword = "1234567890";
export declare class MysqlClient {
    config: ILocalMysqlOption;
    client: any;
    rootPool: Connection;
    clusterPool: Pool;
    pool: Pool;
    connection: Connection;
    constructor(config: ILocalMysqlOption);
    private connectRoot;
    connect(): Promise<Connection>;
    initDataBase(): Promise<void>;
    removeRoot(pool: Pool): Promise<void>;
    /**
     * 执行sql
     * @param sql
     * @param params
     * @returns
     */
    query(sql: string, param?: any): Promise<import("mysql2").QueryResult>;
}

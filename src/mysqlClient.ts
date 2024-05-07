import { Pool } from "mysql2";
import { Connection, createConnection } from "mysql2/promise";
import { ILocalMysqlOption } from "./IConfig";
export const defaultPassword = '1234567890'
export class MysqlClient {
  config: ILocalMysqlOption;
  client: any;
  rootPool: Connection;
  clusterPool: Pool;
  pool:Pool;
  connection: Connection
  constructor(config: ILocalMysqlOption){
    this.config = config;
  }
  private async connectRoot(){
    const config = this.config;
    this.connection = await createConnection({
      host     : "127.0.0.1",
      user     : 'root',
      password : defaultPassword,
      port: Number(config.port || 3306)
    });
    this.connection.connect();
    return this.connection;

  }
  async connect(){
    const config = this.config;
    this.connection = await  createConnection({
      host     : "127.0.0.1",
      user     : config.username,
      password : config.password,
      database: config.database,
      port: Number(config.port || 3306)
    })
    await this.connection.connect();
    return this.connection
  }
  
  async initDataBase(){
    const config = this.config;
    await this.connectRoot();
    /**
     * 创建 DATABASE
     */
    await this.query(`CREATE DATABASE IF NOT EXISTS ${config.database} DEFAULT CHARACTER SET = "utf8mb4";`, )
    console.log(await this.query("show databases; /*show databases*/"));
    await this.query(`set @@global.sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';`)
    /**
     * 创建用户
     */
    await this.query(`CREATE USER IF NOT EXISTS '${config.username}'@'%' IDENTIFIED BY '${config.password}';`)
    await this.query(`GRANT ALL PRIVILEGES ON ${config.database}.* TO '${config.username}'@'%';`)
    await this.query('FLUSH PRIVILEGES;')
    this.connection.destroy();
  }
  
  async removeRoot(pool: Pool){
    pool.end();
  }
 

  /**
   * 执行sql
   * @param sql 
   * @param params 
   * @returns 
   */
  async query(sql:string, param:any = {}){
    console.info(`[query_sql]:${sql}`)
    const result = await this.connection.query(sql, param)
    return result[0];
  }
}
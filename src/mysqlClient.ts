import { Pool, createPool } from "mysql2";
import { ILocalMysqlOption } from "./IConfig";
export const defaultPassword = '1234567890'
export class MysqlClient {
  config: ILocalMysqlOption;
  client: any;
  rootPool: Pool;
  clusterPool: Pool;
  pool:Pool;
  constructor(config: ILocalMysqlOption){
    this.config = config;
  }
  private connectRoot(){
    return new Promise(res=>{
      const config = this.config;
      this.rootPool = createPool({
        host     : "127.0.0.1",
        user     : 'root',
        password : defaultPassword,
        port: Number(config.port || 3306)
      })
      this.pool = this.rootPool;
      res(this.rootPool)
    })
  }
  connect(){
    console.log("start connect " , this.config)
    return new Promise(res=>{
      const config = this.config;
      this.clusterPool = createPool({
        // localhost as default
        host     : "127.0.0.1",
        user     : config.username,
        password : config.password,
        database: config.database,
        port: Number(config.port || 3306)
      })
      this.pool = this.clusterPool;
      res(this.clusterPool)
    })
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
    this.removeRoot(this.rootPool);
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
    console.info(`[sql]:${sql}`)
    return new Promise<any>((resolve, reject) => {
      this.pool.getConnection((_err, connection)=>{
        connection.query(sql,param,(err, result)=>{
          if(result) {
            resolve(result)
          } 
          if(err) {
            console.log(`[err]:${err.message}`)
            reject(err)
          }
        })
      })
    })
  }
}
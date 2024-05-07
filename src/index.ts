import { getVm } from "container-helper.js";
import { Container } from "container-helper.js/dist/base/BasContainer";
import { readFileSync } from "fs";
import { MysqlClient } from "./mysqlClient";
import { getPackageJsonConfig } from "./tools";
type TVmType = "docker" | "podman" | string;
export const startVm = async (vmType:TVmType )=>{
  const vm = getVm(vmType) as Container
  await vm?.startVm()
}
const config = getPackageJsonConfig()
let client: MysqlClient;
/**
 * 初始化sql
 * @param paths 
 */
export const initSql = async (paths: string[])=>{
  const sqlCommands = [`use ${config.database}`];
  paths.forEach(filePath=>{
    let fileContent = readFileSync(filePath,{encoding:'utf-8'});
    fileContent = trimSql(fileContent);
    fileContent.split(";").forEach(sql=>sqlCommands.push(sql))
  })
  await deleteSql();
  // 初始化数据会对当前db中的数据做一次清理
  for(const sql of sqlCommands) {
    await query(sql)
  }
}

export const deleteSql = async ()=>{
  await query(`use ${config.database}`)
  const tables = await query('show tables') as any[]
  for(const value of tables) {
    await query(`delete from ${Object.values(value)[0]}`)
  }
}

/**
 * 格式化sql语句
 * @param str 
 * @returns 
 */
export const trimSql = (str:string)=>{
  let res = str.replace(/\n/gi,'')
  return res
}

/**
 * 查询
 * @param sql 
 * @returns 
 */
export const query = async (sql:string)=>{
  if(!client) {
    client = new MysqlClient(config);
    await client.connect();
  }
  if(!sql) return;
  return await client.query(sql)
}
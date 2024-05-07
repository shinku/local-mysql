import { readFileSync } from "fs";
import path, { join } from "path";

export const setConfig = (commands: string[])=>{
  const config = {
    config: {},
    sqlInit: ""
  };
  commands.forEach((key,index)=>{
    if(key === "-c") {
      config.config=  require(path.join(process.cwd(),commands[index+1]));
    }
    if(key === '-s') {
      config.sqlInit =  require(path.join(process.cwd(),commands[index+1]));
    }
  })
  return config;
}

export const getPackageJsonConfig = (configName = "local_mysql")=>{
  const pjson = JSON.parse(readFileSync(join(process.cwd(),"./package.json"),{encoding:"utf-8"}))
  return pjson[configName]
}
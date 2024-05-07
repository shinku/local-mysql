#! /usr/bin/env node
import { getVm } from "container-helper.js";
import { Container } from "container-helper.js/dist/base/BasContainer";
import path from "path";
import { MysqlClient, defaultPassword } from './mysqlClient';
import { getPackageJsonConfig } from './tools';
const config = getPackageJsonConfig();
const container = getVm(config.vmtype) as Container;
export const startMySql = async  ()=>{
  const imageName = "local-mysql-for-unitest";
  await container.startVm();
  await container.clearUnsedVolumes()
  const images = await container.showImages();
  const option = { 
    dockerFilePath: path.join(__dirname, "../image/mysql"),
    imageName,
    version: "latest"
  };
  if(images.find(image=>image.REPOSITORY === imageName)){
    container.image = option;
    return console.log('image_existed')
  }
  await container.buildImage(option)
}

export const initMysqlConnection = async ()=>{
  const containerName = 'local-mysql';
  const containerExisted = await container.findContainer(containerName)
  if(containerExisted) {
    console.log(`${containerName} existed`);
    return;
  }
  console.log({
    imageOption: container.imageOption
  })
  await container.runImage({
    name: containerName,
    p:[Number(config.port), 3306 ],
    e: {
      "MYSQL_ROOT_PASSWORD": defaultPassword
    },
    tmpfs: "/app"
  })
}

const delay = (timeout = 1000)=>{
  console.log("waiting...");
  return new Promise((res)=>{
    setTimeout(() => {
      res(1)
    }, timeout);
  })
}

export const init = async ()=>{
  await startMySql();
  await delay(1000);
  await initMysqlConnection();
  const mysqlClient = new MysqlClient(config);
  // await mysqlClient.connectRoot();
  await mysqlClient.initDataBase();
}
init().then(()=>{
  console.log('mysql-local inited');
  process.exit();
});
import path = require('path');
import { IBuildImageOption } from '../src/base/BasContainer';
import { getVm } from '../src/index';
import { DockerInstance } from '../src/instance/DockerInstance';
describe("test docker", ()=>{
  // make sure that you have started your docker service
  // perhaps you have pulled mysql with command "docker pull mysql"
  const docker = getVm<DockerInstance>('docker');
  beforeAll(async ()=>{
    await docker.startVm()
    // docker.pullImage('mysql');
  }) 
  afterAll(async ()=>{
    await docker.clearUnsedVolumes();
  })
  test("test docker", async ()=>{
    const images = await docker.showImages();
    expect(images.some(item=>item.REPOSITORY === "mysql")).toBe(true)
    await docker.clearUnsedVolumes();
    await docker.removeContainer("test-mysql")
    const option:IBuildImageOption = {
      imageName: "mysql",
      dockerFilePath: path.join(__dirname, "./images/mysql"),
      version: 'latest'
    }
    docker.image = option
    await docker.runImage({
      p:[3307,3306],
      name: 'test-mysql',
      e: {
        "MYSQL_ROOT_PASSWORD":"123456789"
      }
    })
    const ps = await docker.showInstanceLs();
    expect(ps.some(item=>item.NAMES === 'test-mysql')).toBe(true)
    await docker.removeContainer("test-mysql")
  })
})
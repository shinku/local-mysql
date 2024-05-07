import {getVm} from '../src/index'
import { PodmanInstance } from '../src/instance/PodmanInstance';
describe("test docker", ()=>{
  // make sure that you have started your docker service
  // perhaps you have pulled mysql with command "docker pull mysql"
  const podman = getVm<PodmanInstance>('podman');
  beforeAll(async ()=>{
    await podman.startVm()
    await podman.pullImage('mysql');
  }) 
  afterAll(async ()=>{
    await podman.clearUnsedVolumes();
  })
  test("test podman", async ()=>{
    const images = await podman.showImages();
    expect(images.some(item=>item.REPOSITORY=== 'mysql')).toBe(true)
    console.log(images) 
  })
})
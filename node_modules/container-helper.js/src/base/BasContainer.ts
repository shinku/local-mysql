import { runCommand, sliceCommandResult } from "../tools";

export class registor  {
  static pool = {};
  static addVm(type:string, targetClass){
    registor.pool[type] = targetClass
  }
  static getVm(type:string){
    return new registor.pool[type]
  }
}

function logDec (target:any,key:string, desription: PropertyDescriptor){
  const func = desription.value;
  desription.value = async function (...params){
    const result = await func.call(this, ...params)
    console.info(key + " ===> " +(result || []).join("\n"))
    return result
  }
}

export interface IBuildImageOption {
  /**
   * local of dockerfile 
   */
  dockerFilePath: string,

  /**
   * name of new image
   */
  imageName:string,

  /**
   * version of image
   */
  version?:string

}
/**
 * run option in usual command
 */
export interface IRunImageOption {
  p: number [],
  name: string,
  e?: {
    [key:string]: string | number
  },
  i?: Boolean,
  t?: Boolean,
  v?: string[],
  tmpfs?: string,
  w?: string,
  containerRunModel?: "pwd" | "bash" | string
}

export class Container {
  vmtype: string
  startCommand: string;
  imageOption: IBuildImageOption
  constructor(type:string){
    this.vmtype = type
  }

  @logDec
  async runCommand(command:string){
    return runCommand(`${this.vmtype} ${command}`)
  }

  async version(){
    return this.runCommand("-version");
  }

  async pullImage(imageName:string){
    return await this.runCommand("pull "+ imageName)
  }
  /**
   * 开启新的容器
   */
  async startVm(){
    
  }
  async showImages(){
    return sliceCommandResult<{REPOSITORY, TAG,"IMAGE ID",SIZE}>(await this.runCommand('images'))
  }

  async showInstanceLs(){
    return sliceCommandResult<{NAMES}>(await this.runCommand('ps -a'))
  }

  @logDec
  async clearUnsedVolumes(){
    await this.runCommand('volume ls');
    await this.runCommand('volume prune -f');
  }

  /**
   * 
   * @param name 
   * @returns 
   */
  async findContainer(name:string){
    const ls = await this.showInstanceLs();
    const instance = ls.find(item=>item.NAMES === name);
    return instance
  }

  /**
   * remove a container
   * @param name 
   */
  async removeContainer(name:string){
    const container = await this.findContainer(name);
    if(container){
      await this.runCommand("stop " + name);
      await this.runCommand("rm " + name);
    }
  }

  set image(option: IBuildImageOption){
    this.imageOption = option
  }
  /**
   * build a image 
   */
  async buildImage(option: IBuildImageOption){

    this.imageOption = option
    // goto dockerfilepath
    await runCommand('cd '+ option.dockerFilePath +" && "+this.vmtype + ` build -t ${option.imageName}:${option.version ||"latest"} .`);

  }

  /**
   * remove image creared latest
   */
  async removeLatestImage(){
    await this.runCommand(`rmi ${this.imageOption.imageName}`)
  }

  async removeImage(imageName:string){
    await this.runCommand(`rmi ${imageName}`)
  }

  /**
   * getImageNameAndVersion
   * @returns 
   */
  private getImageNameAndVersion(){
    return `${this.imageOption.imageName}:${this.imageOption.version || "latest"}`
  }

  /**
   * env option insert into image
   * @param option 
   * @returns 
   */
  private getImageEnvOption(option: IRunImageOption){
    const commands = [];
    Object.keys(option.e || {}).forEach(key=>{
      commands.push(`-e ${key}=${option.e[key]}`)
    })
    return commands.join(" ");
  }
  /**
   * get run image
   * @param option 
   * @returns 
   */
  getBaseRunCommand(option: IRunImageOption){
    const otherOption = [];
    if(option.i){
      otherOption.push("-i")
    }
    if(option.t){
      otherOption.push("-t")
    }
    if(option.v) {
      option.v.forEach(volume=>otherOption.push(volume))
    }
    if(option.tmpfs){
      otherOption.push(`--tmpfs ${option.tmpfs}`)
    }
    if(option.w) {
      otherOption.push(`-w ${option.w}`)
    }
    return `run -p ${option.p[0]}:${option.p[1]} --name ${option.name} ${otherOption.join(" ")} ${this.getImageEnvOption(option)} -d ${this.getImageNameAndVersion()} ${option.containerRunModel || ""}`;
  }

  /**
   * run a image
   * @param option
   */
  async runImage(option:IRunImageOption){
    const container = await this.findContainer(option.name)
    if(container) {
      throw new Error(`${option.name} already existed`)
    }
    await this.runCommand(this.getBaseRunCommand(option))
    return await this.findContainer(option.name);
  }
}
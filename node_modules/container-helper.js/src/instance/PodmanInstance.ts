import {Container} from '../base/BasContainer'
export class PodmanInstance extends Container {
  constructor(){
    super("podman")
  }
  async startVm(): Promise<void> {
      //  machine init will cost 5 minutes 
      await this.runCommand('machine init');
      await this.runCommand('machine start');
  }
}
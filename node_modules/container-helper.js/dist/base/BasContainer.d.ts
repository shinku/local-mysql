export declare class registor {
    static pool: {};
    static addVm(type: string, targetClass: any): void;
    static getVm(type: string): any;
}
export interface IBuildImageOption {
    /**
     * local of dockerfile
     */
    dockerFilePath: string;
    /**
     * name of new image
     */
    imageName: string;
    /**
     * version of image
     */
    version?: string;
}
/**
 * run option in usual command
 */
export interface IRunImageOption {
    p: number[];
    name: string;
    e?: {
        [key: string]: string | number;
    };
    i?: Boolean;
    t?: Boolean;
    v?: string[];
    tmpfs?: string;
    w?: string;
    containerRunModel?: "pwd" | "bash" | string;
}
export declare class Container {
    vmtype: string;
    startCommand: string;
    imageOption: IBuildImageOption;
    constructor(type: string);
    runCommand(command: string): Promise<string[]>;
    version(): Promise<string[]>;
    pullImage(imageName: string): Promise<string[]>;
    /**
     * 开启新的容器
     */
    startVm(): Promise<void>;
    showImages(): Promise<{
        REPOSITORY: any;
        TAG: any;
        "IMAGE ID": any;
        SIZE: any;
    }[]>;
    showInstanceLs(): Promise<{
        NAMES: any;
    }[]>;
    clearUnsedVolumes(): Promise<void>;
    /**
     *
     * @param name
     * @returns
     */
    findContainer(name: string): Promise<{
        NAMES: any;
    }>;
    /**
     * remove a container
     * @param name
     */
    removeContainer(name: string): Promise<void>;
    set image(option: IBuildImageOption);
    /**
     * build a image
     */
    buildImage(option: IBuildImageOption): Promise<void>;
    /**
     * remove image creared latest
     */
    removeLatestImage(): Promise<void>;
    removeImage(imageName: string): Promise<void>;
    /**
     * getImageNameAndVersion
     * @returns
     */
    private getImageNameAndVersion;
    /**
     * env option insert into image
     * @param option
     * @returns
     */
    private getImageEnvOption;
    /**
     * get run image
     * @param option
     * @returns
     */
    getBaseRunCommand(option: IRunImageOption): string;
    /**
     * run a image
     * @param option
     */
    runImage(option: IRunImageOption): Promise<{
        NAMES: any;
    }>;
}

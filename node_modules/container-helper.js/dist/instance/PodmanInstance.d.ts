import { Container } from '../base/BasContainer';
export declare class PodmanInstance extends Container {
    constructor();
    startVm(): Promise<void>;
}

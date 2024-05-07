import { Container } from "./base/BasContainer";
/**
 * 获取容器
 * @param type
 * @returns
 */
export declare const getVm: <T extends Container = null>(type: string) => T;

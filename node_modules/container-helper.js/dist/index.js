"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVm = void 0;
var BasContainer_1 = require("./base/BasContainer");
var DockerInstance_1 = require("./instance/DockerInstance");
var PodmanInstance_1 = require("./instance/PodmanInstance");
BasContainer_1.registor.addVm('docker', DockerInstance_1.DockerInstance);
BasContainer_1.registor.addVm('podman', PodmanInstance_1.PodmanInstance);
/**
 * 获取容器
 * @param type
 * @returns
 */
var getVm = function (type) {
    return BasContainer_1.registor.getVm(type);
};
exports.getVm = getVm;
//# sourceMappingURL=index.js.map
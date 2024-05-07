"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJsonConfig = exports.setConfig = void 0;
var fs_1 = require("fs");
var path_1 = __importStar(require("path"));
var setConfig = function (commands) {
    var config = {
        config: {},
        sqlInit: ""
    };
    commands.forEach(function (key, index) {
        if (key === "-c") {
            config.config = require(path_1.default.join(process.cwd(), commands[index + 1]));
        }
        if (key === '-s') {
            config.sqlInit = require(path_1.default.join(process.cwd(), commands[index + 1]));
        }
    });
    return config;
};
exports.setConfig = setConfig;
var getPackageJsonConfig = function (configName) {
    if (configName === void 0) { configName = "local_mysql"; }
    var pjson = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), "./package.json"), { encoding: "utf-8" }));
    return pjson[configName];
};
exports.getPackageJsonConfig = getPackageJsonConfig;
//# sourceMappingURL=tools.js.map
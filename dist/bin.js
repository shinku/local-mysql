#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.initMysqlConnection = exports.startMySql = void 0;
var container_helper_js_1 = require("container-helper.js");
var path_1 = __importDefault(require("path"));
var mysqlClient_1 = require("./mysqlClient");
var tools_1 = require("./tools");
var config = (0, tools_1.getPackageJsonConfig)();
var container = (0, container_helper_js_1.getVm)(config.vmtype);
var startMySql = function () { return __awaiter(void 0, void 0, void 0, function () {
    var imageName, images, option;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imageName = "local-mysql-for-unitest";
                return [4 /*yield*/, container.startVm()];
            case 1:
                _a.sent();
                return [4 /*yield*/, container.clearUnsedVolumes()];
            case 2:
                _a.sent();
                return [4 /*yield*/, container.showImages()];
            case 3:
                images = _a.sent();
                option = {
                    dockerFilePath: path_1.default.join(__dirname, "../image/mysql"),
                    imageName: imageName,
                    version: "latest"
                };
                if (images.find(function (image) { return image.REPOSITORY === imageName; })) {
                    container.image = option;
                    return [2 /*return*/, console.log('image_existed')];
                }
                return [4 /*yield*/, container.buildImage(option)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.startMySql = startMySql;
var initMysqlConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var containerName, containerExisted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                containerName = 'local-mysql';
                return [4 /*yield*/, container.findContainer(containerName)];
            case 1:
                containerExisted = _a.sent();
                if (containerExisted) {
                    console.log("".concat(containerName, " existed"));
                    return [2 /*return*/];
                }
                console.log({
                    imageOption: container.imageOption
                });
                return [4 /*yield*/, container.runImage({
                        name: containerName,
                        p: [Number(config.port), 3306],
                        e: {
                            "MYSQL_ROOT_PASSWORD": mysqlClient_1.defaultPassword
                        },
                        tmpfs: "/app"
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.initMysqlConnection = initMysqlConnection;
var delay = function (timeout) {
    if (timeout === void 0) { timeout = 1000; }
    console.log("waiting...");
    return new Promise(function (res) {
        setTimeout(function () {
            res(1);
        }, timeout);
    });
};
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mysqlClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.startMySql)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, delay(1000)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, exports.initMysqlConnection)()];
            case 3:
                _a.sent();
                mysqlClient = new mysqlClient_1.MysqlClient(config);
                // await mysqlClient.connectRoot();
                return [4 /*yield*/, mysqlClient.initDataBase()];
            case 4:
                // await mysqlClient.connectRoot();
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.init = init;
(0, exports.init)().then(function () {
    console.log('mysql-local inited');
    process.exit();
});
//# sourceMappingURL=bin.js.map
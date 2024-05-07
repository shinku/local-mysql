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
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.trimSql = exports.deleteSql = exports.initSql = exports.startVm = void 0;
var container_helper_js_1 = require("container-helper.js");
var fs_1 = require("fs");
var mysqlClient_1 = require("./mysqlClient");
var tools_1 = require("./tools");
var startVm = function (vmType) { return __awaiter(void 0, void 0, void 0, function () {
    var vm;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                vm = (0, container_helper_js_1.getVm)(vmType);
                return [4 /*yield*/, (vm === null || vm === void 0 ? void 0 : vm.startVm())];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.startVm = startVm;
var config = (0, tools_1.getPackageJsonConfig)();
var client = new mysqlClient_1.MysqlClient(config);
client.connect();
/**
 * 初始化sql
 * @param paths
 */
var initSql = function (paths) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlCommands, _i, sqlCommands_1, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sqlCommands = ["use ".concat(config.database)];
                paths.forEach(function (filePath) {
                    var fileContent = (0, fs_1.readFileSync)(filePath, { encoding: 'utf-8' });
                    fileContent = (0, exports.trimSql)(fileContent);
                    fileContent.split(";").forEach(function (sql) { return sqlCommands.push(sql); });
                });
                return [4 /*yield*/, (0, exports.deleteSql)()];
            case 1:
                _a.sent();
                _i = 0, sqlCommands_1 = sqlCommands;
                _a.label = 2;
            case 2:
                if (!(_i < sqlCommands_1.length)) return [3 /*break*/, 5];
                sql = sqlCommands_1[_i];
                return [4 /*yield*/, (0, exports.query)(sql)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.initSql = initSql;
var deleteSql = function () { return __awaiter(void 0, void 0, void 0, function () {
    var tables, _i, tables_1, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.query)("use ".concat(config.database))];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, exports.query)('show tables')];
            case 2:
                tables = _a.sent();
                _i = 0, tables_1 = tables;
                _a.label = 3;
            case 3:
                if (!(_i < tables_1.length)) return [3 /*break*/, 6];
                value = tables_1[_i];
                return [4 /*yield*/, (0, exports.query)("delete from ".concat(Object.values(value)[0]))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteSql = deleteSql;
/**
 * 格式化sql语句
 * @param str
 * @returns
 */
var trimSql = function (str) {
    var res = str.replace(/\n/gi, '');
    return res;
};
exports.trimSql = trimSql;
/**
 * 查询
 * @param sql
 * @returns
 */
var query = function (sql) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!sql)
                    return [2 /*return*/];
                return [4 /*yield*/, client.query(sql)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.query = query;
//# sourceMappingURL=index.js.map
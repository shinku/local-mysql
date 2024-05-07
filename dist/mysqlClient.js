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
exports.MysqlClient = exports.defaultPassword = void 0;
var mysql2_1 = require("mysql2");
exports.defaultPassword = '1234567890';
var MysqlClient = /** @class */ (function () {
    function MysqlClient(config) {
        this.config = config;
    }
    MysqlClient.prototype.connectRoot = function () {
        var _this = this;
        return new Promise(function (res) {
            var config = _this.config;
            _this.rootPool = (0, mysql2_1.createPool)({
                host: config.host,
                user: 'root',
                password: exports.defaultPassword,
                port: Number(config.port || 3306)
            });
            _this.pool = _this.rootPool;
            res(_this.rootPool);
        });
    };
    MysqlClient.prototype.connect = function () {
        var _this = this;
        console.log("start connect ", this.config);
        return new Promise(function (res) {
            var config = _this.config;
            _this.clusterPool = (0, mysql2_1.createPool)({
                host: config.host,
                user: config.username,
                password: config.password,
                database: config.database,
                port: Number(config.port || 3306)
            });
            _this.pool = _this.clusterPool;
            res(_this.clusterPool);
        });
    };
    MysqlClient.prototype.initDataBase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        config = this.config;
                        return [4 /*yield*/, this.connectRoot()];
                    case 1:
                        _c.sent();
                        /**
                         * 创建 DATABASE
                         */
                        return [4 /*yield*/, this.query("CREATE DATABASE IF NOT EXISTS ".concat(config.database, " DEFAULT CHARACTER SET = \"utf8mb4\";"))];
                    case 2:
                        /**
                         * 创建 DATABASE
                         */
                        _c.sent();
                        _b = (_a = console).log;
                        return [4 /*yield*/, this.query("show databases; /*show databases*/")];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        return [4 /*yield*/, this.query("set @@global.sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';")
                            /**
                             * 创建用户
                             */
                        ];
                    case 4:
                        _c.sent();
                        /**
                         * 创建用户
                         */
                        return [4 /*yield*/, this.query("CREATE USER IF NOT EXISTS '".concat(config.username, "'@'%' IDENTIFIED BY '").concat(config.password, "';"))];
                    case 5:
                        /**
                         * 创建用户
                         */
                        _c.sent();
                        return [4 /*yield*/, this.query("GRANT ALL PRIVILEGES ON ".concat(config.database, ".* TO '").concat(config.username, "'@'%';"))];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, this.query('FLUSH PRIVILEGES;')];
                    case 7:
                        _c.sent();
                        this.removeRoot(this.rootPool);
                        return [2 /*return*/];
                }
            });
        });
    };
    MysqlClient.prototype.removeRoot = function (pool) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                pool.end();
                return [2 /*return*/];
            });
        });
    };
    /**
     * 执行sql
     * @param sql
     * @param params
     * @returns
     */
    MysqlClient.prototype.query = function (sql_1) {
        return __awaiter(this, arguments, void 0, function (sql, param) {
            var _this = this;
            if (param === void 0) { param = {}; }
            return __generator(this, function (_a) {
                console.info("[sql]:".concat(sql));
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.pool.getConnection(function (_err, connection) {
                            connection.query(sql, param, function (err, result) {
                                if (result) {
                                    resolve(result);
                                }
                                if (err) {
                                    console.log("[err]:".concat(err.message));
                                    reject(err);
                                }
                            });
                        });
                    })];
            });
        });
    };
    return MysqlClient;
}());
exports.MysqlClient = MysqlClient;
//# sourceMappingURL=mysqlClient.js.map
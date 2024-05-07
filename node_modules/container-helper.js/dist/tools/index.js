"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliceCommandResult = exports.runCommand = exports.convertBufferToString = void 0;
var child_process_1 = require("child_process");
var convertBufferToString = function (data) {
    var buffer = Buffer.from(data).toString('utf-8');
    var result = buffer.split(/\r?\n/);
    return result;
};
exports.convertBufferToString = convertBufferToString;
var runCommand = function (command) {
    console.log("[command]" + command + ":");
    return new Promise(function (resolve) {
        var _a, _b;
        var result = (0, child_process_1.exec)(command);
        var datas = [];
        (_a = result.stdout) === null || _a === void 0 ? void 0 : _a.on('data', function (data) {
            console.info((0, exports.convertBufferToString)(data).join("\n"));
            datas.push(Buffer.from(data));
        });
        (_b = result.stderr) === null || _b === void 0 ? void 0 : _b.on('data', function (data) {
            console.info((0, exports.convertBufferToString)(data).join("\n"));
            datas.push(Buffer.from(data));
        });
        result.on('close', function () { return resolve((0, exports.convertBufferToString)(Buffer.concat(datas))); });
    });
};
exports.runCommand = runCommand;
var sliceCommandResult = function (res) {
    var reg = /\s{2,}/;
    var tags = res[0].split(reg);
    var results = [];
    var _loop_1 = function (i) {
        if (!res[i])
            return "continue";
        var values = res[i].split(reg);
        var obj = {};
        values.forEach(function (v, index) {
            obj[tags[index]] = v;
        });
        results.push(obj);
    };
    for (var i = 1; i < res.length; i++) {
        _loop_1(i);
    }
    return results;
};
exports.sliceCommandResult = sliceCommandResult;
//# sourceMappingURL=index.js.map
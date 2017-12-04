"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var graphcool_lib_1 = require("graphcool-lib");
var bcrypt = require("bcryptjs");
var SALT_ROUNDS = 10;
exports.default = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var graphcool, api, _a, username, password, user, passwordIsCorrect, token, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(event);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                graphcool = graphcool_lib_1.fromEvent(event);
                api = graphcool.api("simple/v1");
                _a = event.data, username = _a.username, password = _a.password;
                return [4 /*yield*/, getUserByUsername(api, username).then(function (r) { return r.User; })
                    // no user with this username
                ];
            case 2:
                user = _b.sent();
                // no user with this username
                if (!user) {
                    return [2 /*return*/, { error: "Invalid credentials!" }];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 3:
                passwordIsCorrect = _b.sent();
                if (!passwordIsCorrect) {
                    return [2 /*return*/, { error: "Invalid credentials!" }];
                }
                return [4 /*yield*/, graphcool.generateNodeToken(user.id, "User")];
            case 4:
                token = _b.sent();
                return [2 /*return*/, { data: { id: user.id, token: token } }];
            case 5:
                e_1 = _b.sent();
                console.log(e_1);
                return [2 /*return*/, { error: "An unexpected error occured during authentication." }];
            case 6: return [2 /*return*/];
        }
    });
}); };
function getUserByUsername(api, username) {
    return __awaiter(this, void 0, void 0, function () {
        var query, variables;
        return __generator(this, function (_a) {
            query = "\n    query getUserByUsername($username: String!) {\n      User(username: $username) {\n        id\n        password\n      }\n    }\n  ";
            variables = {
                username: username,
            };
            return [2 /*return*/, api.request(query, variables)];
        });
    });
}

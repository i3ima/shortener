"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const const_1 = require("./const");
const Url_1 = require("./entities/Url");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Url_1.Url],
    debug: !const_1.__prod__,
    dbName: 'shortener',
    type: 'postgresql',
};
//# sourceMappingURL=mikro-orm.config.js.map
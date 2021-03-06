"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__secret__ = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === 'production' ? true : false;
exports.__secret__ = process.env.NODE_ENV;
//# sourceMappingURL=const.js.map
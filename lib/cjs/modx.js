"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modx = void 0;
var createModularStateHook_1 = __importDefault(require("./createModularStateHook"));
var modx = function () {
    var _store;
    var _sagaMiddleware;
    return {
        config: function (store, sagaMiddleware) {
            _store = store;
            _sagaMiddleware = sagaMiddleware;
        },
        createModularStateHook: function (moduleName, initialState, reducersConfig) {
            if (!_store || !_sagaMiddleware) {
                throw Error("Invalid modular store configuration");
            }
            return createModularStateHook_1.default(_store, _sagaMiddleware)(moduleName, initialState, reducersConfig);
        },
    };
};
exports.modx = modx;
exports.default = exports.modx;

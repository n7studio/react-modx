var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
import { useState, useLayoutEffect } from "react";
import { combineReducers } from "redux";
import { takeLatest } from "redux-saga/effects";
var reducers = {};
var sagas = [];
var dispatchers = {};
function injectReducer(moduleName, reducer, store) {
    if (!reducers[moduleName]) {
        reducers[moduleName] = reducer;
        store.replaceReducer(combineReducers(reducers));
    }
}
function injectSaga(name, saga, sagaMiddleware) {
    if (!sagas.includes(name)) {
        sagas.push(name);
        sagaMiddleware.run(function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, takeLatest(name, saga)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
}
function getState(moduleName, store) {
    var state = store.getState();
    return state[moduleName];
}
function subscribe(moduleName, f, store) {
    var moduleState = getState(moduleName, store);
    return store.subscribe(function () { return moduleState !== getState(moduleName, store) && f((moduleState = getState(moduleName, store))); });
}
function switchCallableType(callableName, stateCallableMapName, callableMap) {
    var stateCallable = callableMap[stateCallableMapName][callableName];
    var type = stateCallable.type;
    callableMap[stateCallableMapName][type] = stateCallable;
    delete callableMap[stateCallableMapName][callableName];
    return type;
}
function registerReducersDispatchers(callableMap, store) {
    Object.keys(callableMap.reducers).forEach(function (callableName) {
        var type = switchCallableType(callableName, "reducers", callableMap);
        dispatchers[callableName] = function (payload) { return store.dispatch({ type: type, payload: payload }); };
    });
}
function registerSagasDispatchers(callableMap, sagaMiddleware, store) {
    Object.keys(callableMap.sagas).forEach(function (callableName) {
        var type = switchCallableType(callableName, "sagas", callableMap);
        var saga = callableMap.sagas[type].call;
        injectSaga(type, saga, sagaMiddleware);
        dispatchers[callableName] = function (payload) { return store.dispatch({ type: type, payload: payload }); };
    });
}
function throwErrorIfStoreIsInvalid(store) {
    if (!(store instanceof Object) || !("replaceReducer" in store)) {
        throw Error("Invalid store provided when calling createModularStateHook function.");
    }
}
function throwErrorIfSagaMiddlewareIsInvalid(sagaMiddleware) {
    if (!(sagaMiddleware instanceof Object) || !("run" in sagaMiddleware)) {
        throw Error("Invalid saga middleware provided when calling createModularStateHook function.");
    }
}
function useModularState(moduleName, initialState, callableMap, store, sagaMiddleware) {
    //init reducers
    injectReducer(moduleName, function (state, _a) {
        if (state === void 0) { state = initialState; }
        var type = _a.type, payload = _a.payload;
        var reducerObject = callableMap.reducers[type];
        return reducerObject ? reducerObject.call(state, payload) : state;
    }, store);
    var _a = useState(function () { return getState(moduleName, store); }), moduleState = _a[0], setModuleState = _a[1];
    useLayoutEffect(function () {
        subscribe(moduleName, function (value) { return setModuleState(function () { return value; }); }, store);
    }, [setModuleState]);
    registerReducersDispatchers(callableMap, store);
    registerSagasDispatchers(callableMap, sagaMiddleware, store);
    return [moduleState, dispatchers, { getState: getState, subscribe: subscribe }];
}
function createUseModularStateHook(store, sagaMiddleware) {
    throwErrorIfStoreIsInvalid(store);
    throwErrorIfSagaMiddlewareIsInvalid(sagaMiddleware);
    return function (moduleName, initialState, callableMap) {
        return useModularState(moduleName, initialState, callableMap, store, sagaMiddleware);
    };
}
export default createUseModularStateHook;

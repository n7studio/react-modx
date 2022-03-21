import { useState, useLayoutEffect } from "react";
import { combineReducers } from "redux";
// import { SagaConfig } from "./types/SagaConfig";
var reducers = {};
// let sagas: Array<string> = [];
var dispatchers = {};
function injectReducer(moduleName, reducer, store) {
    if (!reducers[moduleName]) {
        reducers[moduleName] = reducer;
        store.replaceReducer(combineReducers(reducers));
    }
}
// function injectSaga(
//   name: string,
//   sagaConfig: SagaConfig,
//   sagaMiddleware: SagaMiddleware
// ) {
//   const { saga, effectCreator: effectCreatorName } = sagaConfig;
//   const effectCreator = resolveEffectCreator(effectCreatorName);
//   if (!sagas.includes(name)) {
//     sagas.push(name);
//     sagaMiddleware.run(function* () {
//       yield effectCreator(name, saga);
//     });
//   }
// }
function getState(moduleName, store) {
    var state = store.getState();
    return state[moduleName];
}
function subscribe(moduleName, f, store) {
    var moduleState = getState(moduleName, store);
    return store.subscribe(function () {
        return moduleState !== getState(moduleName, store) &&
            f((moduleState = getState(moduleName, store)));
    });
}
function switchType(configIndex, configs) {
    var config = configs[configIndex];
    var actionType = config.actionType;
    configs[actionType] = config;
    delete configs[configIndex];
    return actionType;
}
function registerReducersDispatchers(reducersConfig, store) {
    Object.keys(reducersConfig).forEach(function (configIndex) {
        var reducerConfig = reducersConfig[configIndex];
        var callableName = reducerConfig.reducerName || configIndex;
        var type = reducerConfig.actionType;
        switchType(configIndex, reducersConfig);
        dispatchers[callableName] = function (payload) {
            return store.dispatch({ type: type, payload: payload });
        };
    });
}
// function registerSagasDispatchers(
//   callablesConfig: CallablesConfig,
//   sagaMiddleware: SagaMiddleware,
//   store: Store
// ) {
//   Object.keys(callablesConfig?.sagasConfig).forEach((configKey: string) => {
//     let sagaConfig = callablesConfig.sagasConfig[configKey];
//     const callableName = sagaConfig.sagaName || configKey;
//     const type = switchType(
//       callableName,
//       "sagasConfig",
//       callablesConfig
//     );
//     sagaConfig = callablesConfig.sagasConfig[type];
//     injectSaga(type, sagaConfig, sagaMiddleware);
//     dispatchers[callableName] = (payload: any) =>
//       store.dispatch({ type, payload });
//   });
// }
// function resolveEffectCreator(
//   effectCreatorName: string | undefined = undefined
// ) {
//   if (!effectCreatorName) {
//     return takeLatest;
//   }
//   switch (effectCreatorName) {
//     case "takeLatest":
//       return takeLatest;
//     case "takeEvery":
//       return takeEvery;
//     default:
//       throw Error(
//         `Unknown effect "${effectCreatorName}". Defualt effect is "takeLatest"`
//       );
//   }
// }
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
function useModularState(moduleName, initialState, reducersConfig, store
// sagaMiddleware: SagaMiddleware
) {
    //init reducers
    injectReducer(moduleName, function (state, _a) {
        if (state === void 0) { state = initialState; }
        var type = _a.type, payload = _a.payload;
        var reducerConfig = reducersConfig[type];
        return reducerConfig ? reducerConfig.reducer(state, payload) : state;
    }, store);
    var _a = useState(function () {
        return getState(moduleName, store);
    }), moduleState = _a[0], setModuleState = _a[1];
    useLayoutEffect(function () {
        var isMounted = true;
        subscribe(moduleName, function (value) {
            if (isMounted) {
                setModuleState(function () { return value; });
            }
        }, store);
        return function () {
            isMounted = false;
        };
    }, [setModuleState]);
    registerReducersDispatchers(reducersConfig, store);
    // registerSagasDispatchers(callablesConfig, sagaMiddleware, store);
    var result = [
        moduleState,
        dispatchers,
        { getState: getState, subscribe: subscribe },
    ];
    return result;
}
function createModularStateHook(store, sagaMiddleware) {
    throwErrorIfStoreIsInvalid(store);
    throwErrorIfSagaMiddlewareIsInvalid(sagaMiddleware);
    return function (moduleName, initialState, reducersConfig) {
        return useModularState(moduleName, initialState, reducersConfig, store
        // sagaMiddleware
        );
    };
}
export default createModularStateHook;

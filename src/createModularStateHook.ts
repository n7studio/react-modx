import { useState, useLayoutEffect } from "react";
import { combineReducers, Reducer, ReducersMapObject, Store } from "redux";
import { SagaMiddleware } from "redux-saga";
// import { takeLatest, takeEvery } from "redux-saga/effects";
// import { CallablesConfig } from "./types/CallablesConfig";
import { ReducerConfig } from "./types/ReducerConfig";
// import { SagaConfig } from "./types/SagaConfig";

let reducers: ReducersMapObject = {};
// let sagas: Array<string> = [];

const dispatchers: any = {};

function injectReducer(moduleName: string, reducer: Reducer, store: Store) {
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

function getState(moduleName: string, store: Store) {
  const state: any = store.getState();
  return state[moduleName];
}

function subscribe(moduleName: string, f: Function, store: Store) {
  let moduleState = getState(moduleName, store);
  return store.subscribe(
    () =>
      moduleState !== getState(moduleName, store) &&
      f((moduleState = getState(moduleName, store)))
  );
}

function switchType(
  configIndex: string,
  configs: {
    [configIndex: string]: ReducerConfig;
  }
) {
  const config = configs[configIndex];
  const { actionType } = config;
  configs[actionType] = config;
  delete configs[configIndex];

  return actionType;
}

function registerReducersDispatchers(
  reducersConfig: {
    [configIndex: string]: ReducerConfig;
  },
  store: Store
) {
  Object.keys(reducersConfig).forEach((configIndex: string) => {
    const reducerConfig = reducersConfig[configIndex];
    const callableName = reducerConfig.reducerName || configIndex;
    const type = reducerConfig.actionType;

    switchType(configIndex, reducersConfig);

    dispatchers[callableName] = (payload: any) =>
      store.dispatch({ type, payload });
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

function throwErrorIfStoreIsInvalid(store: Store) {
  if (!(store instanceof Object) || !("replaceReducer" in store)) {
    throw Error(
      "Invalid store provided when calling createModularStateHook function."
    );
  }
}

function throwErrorIfSagaMiddlewareIsInvalid(sagaMiddleware: SagaMiddleware) {
  if (!(sagaMiddleware instanceof Object) || !("run" in sagaMiddleware)) {
    throw Error(
      "Invalid saga middleware provided when calling createModularStateHook function."
    );
  }
}

function useModularState<S = undefined, D = undefined>(
  moduleName: string,
  initialState: S,
  reducersConfig: {
    [reducerKey: string]: ReducerConfig;
  },
  store: Store
  // sagaMiddleware: SagaMiddleware
) {
  //init reducers
  injectReducer(
    moduleName,
    (state = initialState, { type, payload }) => {
      const reducerConfig = reducersConfig[type];
      return reducerConfig ? reducerConfig.reducer(state, payload) : state;
    },
    store
  );

  const [moduleState, setModuleState] = useState(() =>
    getState(moduleName, store)
  );
  useLayoutEffect(() => {
    let isMounted = true;
    subscribe(
      moduleName,
      (value: any) => {
        if (isMounted) {
          setModuleState(() => value);
        }
      },
      store
    );

    return () => {
      isMounted = false;
    };
  }, [setModuleState]);

  registerReducersDispatchers(reducersConfig, store);
  // registerSagasDispatchers(callablesConfig, sagaMiddleware, store);

  const result: [S, D, any] = [
    moduleState,
    dispatchers as D,
    { getState, subscribe },
  ];

  return result;
}

function createModularStateHook<S = undefined, D = undefined>(
  store: Store,
  sagaMiddleware: SagaMiddleware
) {
  throwErrorIfStoreIsInvalid(store);
  throwErrorIfSagaMiddlewareIsInvalid(sagaMiddleware);

  return (
    moduleName: string,
    initialState: S,
    reducersConfig: {
      [reducerKey: string]: ReducerConfig;
    }
  ) => {
    return useModularState<S, D>(
      moduleName,
      initialState,
      reducersConfig,
      store
      // sagaMiddleware
    );
  };
}

export default createModularStateHook;

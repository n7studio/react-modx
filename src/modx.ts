import { Store } from "redux";
import { SagaMiddleware } from "redux-saga";
import createModularStateHook from "./createModularStateHook";
import { ReducerConfig } from "./types/ReducerConfig";

export const modx = () => {
  let _store: Store;
  let _sagaMiddleware: SagaMiddleware<{}>;
  return {
    config: (store: Store, sagaMiddleware: SagaMiddleware<{}>) => {
      _store = store;
      _sagaMiddleware = sagaMiddleware;
    },
    createModularStateHook: <S = undefined, D = undefined>(
      moduleName: string,
      initialState: S,
      reducersConfig: {
        [reducerKey: string]: ReducerConfig;
      }
    ) => {
      if (!_store || !_sagaMiddleware) {
        throw Error("Invalid modular store configuration");
      }

      return createModularStateHook<S, D>(_store, _sagaMiddleware)(
        moduleName,
        initialState,
        reducersConfig
      );
    },
  };
};

export default modx;

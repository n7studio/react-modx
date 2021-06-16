import { Store } from "redux";
import { SagaMiddleware } from "redux-saga";
import createModularStateHook  from "./createModularStateHook";
import { StateCallableMapObjectInterface } from "./types/StateCallableMapObjectInterface";

export const modx = () => {
  let _store: Store;
  let _sagaMiddleware: SagaMiddleware<{}>;
  return {
    config(store: Store, sagaMiddleware: SagaMiddleware<{}>) {
      _store = store;
      _sagaMiddleware = sagaMiddleware;
    },
    useModularState(moduleName: string, initialState: any, callableMap: StateCallableMapObjectInterface) {
      if (!_store || !_sagaMiddleware) {
        throw Error("Invalid modular store configuration");
      }

      return createModularStateHook(_store, _sagaMiddleware)(moduleName, initialState, callableMap);
    },
  };
};

export default modx;
import { Store } from "redux";
import { SagaMiddleware } from "redux-saga";
import { StateCallableMapObjectInterface } from ".";
declare function createUseModularStateHook(store: Store, sagaMiddleware: SagaMiddleware): (moduleName: string, initialState: any, callableMap: StateCallableMapObjectInterface) => any[];
export default createUseModularStateHook;

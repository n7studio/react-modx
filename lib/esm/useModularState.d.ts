import { Store } from "redux";
import { SagaMiddleware } from "redux-saga";
import { StateCallableMapObjectInterface } from "./types/StateCallableMapObjectInterface";
export declare const modx: () => {
    config(store: Store, sagaMiddleware: SagaMiddleware<{}>): void;
    useModularState(moduleName: string, initialState: any, callableMap: StateCallableMapObjectInterface): any[];
};

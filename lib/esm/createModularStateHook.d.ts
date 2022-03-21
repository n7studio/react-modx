import { Store } from "redux";
import { SagaMiddleware } from "redux-saga";
import { ReducerConfig } from "./types/ReducerConfig";
declare function createModularStateHook<S = undefined, D = undefined>(store: Store, sagaMiddleware: SagaMiddleware): (moduleName: string, initialState: S, reducersConfig: {
    [reducerKey: string]: ReducerConfig;
}) => [S, D, any];
export default createModularStateHook;

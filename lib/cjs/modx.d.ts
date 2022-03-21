import { Store } from "redux";
import { SagaMiddleware } from "redux-saga";
import { ReducerConfig } from "./types/ReducerConfig";
export declare const modx: () => {
    config: (store: Store, sagaMiddleware: SagaMiddleware<{}>) => void;
    createModularStateHook: <S = undefined, D = undefined>(moduleName: string, initialState: S, reducersConfig: {
        [reducerKey: string]: ReducerConfig;
    }) => [S, D, any];
};
export default modx;

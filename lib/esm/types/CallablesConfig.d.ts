import { ReducerConfig } from "./ReducerConfig";
import { SagaConfig } from "./SagaConfig";
export interface CallablesConfig {
    reducersConfig: {
        [key: string]: ReducerConfig;
    };
    sagasConfig: {
        [key: string]: SagaConfig;
    };
}

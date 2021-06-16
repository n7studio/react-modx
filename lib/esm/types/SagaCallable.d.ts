import { Saga } from "redux-saga";
export interface SagaCallable {
    type: string;
    call: Saga<any[]>;
}

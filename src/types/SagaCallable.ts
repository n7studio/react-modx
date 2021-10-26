import { Saga } from "redux-saga";

export interface SagaCallable {
  type: string;
  effectCreator: "takeLatest" | "takeEvery" | undefined;
  call: Saga<any[]>;
}
